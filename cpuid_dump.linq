<Query Kind="Program">
  <NuGetReference>NtApiDotNet</NuGetReference>
  <Namespace>System.Runtime.InteropServices</Namespace>
  <Namespace>NtApiDotNet</Namespace>
</Query>

// linqpad script to dump cpuid values.
// windows-only, sorry. uses NtApiDotNet to allocate memory for the assembly.
// works on both x86 and x64 with LinqPad 5-8.

private byte[] x86CodeBytes =
{
	0x55,                   // push        ebp  
    0x8B, 0xEC,             // mov         ebp,esp
    0x53,                   // push        ebx  
    0x57,                   // push        edi

    0x8B, 0x45, 0x08,       // mov         eax, dword ptr [ebp+8] (move level into eax)
    0x8B, 0x4D, 0x0C,       // mov         ecx, dword ptr [ebp+12] (move subleaf into ecx)
    0x0F, 0xA2,             // cpuid

    0x8B, 0x7D, 0x10,       // mov         edi, dword ptr [ebp+16] (move address of buffer into edi)
    0x89, 0x07,             // mov         dword ptr [edi+0], eax  (write eax, ... to buffer)
    0x89, 0x5F, 0x04,       // mov         dword ptr [edi+4], ebx 
    0x89, 0x4F, 0x08,       // mov         dword ptr [edi+8], ecx 
    0x89, 0x57, 0x0C,       // mov         dword ptr [edi+12],edx 

    0x5F,                   // pop         edi  
    0x5B,                   // pop         ebx  
    0x8B, 0xE5,             // mov         esp,ebp  
    0x5D,                   // pop         ebp 
    0xc3                    // ret
};

private byte[] x64CodeBytes =
{
	0x53,                       // push rbx    this gets clobbered by cpuid

    // rcx is level
	// rdx is subleaf
    // r8 is buffer

    // Move ecx (level) to eax and edx (subleaf) to ecx, call cpuid
    0x89, 0xC8,                 // mov eax, ecx
	0x89, 0xD1,					// mov ecx, edx
    0x0F, 0xA2,                 // cpuid

    // Write eax et al to buffer
    0x41, 0x89, 0x40, 0x00,     // mov    dword ptr [r8+0],  eax
    0x41, 0x89, 0x58, 0x04,     // mov    dword ptr [r8+4],  ebx
    0x41, 0x89, 0x48, 0x08,     // mov    dword ptr [r8+8],  ecx
    0x41, 0x89, 0x50, 0x0c,     // mov    dword ptr [r8+12], edx

    0x5b,                       // pop rbx
    0xc3                        // ret
};

[UnmanagedFunctionPointerAttribute(CallingConvention.Cdecl)]
public delegate void CpuIDDelegate64(uint level, uint subleaf, UInt64[] buffer);

[UnmanagedFunctionPointerAttribute(CallingConvention.Cdecl)]
public delegate void CpuIDDelegate32(uint level, uint subleaf, UInt32[] buffer);

[UnmanagedFunctionPointerAttribute(CallingConvention.Cdecl)]
public delegate void CpuIDDelegate(uint level, uint subleaf, UInt32[] buffer);

void Main()
{
	Console.WriteLine("cpuid_dump.linq - v1.0.3 - written by @gsuberland");
	// only allow this process to run on one thread
	using (var proc = Process.GetCurrentProcess())
	{
		proc.ProcessorAffinity = 1;
	}
	// start a new thread since we can't know that existing managed threads haven't already been spawned with their own affinity masks
	var thread = new Thread(WorkerThread);
	thread.Start();
	// wait for the thread to complete
	thread.Join();
}

void WorkerThread()
{
	using (var proc = NtApiDotNet.NtProcess.OpenCurrent())
	using (var thread = NtApiDotNet.NtThread.OpenCurrent())
	{
		// ensure that this code only runs on core 0 (note: this assumes it will not be migrated across processor groups, but this is unlikely)
		thread.AffinityMask = 1;
		
		// alloc memory for code
		long addr = NtVirtualMemory.AllocateMemory(proc.Handle, 0, 4096, MemoryAllocationType.Reserve | MemoryAllocationType.Commit, MemoryAllocationProtect.ExecuteReadWrite);
		if (addr == 0)
		{
			Console.WriteLine("Failed to allocate memory!");
			return;
		}

		Console.WriteLine("running in " + (proc.Is64Bit ? "64-bit" : "32-bit") + " process");
		Console.WriteLine();

		Marshal.Copy(proc.Is64Bit ? x64CodeBytes : x86CodeBytes, 0, new IntPtr(addr), proc.Is64Bit ? x64CodeBytes.Length : x86CodeBytes.Length);

		// set up an unmanaged delegate to call the code we allocated
		var cpuid = Marshal.GetDelegateForFunctionPointer<CpuIDDelegate>(new IntPtr(addr));
		
		// set up a pinned buffer for the results
		var cpuid_buffer = new UInt32[4];
		var pinnedHandle = GCHandle.Alloc(cpuid_buffer, GCHandleType.Pinned);

		Console.WriteLine("cpuid".PadRight(14, ' ') + "eax".PadRight(10, ' ') + "ebx".PadRight(10, ' ') + "ecx".PadRight(10, ' ') + "edx".PadRight(10, ' '));

		// iterate through all the "blocks" of cpuid leaves
		for (ulong leafBase = 0; leafBase <= 0xF0000000ul; leafBase += 0x10000000ul)
		{
			// figure out how many leaves there are in this block
			cpuid_buffer[0] = 0;
			cpuid_buffer[1] = 0;
			cpuid_buffer[2] = 0;
			cpuid_buffer[3] = 0;
			cpuid((uint)(leafBase), 0, cpuid_buffer);
			uint maxLeaf = cpuid_buffer[0] == 0 ? 0 : (cpuid_buffer[0] - (uint)leafBase);
			// more leaves than this would be ridiculous
			if (maxLeaf > 1024)
				maxLeaf = 1024;

			if (maxLeaf == 0)
				continue;

			for (uint leaf = 0; leaf <= maxLeaf; leaf++)
			{
				cpuid_buffer[0] = 0;
				cpuid_buffer[1] = 0;
				cpuid_buffer[2] = 0;
				cpuid_buffer[3] = 0;
				cpuid((uint)(leafBase + leaf), 0, cpuid_buffer);

				Console.WriteLine(
					$"{leafBase + leaf:x8}.00".PadRight(14, ' ') +
					$"{cpuid_buffer[0]:x8}".PadRight(10, ' ') +
					$"{cpuid_buffer[1]:x8}".PadRight(10, ' ') +
					$"{cpuid_buffer[2]:x8}".PadRight(10, ' ') +
					$"{cpuid_buffer[3]:x8}".PadRight(10, ' ')
				);

				for (uint subleaf = 1; subleaf <= 0xF; subleaf++)
				{
					cpuid_buffer[0] = 0;
					cpuid_buffer[1] = 0;
					cpuid_buffer[2] = 0;
					cpuid_buffer[3] = 0;
					cpuid((uint)(leafBase + leaf), subleaf, cpuid_buffer);

					Console.WriteLine(
						$"{leafBase + leaf:x8}.{subleaf:x2}".PadRight(14, ' ') +
						$"{cpuid_buffer[0]:x8}".PadRight(10, ' ') +
						$"{cpuid_buffer[1]:x8}".PadRight(10, ' ') +
						$"{cpuid_buffer[2]:x8}".PadRight(10, ' ') +
						$"{cpuid_buffer[3]:x8}".PadRight(10, ' ')
					);
				}
				Console.WriteLine();
			}
		}

		pinnedHandle.Free();

		NtVirtualMemory.FreeMemory(proc.Handle, addr, 4096, MemoryFreeType.Release);
	}
}
