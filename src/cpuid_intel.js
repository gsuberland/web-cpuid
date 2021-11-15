"use strict";

/*
Resolvers for Intel CPUs
*/
class CpuidResolversIntel
{
	static cpuid1_processorType(v, ctx=null)
	{
		return ["Original OEM Processor", "Intel OverDrive Processor", "Dual Processor", "Intel reserved"][v];
	}

	static cpuid1_brandIndex(v, ctx=null)
	{
		return (v > 0x17) ? "reserved" : 
			[
			/* 00h */ "unsupported",
			/* 01h */ "Intel Celeron",
			/* 02h */ "Intel Pentium III",
			/* 03h */ "Intel Pentium III Xeon",
			/* 04h */ "Intel Pentium III",
			/* 05h */ "reserved",
			/* 06h */ "Mobile Intel Pentium III",
			/* 07h */ "Mobile Intel Celeron",
			/* 08h */ "Intel Pentium 4",
			/* 09h */ "Intel Pentium 4",
			/* 0ah */ "Intel Celeron",
			/* 0bh */ "Intel Xeon",
			/* 0ch */ "Intel Xeon MP",
			/* 0dh */ "reserved",
			/* 0eh */ "Mobile Intel Pentium 4 or Xeon",
			/* 0fh */ "Mobile Intel Celeron",
			/* 10h */ "reserved",
			/* 11h */ "Mobile Genuine Intel",
			/* 12h */ "Intel Celeron M",
			/* 13h */ "Mobile Intel Celeron",
			/* 14h */ "Intel Celeron",
			/* 15h */ "Mobile Genuine Intel",
			/* 16h */ "Intel Pentium M",
			/* 17h */ "Mobile Intel Celeron"
			][v>>>0];
	}

	static cpuid1_clflushLineSize(v, ctx=null)
	{
		return (v>>>0)*8;
	}

	static cpuid4_cacheType(v, ctx=null)
	{
		return (v>>>0) > 3 ? "reserved" : ["null", "data", "instruction", "unified"][v>>>0];
	}

	static cpuid4_cci(v, ctx=null)
	{
		return (v == 1) ? "complex function" : "direct mapped";
	}
	
	static cpuid2_descriptor(v, ctx=null)
	{
		return [
			/* 00h */ "NULL descriptor",
			/* 01h */ "Instruction TLB: 4 KB pages, 4-way set associative, 32 entries",
			/* 02h */ "Instruction TLB: 4 MB pages, fully associative, 2 entries",
			/* 03h */ "Data TLB: 4KB pages, 4-way set associative, 64 entries",
			/* 04h */ "Data TLB: 4MB pages, 4-way set associative, 8 entries",
			/* 05h */ "Data TLB1: 4MB pages, 4-way set associative, 32 entries",
			/* 06h */ "1st-level instruction cache: 8KB, 4-way set associative, 32 byte line size",
			/* 07h */ "reserved",
			/* 08h */ "1st-level instruction cache: 16KB, 4-way set associative, 32 byte line size",
			/* 09h */ "1st-level instruction cache: 32KB, 4-way set associative, 64 byte line size",
			/* 0Ah */ "1st-level data cache: 8KB, 2-way set associative, 32 byte line size",
			/* 0Bh */ "Instruction TLB: 4MB pages, 4-way set associative, 4 entries",
			/* 0Ch */ "1st-level data cache: 16KB, 4-way set associative, 32 byte line size",
			/* 0Dh */ "1st-level data cache: 16KB, 4-way set associative, 64 byte line size",
			/* 0Eh */ "1st-level data cache: 24KB, 6-way set associative, 64 byte line size",
			/* 0Fh */ "reserved",
			/* 10h */ "reserved",
			/* 11h */ "reserved",
			/* 12h */ "reserved",
			/* 13h */ "reserved",
			/* 14h */ "reserved",
			/* 15h */ "reserved",
			/* 16h */ "reserved",
			/* 17h */ "reserved",
			/* 18h */ "reserved",
			/* 19h */ "reserved",
			/* 1Ah */ "reserved",
			/* 1Bh */ "reserved",
			/* 1Ch */ "reserved",
			/* 1Dh */ "2nd-level cache: 128KB, 2-way set associative, 64 byte line size",
			/* 1Eh */ "reserved",
			/* 1Fh */ "reserved",
			/* 20h */ "reserved",
			/* 21h */ "2nd-level cache: 256KB, 8-way set associative, 64 byte line size",
			/* 22h */ "3rd-level cache: 512KB, 4-way set associative, 64 byte line size, 2 lines per sector",
			/* 23h */ "3rd-level cache: 1MB, 8-way set associative, 64 byte line size, 2 lines per sector",
			/* 24h */ "2nd-level cache: 1MB, 16-way set associative, 64 byte line size",
			/* 25h */ "3rd-level cache: 2MB, 8-way set associative, 64 byte line size, 2 lines per sector",
			/* 26h */ "reserved",
			/* 27h */ "reserved",
			/* 28h */ "reserved",
			/* 29h */ "3rd-level cache: 4MB, 8-way set associative, 64 byte line size, 2 lines per sector",
			/* 2Ah */ "reserved",
			/* 2Bh */ "reserved",
			/* 2Ch */ "1st-level data cache: 32KB, 8-way set associative, 64 byte line size",
			/* 2Dh */ "reserved",
			/* 2Eh */ "reserved",
			/* 2Fh */ "reserved",
			/* 30h */ "1st-level instruction cache: 32KB, 8-way set associative, 64 byte line size",
			/* 31h */ "reserved",
			/* 32h */ "reserved",
			/* 33h */ "reserved",
			/* 34h */ "reserved",
			/* 35h */ "reserved",
			/* 36h */ "reserved",
			/* 37h */ "reserved",
			/* 38h */ "reserved",
			/* 39h */ "reserved",
			/* 3Ah */ "reserved",
			/* 3Bh */ "reserved",
			/* 3Ch */ "reserved",
			/* 3Dh */ "reserved",
			/* 3Eh */ "reserved",
			/* 3Fh */ "reserved",
			/* 40h */ "No 2nd-level cache or, if processor contains a valid 2nd-level cache, no 3rd-level cache",
			/* 41h */ "2nd-level cache: 128KB, 4-way set associative, 32 byte line size",
			/* 42h */ "2nd-level cache: 256KB, 4-way set associative, 32 byte line size",
			/* 43h */ "2nd-level cache: 512KB, 4-way set associative, 32 byte line size",
			/* 44h */ "2nd-level cache: 1MB, 4-way set associative, 32 byte line size",
			/* 45h */ "2nd-level cache: 2MB, 4-way set associative, 32 byte line size",
			/* 46h */ "3rd-level cache: 4MB, 4-way set associative, 64 byte line size",
			/* 47h */ "3rd-level cache: 8MB, 8-way set associative, 64 byte line size",
			/* 48h */ "2nd-level cache: 3MB, 12-way set associative, 64 byte line size",
			/* 49h */ "3rd-level cache: 4MB, 16-way set associative, 64 byte line size / 2nd-level on Intel Xeon processor MP, Family 0FH, Model 06H",
			/* 4Ah */ "3rd-level cache: 6MB, 12-way set associative, 64 byte line size",
			/* 4Bh */ "3rd-level cache: 8MB, 16-way set associative, 64 byte line size",
			/* 4Ch */ "3rd-level cache: 12MB, 12-way set associative, 64 byte line size",
			/* 4Dh */ "3rd-level cache: 16MB, 16-way set associative, 64 byte line size",
			/* 4Eh */ "2nd-level cache: 6MB, 24-way set associative, 64 byte line size",
			/* 4Fh */ "Instruction TLB: 4KB pages, 32 entries",
			/* 50h */ "Instruction TLB: 4KB and 2MB or 4MB pages, 64 entries",
			/* 51h */ "Instruction TLB: 4KB and 2MB or 4MB pages, 128 entries",
			/* 52h */ "Instruction TLB: 4KB and 2MB or 4MB pages, 256 entries",
			/* 53h */ "reserved",
			/* 54h */ "reserved",
			/* 55h */ "Instruction TLB: 2MB or 4MB pages, fully associative, 7 entries",
			/* 56h */ "Data TLB0: 4MB pages, 4-way set associative, 16 entries",
			/* 57h */ "Data TLB0: 4KB pages, 4-way associative, 16 entries",
			/* 58h */ "reserved",
			/* 59h */ "Data TLB0: 4KB pages, fully associative, 16 entries",
			/* 5Ah */ "Data TLB0: 2MB or 4MB pages, 4-way set associative, 32 entries",
			/* 5Bh */ "Data TLB: 4KB and 4MB pages, 64 entries",
			/* 5Ch */ "Data TLB: 4KB and 4MB pages,128 entries",
			/* 5Dh */ "Data TLB: 4KB and 4MB pages,256 entries",
			/* 5Eh */ "reserved",
			/* 5Fh */ "reserved",
			/* 60h */ "1st-level data cache: 16KB, 8-way set associative, 64 byte line size",
			/* 61h */ "Instruction TLB: 4KB pages, fully associative, 48 entries",
			/* 62h */ "reserved",
			/* 63h */ "Data TLB: 2MB or 4MB pages, 4-way set associative, 32 entries and a separate array with 1GB pages, 4-way set associative, 4 entries",
			/* 64h */ "Data TLB: 4KB pages, 4-way set associative, 512 entries",
			/* 65h */ "reserved",
			/* 66h */ "1st-level data cache: 8KB, 4-way set associative, 64 byte line size",
			/* 67h */ "1st-level data cache: 16KB, 4-way set associative, 64 byte line size",
			/* 68h */ "1st-level data cache: 32KB, 4-way set associative, 64 byte line size",
			/* 69h */ "reserved",
			/* 6Ah */ "uTLB: 4KB pages, 8-way set associative, 64 entries",
			/* 6Bh */ "DTLB: 4KB pages, 8-way set associative, 256 entries",
			/* 6Ch */ "DTLB: 2M/4M pages, 8-way set associative, 128 entries",
			/* 6Dh */ "DTLB: 1GB pages, fully associative, 16 entries",
			/* 6Eh */ "reserved",
			/* 6Fh */ "reserved",
			/* 70h */ "Trace cache: 12 K-μop, 8-way set associative",
			/* 71h */ "Trace cache: 16 K-μop, 8-way set associative",
			/* 72h */ "Trace cache: 32 K-μop, 8-way set associative",
			/* 73h */ "reserved",
			/* 74h */ "reserved",
			/* 75h */ "reserved",
			/* 76h */ "Instruction TLB: 2M/4M pages, fully associative, 8 entries",
			/* 77h */ "reserved",
			/* 78h */ "2nd-level cache: 1MB, 4-way set associative, 64 byte line size",
			/* 79h */ "2nd-level cache: 128KB, 8-way set associative, 64 byte line size, 2 lines per sector",
			/* 7Ah */ "2nd-level cache: 256KB, 8-way set associative, 64 byte line size, 2 lines per sector",
			/* 7Bh */ "2nd-level cache: 512KB, 8-way set associative, 64 byte line size, 2 lines per sector",
			/* 7Ch */ "2nd-level cache: 1MB, 8-way set associative, 64 byte line size, 2 lines per sector",
			/* 7Dh */ "2nd-level cache: 2MB, 8-way set associative, 64 byte line size",
			/* 7Eh */ "reserved",
			/* 7Fh */ "2nd-level cache: 512KB, 2-way set associative, 64 byte line size",
			/* 80h */ "2nd-level cache: 512KB, 8-way set associative, 64 byte line size",
			/* 81h */ "reserved",
			/* 82h */ "2nd-level cache: 256KB, 8-way set associative, 32 byte line size",
			/* 83h */ "2nd-level cache: 512KB, 8-way set associative, 32 byte line size",
			/* 84h */ "2nd-level cache: 1MB, 8-way set associative, 32 byte line size",
			/* 85h */ "2nd-level cache: 2MB, 8-way set associative, 32 byte line size",
			/* 86h */ "2nd-level cache: 512KB, 4-way set associative, 64 byte line size",
			/* 87h */ "2nd-level cache: 1MB, 8-way set associative, 64 byte line size",
			/* 88h */ "reserved",
			/* 89h */ "reserved",
			/* 8Ah */ "reserved",
			/* 8Bh */ "reserved",
			/* 8Ch */ "reserved",
			/* 8Dh */ "reserved",
			/* 8Eh */ "reserved",
			/* 8Fh */ "reserved",
			/* 90h */ "reserved",
			/* 91h */ "reserved",
			/* 92h */ "reserved",
			/* 93h */ "reserved",
			/* 94h */ "reserved",
			/* 95h */ "reserved",
			/* 96h */ "reserved",
			/* 97h */ "reserved",
			/* 98h */ "reserved",
			/* 99h */ "reserved",
			/* 9Ah */ "reserved",
			/* 9Bh */ "reserved",
			/* 9Ch */ "reserved",
			/* 9Dh */ "reserved",
			/* 9Eh */ "reserved",
			/* 9Fh */ "reserved",
			/* A0h */ "DTLB: 4K pages, fully associative, 32 entries",
			/* A1h */ "reserved",
			/* A2h */ "reserved",
			/* A3h */ "reserved",
			/* A4h */ "reserved",
			/* A5h */ "reserved",
			/* A6h */ "reserved",
			/* A7h */ "reserved",
			/* A8h */ "reserved",
			/* A9h */ "reserved",
			/* AAh */ "reserved",
			/* ABh */ "reserved",
			/* ACh */ "reserved",
			/* ADh */ "reserved",
			/* AEh */ "reserved",
			/* AFh */ "reserved",
			/* B0h */ "Instruction TLB: 4KB pages, 4-way set associative, 128 entries",
			/* B1h */ "Instruction TLB: 2M pages, 4-way, 8 entries or 4M pages, 4-way, 4 entries",
			/* B2h */ "Instruction TLB: 4KB pages, 4-way set associative, 64 entries",
			/* B3h */ "Data TLB: 4KB pages, 4-way set associative, 128 entries",
			/* B4h */ "Data TLB1: 4KB pages, 4-way associative, 256 entries",
			/* B5h */ "Instruction TLB: 4KB pages, 8-way set associative, 64 entries",
			/* B6h */ "Instruction TLB: 4KB pages, 8-way set associative, 128 entries",
			/* B7h */ "reserved",
			/* B8h */ "reserved",
			/* B9h */ "reserved",
			/* BAh */ "Data TLB1: 4KB pages, 4-way associative, 64 entries",
			/* BBh */ "reserved",
			/* BCh */ "reserved",
			/* BDh */ "reserved",
			/* BEh */ "reserved",
			/* BFh */ "reserved",
			/* C0h */ "Data TLB: 4KB and 4MB pages, 4-way associative, 8 entries",
			/* C1h */ "Shared 2nd-Level TLB: 4KB/2MB pages, 8-way associative, 1024 entries",
			/* C2h */ "DTLB: 4KB/2MB pages, 4-way associative, 16 entries",
			/* C3h */ "Shared 2nd-Level TLB: 4KB/2MB pages, 6-way associative, 1536 entries. Also 1GB pages, 4-way, 16 entries.",
			/* C4h */ "DTLB: 2M/4M Byte pages, 4-way associative, 32 entries",
			/* C5h */ "reserved",
			/* C6h */ "reserved",
			/* C7h */ "reserved",
			/* C8h */ "reserved",
			/* C9h */ "reserved",
			/* CAh */ "Shared 2nd-Level TLB: 4KB pages, 4-way associative, 512 entries",
			/* CBh */ "reserved",
			/* CCh */ "reserved",
			/* CDh */ "reserved",
			/* CEh */ "reserved",
			/* CFh */ "reserved",
			/* D0h */ "3rd-level cache: 512KB, 4-way set associative, 64 byte line size",
			/* D1h */ "3rd-level cache: 1MB, 4-way set associative, 64 byte line size",
			/* D2h */ "3rd-level cache: 2MB, 4-way set associative, 64 byte line size",
			/* D3h */ "reserved",
			/* D4h */ "reserved",
			/* D5h */ "reserved",
			/* D6h */ "3rd-level cache: 1MB, 8-way set associative, 64 byte line size",
			/* D7h */ "3rd-level cache: 2MB, 8-way set associative, 64 byte line size",
			/* D8h */ "3rd-level cache: 4MB, 8-way set associative, 64 byte line size",
			/* D9h */ "reserved",
			/* DAh */ "reserved",
			/* DBh */ "reserved",
			/* DCh */ "3rd-level cache: 1.5MB, 12-way set associative, 64 byte line size",
			/* DDh */ "3rd-level cache: 3MB, 12-way set associative, 64 byte line size",
			/* DEh */ "3rd-level cache: 6MB, 12-way set associative, 64 byte line size",
			/* DFh */ "reserved",
			/* E0h */ "reserved",
			/* E1h */ "reserved",
			/* E2h */ "3rd-level cache: 2MB, 16-way set associative, 64 byte line size",
			/* E3h */ "3rd-level cache: 4MB, 16-way set associative, 64 byte line size",
			/* E4h */ "3rd-level cache: 8MB, 16-way set associative, 64 byte line size",
			/* E5h */ "reserved",
			/* E6h */ "reserved",
			/* E7h */ "reserved",
			/* E8h */ "reserved",
			/* E9h */ "reserved",
			/* EAh */ "3rd-level cache: 12MB, 24-way set associative, 64 byte line size",
			/* EBh */ "3rd-level cache: 18MB, 24-way set associative, 64 byte line size",
			/* ECh */ "3rd-level cache: 24MB, 24-way set associative, 64 byte line size",
			/* EDh */ "reserved",
			/* EEh */ "reserved",
			/* EFh */ "reserved",
			/* F0h */ "64 byte prefetching",
			/* F1h */ "128 byte prefetching",
			/* F2h */ "reserved",
			/* F3h */ "reserved",
			/* F4h */ "reserved",
			/* F5h */ "reserved",
			/* F6h */ "reserved",
			/* F7h */ "reserved",
			/* F8h */ "reserved",
			/* F9h */ "reserved",
			/* FAh */ "reserved",
			/* FBh */ "reserved",
			/* FCh */ "reserved",
			/* FDh */ "reserved",
			/* FEh */ "No TLB descriptors in cpuid.2; see cpuid.18 instead",
			/* FFh */ "No cache descriptors in cpuid.2; see cpuid.4 instead",
		][v>>>0];
	}
	
	static cpuid0b_type_level(v, ctx=null)
	{
		return (v>>>0) > 2 ? "reserved" : [
			"Invalid",
			"SMT",
			"Core"
		][v>>>0];
	}
	
	static cpuid12_enclave_size(v, ctx=null)
	{
		// enclave size is 2^v
		return (1 << (v>>>0)) >>> 0;
	}
	
	static cpuid15_clock_ratio(v, ctx=null)
	{
		return "ratio: " + ctx.registers[1].toString(10) + "/" + ctx.registers[0].toString(10) + "=" + Number((ctx.registers[1] / ctx.registers[0]).toFixed(2));
	}
	
	static cpuid16_frequency(v, ctx=null)
	{
		if ((v>>>0) < 1000)
			return (v>>>0) + "MHz";
		else
		{
			let fg = (v>>>0) / 1000;
			if (Number.isInteger(fg))
				return fg + ".0GHz";
			return fg + "GHz";
		}
	}
	
	static cpuid17_vendor_id_scheme(v, ctx=null)
	{
		// 0 = intel, 1 = industry standard scheme
		return ["Assigned by Intel", "Assigned by industry standard enumeration scheme"][v>>>0];
	}
	
	static cpuid80000006_L2_associativity(v, ctx=null)
	{
		if ((v>>>0) > 0xF)
			return "unknown";
		return [
			/* 00 */ "disabled",
			/* 01 */ "direct mapped",
			/* 02 */ "2-way",
			/* 03 */ "reserved",
			/* 04 */ "4-way",
			/* 05 */ "reserved",
			/* 06 */ "8-way",
			/* 07 */ "reserved",
			/* 08 */ "16-way",
			/* 09 */ "reserved",
			/* 0a */ "reserved",
			/* 0b */ "reserved",
			/* 0c */ "reserved",
			/* 0d */ "reserved",
			/* 0e */ "reserved",
			/* 0f */ "fully associative",
		][v>>>0];
	}
}

/*
Field definitions for Intel CPUs
*/
class CpuidFieldsIntel extends CpuidFieldsBase
{
	// generic reserved field
	#cpuid_reserved_field = [
		new CpuidField("Reserved", [31,0], null, { reserved: true }),
	];
	
	// cpuid.0.0:eax
	#cpuid_00_eax_fields = [
		new CpuidField("Maximum value for basic CPUID", [31,0], null, { printRawHex: true }),
	];
	
	// cpuid.0.0:ebx
	#cpuid_00_ebx_fields = [
		new CpuidField("CPU type name 0", [31,0], CpuidBaseResolvers.ascii, { printRawHex: true }),
	];

	// cpuid.0.0:ecx
	#cpuid_00_ecx_fields = [
		new CpuidField("CPU type name 2", [31,0], CpuidBaseResolvers.ascii, { printRawHex: true }),
	];

	// cpuid.0.0:edx
	#cpuid_00_edx_fields = [
		new CpuidField("CPU type name 1", [31,0], CpuidBaseResolvers.ascii, { printRawHex: true }),
	];

	// cpuid.1.0:eax
	#cpuid_01_eax_fields = [
		new CpuidField("Reserved", [31,28], null, { reserved: true }),
		new CpuidField("Extended family ID", [27,20], null, { printRawHex: true }),
		new CpuidField("Extended model ID", [19,16], null, { printRawHex: true }),
		new CpuidField("Reserved", [15,14], null, { reserved: true }),
		new CpuidField("Processor type", [13,12], CpuidResolversIntel.cpuid1_processorType),
		new CpuidField("Family ID", [11,8], null, { printRawHex: true }),
		new CpuidField("Model ID", [7,4], null, { printRawHex: true }),
		new CpuidField("Stepping ID", [3,0], null, { printRawHex: true }),
	];

	// cpuid.1.0:ebx
	#cpuid_01_ebx_fields = [
		new CpuidField("Initial APIC value", [31,24], null, { printRawHex: true }),
		new CpuidField("Logical processors", [23,16]),
		new CpuidField("CLFLUSH line size", [15,8], CpuidResolversIntel.cpuid1_clflushLineSize, { printRawHex: true }),
		new CpuidField("Brand index", [7,0], CpuidResolversIntel.cpuid1_brandIndex, { printRawHex: true }),
	];

	// cpuid.1.0:ecx
	#cpuid_01_ecx_fields = [
		new CpuidField("Hypervisor (not set by hardware)", 31, CpuidBaseResolvers.bool), // this is not a CPUID bit specific to Intel, but it is set to true by some hypervisors.
		new CpuidField("RDRAND", 30, CpuidBaseResolvers.bool),
		new CpuidField("16-bit FP conversion", 29, CpuidBaseResolvers.bool),
		new CpuidField("AVX", 28, CpuidBaseResolvers.bool),
		new CpuidField("XSAVE/XSTOR enabled by OS", 27, CpuidBaseResolvers.bool),
		new CpuidField("XSAVE", 26, CpuidBaseResolvers.bool),
		new CpuidField("AESNI", 25, CpuidBaseResolvers.bool),
		new CpuidField("TSC deadline", 24, CpuidBaseResolvers.bool),
		new CpuidField("POPCNT", 23, CpuidBaseResolvers.bool),
		new CpuidField("MOVBE", 22, CpuidBaseResolvers.bool),
		new CpuidField("x2APIC", 21, CpuidBaseResolvers.bool),
		new CpuidField("SSE4.2", 20, CpuidBaseResolvers.bool),
		new CpuidField("SSE4.1", 19, CpuidBaseResolvers.bool),
		new CpuidField("DCA", 18, CpuidBaseResolvers.bool),
		new CpuidField("Process-context identifiers", 17, CpuidBaseResolvers.bool),
		new CpuidField("Reserved", 16, null, { reserved: true }),
		new CpuidField("Perfmon and debug capability", 15, CpuidBaseResolvers.bool),
		new CpuidField("xTPR update control", 14, CpuidBaseResolvers.bool),
		new CpuidField("CMPXCHG16B", 13, CpuidBaseResolvers.bool),
		new CpuidField("FMA", 12, CpuidBaseResolvers.bool),
		new CpuidField("SDBG", 11, CpuidBaseResolvers.bool),
		new CpuidField("L1 context ID", 10, CpuidBaseResolvers.bool),
		new CpuidField("SSSE3", 9, CpuidBaseResolvers.bool),
		new CpuidField("Thermal Monitor 2", 8, CpuidBaseResolvers.bool),
		new CpuidField("Enhanced SpeedStep", 7, CpuidBaseResolvers.bool),
		new CpuidField("Safer mode extensions", 6, CpuidBaseResolvers.bool),
		new CpuidField("Virtual machine extensions", 5, CpuidBaseResolvers.bool),
		new CpuidField("CPL qualified debug store", 4, CpuidBaseResolvers.bool),
		new CpuidField("MONITOR/MWAIT", 3, CpuidBaseResolvers.bool),
		new CpuidField("64-bit DS area", 2, CpuidBaseResolvers.bool),
		new CpuidField("PCLMULQDQ", 1, CpuidBaseResolvers.bool),
		new CpuidField("SSE3", 0, CpuidBaseResolvers.bool),
	];

	// cpuid.1.0:edx
	#cpuid_01_edx_fields = [
		new CpuidField("Pending break enable", 31, CpuidBaseResolvers.bool),
		new CpuidField("Reserved", 30, null, { reserved: true }),
		new CpuidField("Thermal monitor", 29, CpuidBaseResolvers.bool),
		new CpuidField("HyperThreading / max APIC IDs field is valid", 28, CpuidBaseResolvers.bool),
		new CpuidField("Self snoop", 27, CpuidBaseResolvers.bool),
		new CpuidField("SSE2", 26, CpuidBaseResolvers.bool),
		new CpuidField("SSE", 25, CpuidBaseResolvers.bool),
		new CpuidField("FXSAVE/FXSTOR", 24, CpuidBaseResolvers.bool),
		new CpuidField("MMX", 23, CpuidBaseResolvers.bool),
		new CpuidField("ACPI", 22, CpuidBaseResolvers.bool),
		new CpuidField("Debug store", 21, CpuidBaseResolvers.bool),
		new CpuidField("Reserved", 20, null, { reserved: true }),
		new CpuidField("CLFLUSH", 19, CpuidBaseResolvers.bool),
		new CpuidField("Processor serial number", 18, CpuidBaseResolvers.bool),
		new CpuidField("32-bit page size extension", 17, CpuidBaseResolvers.bool),
		new CpuidField("Page attribute table", 16, CpuidBaseResolvers.bool),
		new CpuidField("Conditional move instructions", 15, CpuidBaseResolvers.bool),
		new CpuidField("Machine check architecture", 14, CpuidBaseResolvers.bool),
		new CpuidField("Page global bit", 13, CpuidBaseResolvers.bool),
		new CpuidField("Memory type range registers", 12, CpuidBaseResolvers.bool),
		new CpuidField("SYSENTER/SYSEXIT", 11, CpuidBaseResolvers.bool),
		new CpuidField("Reserved", 10, null, { reserved: true }),
		new CpuidField("APIC on chip", 9, CpuidBaseResolvers.bool),
		new CpuidField("CMPXCHG8B", 8, CpuidBaseResolvers.bool),
		new CpuidField("Machine check exception", 7, CpuidBaseResolvers.bool),
		new CpuidField("Physical address extension", 6, CpuidBaseResolvers.bool),
		new CpuidField("Model specific registers", 5, CpuidBaseResolvers.bool),
		new CpuidField("Time stamp counter", 4, CpuidBaseResolvers.bool),
		new CpuidField("Page size extension", 3, CpuidBaseResolvers.bool),
		new CpuidField("Debugging extensions", 2, CpuidBaseResolvers.bool),
		new CpuidField("Virtual 8086 mode enhancements", 1, CpuidBaseResolvers.bool),
		new CpuidField("x87 FPU on chip", 0, CpuidBaseResolvers.bool),
	];
	
	// cpuid.2.0:eax
	#cpuid_02_eax_fields = [
		new CpuidField("Valid", 31, CpuidBaseResolvers.boolInv),
		new CpuidField("Cache descriptor 2", [30,24], CpuidResolversIntel.cpuid2_descriptor, { printRawHex: true }),
		new CpuidField("Cache descriptor 1", [23,16], CpuidResolversIntel.cpuid2_descriptor, { printRawHex: true }),
		new CpuidField("Cache descriptor 0", [15,8], CpuidResolversIntel.cpuid2_descriptor, { printRawHex: true }),
		new CpuidField("Cache descriptor sub-leaves", [7,0], { printRawHex: true }),
	];
	
	// cpuid.2.0:ebx
	#cpuid_02_ebx_fields = [
		new CpuidField("Valid", 31, CpuidBaseResolvers.boolInv),
		new CpuidField("Cache descriptor 6", [30,24], CpuidResolversIntel.cpuid2_descriptor, { printRawHex: true }),
		new CpuidField("Cache descriptor 5", [23,16], CpuidResolversIntel.cpuid2_descriptor, { printRawHex: true }),
		new CpuidField("Cache descriptor 4", [15,8], CpuidResolversIntel.cpuid2_descriptor, { printRawHex: true }),
		new CpuidField("Cache descriptor 3", [7,0], CpuidResolversIntel.cpuid2_descriptor, { printRawHex: true }),
	];
	
	// cpuid.2.0:ecx
	#cpuid_02_ecx_fields = [
		new CpuidField("Valid", 31, CpuidBaseResolvers.boolInv),
		new CpuidField("Cache descriptor 10", [30,24], CpuidResolversIntel.cpuid2_descriptor, { printRawHex: true }),
		new CpuidField("Cache descriptor 9", [23,16], CpuidResolversIntel.cpuid2_descriptor, { printRawHex: true }),
		new CpuidField("Cache descriptor 8", [15,8], CpuidResolversIntel.cpuid2_descriptor, { printRawHex: true }),
		new CpuidField("Cache descriptor 7", [7,0], CpuidResolversIntel.cpuid2_descriptor, { printRawHex: true }),
	];
	
	// cpuid.2.0:ecx
	#cpuid_02_edx_fields = [
		new CpuidField("Valid", 31, CpuidBaseResolvers.boolInv),
		new CpuidField("Cache descriptor 14", [30,24], CpuidResolversIntel.cpuid2_descriptor, { printRawHex: true }),
		new CpuidField("Cache descriptor 13", [23,16], CpuidResolversIntel.cpuid2_descriptor, { printRawHex: true }),
		new CpuidField("Cache descriptor 12", [15,8], CpuidResolversIntel.cpuid2_descriptor, { printRawHex: true }),
		new CpuidField("Cache descriptor 11", [7,0], CpuidResolversIntel.cpuid2_descriptor, { printRawHex: true }),
	];
	
	// cpuid.3.0:eax and cpuid.3.0:ebx are reserved
	
	// cpuid.3.0:ecx
	#cpuid_03_ecx_fields = [
		new CpuidField("Processor serial number bits 00-31", [31,0], null, { printRawHex: true }),
	];
	
	// cpuid.3.0:edx
	#cpuid_03_edx_fields = [
		new CpuidField("Processor serial number bits 32-63", [31,0], null, { printRawHex: true }),
	];

	// cpuid.4.0:eax
	#cpuid_04_eax_fields = [
		new CpuidField("Cores per package", [31,26], CpuidBaseResolvers.increment, { printRawHex: true }),
		new CpuidField("Threads sharing cache", [25,14], CpuidBaseResolvers.increment, { printRawHex: true }),
		new CpuidField("Reserved", [13,10], null, { reserved: true }),
		new CpuidField("Fully associative", 9, CpuidBaseResolvers.bool),
		new CpuidField("Self initializing", 8, CpuidBaseResolvers.bool),
		new CpuidField("Level", [7,5]),
		new CpuidField("Cache type", [4,0], CpuidResolversIntel.cpuid4_cacheType),
	];

	// cpuid.4.0:ebx
	#cpuid_04_ebx_fields = [
		new CpuidField("Ways of associativity", [31,22], CpuidBaseResolvers.increment, { printRawHex: true }),
		new CpuidField("Physical line partitions", [21,12], CpuidBaseResolvers.increment, { printRawHex: true }),
		new CpuidField("System coherency line size", [11,0], CpuidBaseResolvers.increment, { printRawHex: true }),
	];

	// cpuid.4.0:ecx
	#cpuid_04_ecx_fields = [
		new CpuidField("Number of sets", [31,0], CpuidBaseResolvers.increment, { printRawHex: true }),
	];

	// cpuid.4.0:edx
	#cpuid_04_edx_fields = [
		new CpuidField("Reserved", [31,3], null, { reserved: true }),
		new CpuidField("Complex cache indexing", 2, CpuidResolversIntel.cpuid4_cci),
		new CpuidField("Cache inclusive of lower levels", 1, CpuidBaseResolvers.bool),
		new CpuidField("Write-back invalidate on lower levels", 0, CpuidBaseResolvers.bool_inv),
	];
	
	// cpuid.5.0:eax
	#cpuid_05_eax_fields = [
		new CpuidField("Reserved", [31,16], null, { reserved: true }),
		new CpuidField("Smallest monitor line size", [15,0]),
	];
	
	// cpuid.5.0:ebx
	#cpuid_05_ebx_fields = [
		new CpuidField("Reserved", [31,16], null, { reserved: true }),
		new CpuidField("Largest monitor line size", [15,0]),
	];
	
	// cpuid.5.0:ecx
	#cpuid_05_ecx_fields = [
		new CpuidField("Reserved", [31,2], null, { reserved: true }),
		new CpuidField("Supports treating interrupts as break events for MWAIT", 1, CpuidBaseResolvers.bool),
		new CpuidField("Enumeration of MONITOR/MWAIT supported", 0, CpuidBaseResolvers.bool),
	];
	
	// cpuid.5.0:ecx
	#cpuid_05_edx_fields = [
		new CpuidField("Number of C7 sub C-states supported using MWAIT", [31,28]),
		new CpuidField("Number of C6 sub C-states supported using MWAIT", [27,24]),
		new CpuidField("Number of C5 sub C-states supported using MWAIT", [23,20]),
		new CpuidField("Number of C4 sub C-states supported using MWAIT", [19,16]),
		new CpuidField("Number of C3 sub C-states supported using MWAIT", [15,12]),
		new CpuidField("Number of C2 sub C-states supported using MWAIT", [11,8]),
		new CpuidField("Number of C1 sub C-states supported using MWAIT", [7,4]),
		new CpuidField("Number of C0 sub C-states supported using MWAIT", [3,0]),
	];
	
	// cpuid.6.0:eax - some fields not documented in CPUID instruction docs.
	// see reference https://github.com/tycho/cpuid/blob/829e90ce44b84fda3cd4e1421cf76e98f5eb876b/feature.c#L136
	#cpuid_06_eax_fields = [
		new CpuidField("IP payloads are LIP", 31, CpuidBaseResolvers.bool),
		new CpuidField("Reserved", [30,22], null, { reserved: true }),
		new CpuidField("Enhanced hardware feedback MSRs", 23, CpuidBaseResolvers.bool),
		new CpuidField("Reserved", [22,21], null, { reserved: true }),
		new CpuidField("Ignoring idle logical processor HWP request", 20, CpuidBaseResolvers.bool),
		new CpuidField("Hardware feedback MSRs", 19, CpuidBaseResolvers.bool),
		new CpuidField("Fast access mode for IA32_HWP_REQUEST MSR", 18, CpuidBaseResolvers.bool),
		new CpuidField("Flexible HWP", 17, CpuidBaseResolvers.bool),
		new CpuidField("HWP PECI override", 16, CpuidBaseResolvers.bool),
		new CpuidField("HWP highest performance charge", 15, CpuidBaseResolvers.bool),
		new CpuidField("Intel Turbo Boost Max Technology 3.0", 14, CpuidBaseResolvers.bool),
		new CpuidField("Hardware duty cycling (HDC)", 13, CpuidBaseResolvers.bool),
		new CpuidField("Reserved", 12, null, { reserved: true }),
		new CpuidField("HWP package level request", 11, CpuidBaseResolvers.bool),
		new CpuidField("HWP energy performance preference", 10, CpuidBaseResolvers.bool),
		new CpuidField("HWP activity window", 9, CpuidBaseResolvers.bool),
		new CpuidField("HWP notification", 8, CpuidBaseResolvers.bool),
		new CpuidField("Hardware managed P-state base support (HWP)", 7, CpuidBaseResolvers.bool),
		new CpuidField("Package thermal management (PTM)", 6, CpuidBaseResolvers.bool),
		new CpuidField("Clock modulation duty cycle extension (EMCD)", 5, CpuidBaseResolvers.bool),
		new CpuidField("Power limit notification (PLN)", 4, CpuidBaseResolvers.bool),
		new CpuidField("Reserved", 3, null, { reserved: true }),
		new CpuidField("Support APIC timer always running (ARAT)", 2, CpuidBaseResolvers.bool),
		new CpuidField("Intel Turbo Boost Technology available", 1, CpuidBaseResolvers.bool),
		new CpuidField("Digital temperature sensor", 0, CpuidBaseResolvers.bool),
	];
	
	// cpuid.6.0:ebx
	#cpuid_06_ebx_fields = [
		new CpuidField("Reserved", [31,4], null, { reserved: true }),
		new CpuidField("Number of interrupt thresholds in digital thermal sensor", [3,0]),
	];
	
	// cpuid.6.0:ecx
	#cpuid_06_ecx_fields = [
		new CpuidField("Reserved", [31,4], null, { reserved: true }),
		new CpuidField("Performance-energy bias preference supported", 3, CpuidBaseResolvers.bool),
		new CpuidField("Reserved", [2,1], null, { reserved: true }),
		new CpuidField("Hardware coordination feedback", 0, CpuidBaseResolvers.bool),
	];
	
	// cpuid.6.0:edx is reserved
	
	// cpuid.7.0:eax
	#cpuid_07_eax_fields = [
		new CpuidField("Number of sub-leaves present", [31,0]),
	];
	
	// cpuid.7.0:ebx
	#cpuid_07_ebx_fields = [
		new CpuidField("AVX512 vector length extensions (AVX512VL)", 31, CpuidBaseResolvers.bool),
		new CpuidField("AVX512 byte/word instructions (AVX512BW)", 30, CpuidBaseResolvers.bool),
		new CpuidField("SHA extensions", 29, CpuidBaseResolvers.bool),
		new CpuidField("AVX512 conflict detection extensions (AVX512CD)", 28, CpuidBaseResolvers.bool),
		new CpuidField("AVX512 exponent/reciprocal instructions (AVX512ER)", 27, CpuidBaseResolvers.bool),
		new CpuidField("AVX512 prefetch instructions (AVX512PF)", 26, CpuidBaseResolvers.bool),
		new CpuidField("Intel Processor Trace", 25, CpuidBaseResolvers.bool),
		new CpuidField("Cache line write back (CLWB)", 24, CpuidBaseResolvers.bool),
		new CpuidField("CLFLUSHOPT", 23, CpuidBaseResolvers.bool),
		new CpuidField("Persistent commit instruction (PCOMMIT)", 22, CpuidBaseResolvers.bool),
		new CpuidField("AVX512 integer FMA instructions (AVBX512IFMA)", 21, CpuidBaseResolvers.bool),
		new CpuidField("Supervisor-mode access prevention (SMAP)", 20, CpuidBaseResolvers.bool),
		new CpuidField("Arbitrary precision add-carry instructions (ADX)", 19, CpuidBaseResolvers.bool),
		new CpuidField("RDSEED", 18, CpuidBaseResolvers.bool),
		new CpuidField("AVX512 dword/qword instructions (AVX512DQ)", 17, CpuidBaseResolvers.bool),
		new CpuidField("AVX512 foundation (AVX512F)", 16, CpuidBaseResolvers.bool),
		new CpuidField("PQE / Resource director technology allocation (RDT-A) capability", 15, CpuidBaseResolvers.bool),
		new CpuidField("Memory protection extensions (MPX)", 14, CpuidBaseResolvers.bool),
		new CpuidField("FPU CS and FPU DS values are deprecated", 13, CpuidBaseResolvers.bool),
		new CpuidField("PQM / Resource director technology monitoring (RDT-M) capability", 12, CpuidBaseResolvers.bool),
		new CpuidField("Restricted transactional memory (RTM)", 11, CpuidBaseResolvers.bool),
		new CpuidField("INVPCID", 10, CpuidBaseResolvers.bool),
		new CpuidField("REP MOVSB/STOSB supported", 9, CpuidBaseResolvers.bool),
		new CpuidField("BMI2", 8, CpuidBaseResolvers.bool),
		new CpuidField("Supervisor-mode execution prevention (SMEP)", 7, CpuidBaseResolvers.bool),
		new CpuidField("x87 FPU datap ointer updated only on x87 exceptions", 6, CpuidBaseResolvers.bool),
		new CpuidField("AVX2", 5, CpuidBaseResolvers.bool),
		new CpuidField("Hardware lock elision (HLE)", 4, CpuidBaseResolvers.bool),
		new CpuidField("BMI1", 3, CpuidBaseResolvers.bool),
		new CpuidField("Software guard extensions (SGX)", 2, CpuidBaseResolvers.bool),
		new CpuidField("IA32_TSC_ADJUST MSR supported", 1, CpuidBaseResolvers.bool),
		new CpuidField("FSGSBASE", 0, CpuidBaseResolvers.bool),
	];
	
	// cpuid.7.0:ecx
	#cpuid_07_ecx_fields = [
		new CpuidField("Protection keys for supervisor-mode pages (PKS)", 31, CpuidBaseResolvers.bool),
		new CpuidField("SGX launch configuration", 30, CpuidBaseResolvers.bool),
		new CpuidField("Enqueue stores (ENQCMD)", 29, CpuidBaseResolvers.bool),
		new CpuidField("64-bit direct stores (MOVDIRI64B)", 28, CpuidBaseResolvers.bool),
		new CpuidField("32-bit direct stores (MOVDIRI)", 27, CpuidBaseResolvers.bool),
		new CpuidField("Reserved", 26, null, { reserved: true }),
		new CpuidField("Cache line demote (CLDEMOTE)", 25, CpuidBaseResolvers.bool),
		new CpuidField("Reserved", 24, null, { reserved: true }),
		new CpuidField("Key locker (KL)", 23, CpuidBaseResolvers.bool),
		new CpuidField("Read processor ID (RDPID)", 22, CpuidBaseResolvers.bool),
		new CpuidField("Value of MAWAU used by BNDLDX and BNDSTX instructions in 64-bit mode", [21,17], null, { printRawHex: true }),
		new CpuidField("5-level paging (LA57)", 16, CpuidBaseResolvers.bool),
		new CpuidField("Reserved", 15, null, { reserved: true }),
		new CpuidField("AVX512 VPOPCNTDQ", 14, CpuidBaseResolvers.bool),
		new CpuidField("Total memory encryption (TME) enable", 13, CpuidBaseResolvers.bool),
		new CpuidField("AVX512 bitwise algorithms (AVX512BITALG)", 12, CpuidBaseResolvers.bool),
		new CpuidField("AVX512 vector neural network instructions (AVX512VNNI)", 11, CpuidBaseResolvers.bool),
		new CpuidField("VEX-encoded PCLMUL (VPCL)", 10, CpuidBaseResolvers.bool),
		new CpuidField("VEX-encoded AES-NI (VAES)", 9, CpuidBaseResolvers.bool),
		new CpuidField("Galois field NI / Galois field affine transformation (GFNI)", 8, CpuidBaseResolvers.bool),
		new CpuidField("CET shadow stack (CET SS)", 7, CpuidBaseResolvers.bool),
		new CpuidField("AVX512 VBMI2", 6, CpuidBaseResolvers.bool),
		new CpuidField("Wait and pause enhancements (WAITPKG)", 5, CpuidBaseResolvers.bool),
		new CpuidField("OS support enabled for protection keys (OSPKE)", 4, CpuidBaseResolvers.bool),
		new CpuidField("Supports protection keys for user-mode pages (PKU)", 3, CpuidBaseResolvers.bool),
		new CpuidField("User-mode instruction prevention (UMIP)", 2, CpuidBaseResolvers.bool),
		new CpuidField("AVX512 vector byte manipulation instructions (AVX512VBMI)", 1, CpuidBaseResolvers.bool),
		new CpuidField("PREFETCHWT1", 0, CpuidBaseResolvers.bool),
	];
	
	// cpuid.7.0:edx is reserved
	
	// cpuid.8.0 is reserved
	
	// cpuid.9.0:eax
	#cpuid_09_eax_fields = [
		new CpuidField("IA32_PLATFORM_DCA_CAP MSR value", [31,0], null, { printRawHex: true }),
	];
	
	// cpuid.9.0:ebx, cpuid.9.0:ecx, cpuid.9.0:edx are reserved
	
	// cpuid.0a.0.ebx
	#cpuid_0a_eax_fields = [
		new CpuidField("Length of EBX bit vector to enumerate architectural performance monitoring events", [31,24], { printRawHex: true }),
		new CpuidField("Bit width of general-purpose performance monitoring counter", [23,16], { printRawHex: true }),
		new CpuidField("Number of general-purpose performance monitoring counters per logical processor", [15,8], { printRawHex: true }),
		new CpuidField("Version ID of architectural performance monitoring MSR value", [7,0], { printRawHex: true }),
	];
	
	// cpuid.0a.0.ebx
	#cpuid_0a_ebx_fields = [
		new CpuidField("Reserved", [31,7], null, { reserved: true }),
		new CpuidField("Branch mispredict retired event available", 6, CpuidBaseResolvers.boolInv),
		new CpuidField("Branch instruction retired event available", 5, CpuidBaseResolvers.boolInv),
		new CpuidField("Last-level cache misses event available", 4, CpuidBaseResolvers.boolInv),
		new CpuidField("Last-level cache reference event available", 3, CpuidBaseResolvers.boolInv),
		new CpuidField("Reference cycles event available", 2, CpuidBaseResolvers.boolInv),
		new CpuidField("Instruction retired event available", 1, CpuidBaseResolvers.boolInv),
		new CpuidField("Core cycle event available", 0, CpuidBaseResolvers.boolInv),
	];
	
	// cpuid.0a.0:ecx is reserved
	
	// cpuid.0a.0.edx
	#cpuid_0a_edx_fields = [
		new CpuidField("Reserved", [31,13], null, { reserved: true }),
		new CpuidField("Bit width of fixed-function performance counters", [12,5], { printRawHex: true }),
		new CpuidField("Number of fixed-function performance counters", [4,0], { printRawHex: true }),
	];
	
	// cpuid.0b.0.eax
	#cpuid_0b_eax_fields = [
		new CpuidField("Reserved", [31,5], null, { reserved: true }),
		new CpuidField("Number of bits to right-shift x2APIC ID by to get topology ID of next level type", [4,0], { printRawHex: true }),
	];
	
	// cpuid.0b.0.ebx
	#cpuid_0b_ebx_fields = [
		new CpuidField("Reserved", [31,16], null, { reserved: true }),
		new CpuidField("Number of logical processors at this type level", [15,0], { printRawHex: true }),
	];
	
	// cpuid.0b.0.ecx
	#cpuid_0b_ecx_fields = [
		new CpuidField("Reserved", [31,16], null, { reserved: true }),
		new CpuidField("Type level", [15,8], CpuidResolversIntel.cpuid0b_type_level),
		new CpuidField("Level number", [7,0]),
	];
	
	// cpuid.0b.0.edx
	#cpuid_0b_edx_fields = [
		new CpuidField("x2APIC ID of the current logical processor", [31,0], null, { printRawHex: true }),
	];
	
	// cpuid.0c is is reserved
	
	// cpuid.0d.0.eax
	#cpuid_0d_eax_fields = [
		new CpuidField("Reserved", [31,10], null, { reserved: true }),
		new CpuidField("PKRU state", 9, CpuidBaseResolvers.bool),
		new CpuidField("IA32_XSS state", 8, CpuidBaseResolvers.bool),
		new CpuidField("AVX-512 state", [7,5], null, { printRawHex: true }),
		new CpuidField("MPX state", [4,3], null, { printRawHex: true }),
		new CpuidField("AVX state", 2, CpuidBaseResolvers.bool),
		new CpuidField("SSE state", 1, CpuidBaseResolvers.bool),
		new CpuidField("x87 state", 0, CpuidBaseResolvers.bool),
	];
	
	// cpuid.0d.0.ebx
	#cpuid_0d_ebx_fields = [
		new CpuidField("Maximum size required by enabled features in XCR0", [31,0], null, { printRawHex: true }),
	];
	
	// cpuid.0d.0.ecx
	#cpuid_0d_ecx_fields = [
		new CpuidField("Maximum size required by all features supported by processor", [31,0], null, { printRawHex: true }),
	];
	
	// cpuid.0d.0.edx
	#cpuid_0d_edx_fields = [
		new CpuidField("Supported bits of the upper 32 bits of XCR0", [31,0], null, { printRawHex: true }),
	];
	
	// todo: cpuid.0d.x subleaves
	
	// cpuid.0e is reserved
	
	// cpuid.0f.0.eax is reserved
	
	#cpuid_0f_ebx_fields = [
		new CpuidField("Maximum range of RMID within this physical processor of all types", [31,0], null, { printRawHex: true }),
	];
	
	// cpuid.0f.0.ecx is reserved
	
	#cpuid_0f_edx_fields = [
		new CpuidField("Reserved", [31,2], null, { reserved: true }),
		new CpuidField("Supports L3 cache RDT monitoring", 1, CpuidBaseResolvers.bool),
		new CpuidField("Reserved", 0, null, { reserved: true }),
	];
	
	// todo: cpuid.0f.1 sub-leaf
	
	// cpuid.10.0.eax is reserved
	
	#cpuid_10_ebx_fields = [
		new CpuidField("Reserved", [31,3], null, { reserved: true }),
		new CpuidField("Supports L3 cache allocation technology", 2, CpuidBaseResolvers.bool),
		new CpuidField("Supports L2 cache allocation technology", 1, CpuidBaseResolvers.bool),
		new CpuidField("Reserved", 0, null, { reserved: true }),
	];
	
	// cpuid.10.0.ecx is reserved
	// cpuid.10.0.edx is reserved
	
	// todo: cpuid.10.1 and cpuid.10.2
	
	// cpuid.11 is reserved
	
	// cpuid.12.0.eax
	#cpuid_12_eax_fields = [
		new CpuidField("Reserved", [31,2], null, { reserved: true }),
		new CpuidField("SGX2 leaf functions available", 1, CpuidBaseResolvers.bool),
		new CpuidField("SGX1 leaf functions available", 0, CpuidBaseResolvers.bool),
	];
	
	// cpuid.12.0.ebx
	#cpuid_12_ebx_fields = [
		new CpuidField("Supported extended SGX features (MISCSELECT)", [31,0], null, { printRawHex: true }),
	];
	
	// cpuid.12.0.ecx is reserved
	
	// cpuid.12.0.edx
	#cpuid_12_edx_fields = [
		new CpuidField("Reserved", [31,16], null, { reserved: true }),
		new CpuidField("Maximum supported enclave size in 64-bit mode", [15,8], CpuidResolversIntel.cpuid12_enclave_size, { printRawHex: true }),
		new CpuidField("Maximum supported enclave size in non-64-bit mode", [7,0], CpuidResolversIntel.cpuid12_enclave_size, { printRawHex: true }),
	];
	
	// cpuid.13 is reserved
	
	// cpuid.14.0.eax
	#cpuid_14_eax_fields = [
		new CpuidField("Maximum supported sub-leaf in leaf 14h", [31,0]),
	];
	
	// cpuid.14.0.ebx
	#cpuid_14_ebx_fields = [
		new CpuidField("Reserved", [31,6], null, { reserved: true }),
		new CpuidField("Power event trace supported", 5, CpuidBaseResolvers.bool),
		new CpuidField("PTWRITE supported", 4, CpuidBaseResolvers.bool),
		new CpuidField("MTC timing packet and suppression of COFI-based packets supported", 3, CpuidBaseResolvers.bool),
		new CpuidField("IP and TraceStop filtering supported, and Intel PT MSRs preserved across warm reset", 2, CpuidBaseResolvers.bool),
		new CpuidField("Configurable PSB and cycle-accurate mode supported", 1, CpuidBaseResolvers.bool),
		new CpuidField("IA32_RTIT_CTL.CR3Filter can be set to 1, and IA32_RTIT_CR3_MATCH MSR can be accessed", 0, CpuidBaseResolvers.bool),
	];
	
	// cpuid.14.0.ecx
	#cpuid_14_ecx_fields = [
		new CpuidField("Packets with IP payloads have LIP values", 31, CpuidBaseResolvers.bool),
		new CpuidField("Reserved", [30,4], null, { reserved: true }),
		new CpuidField("Output to Trace Transport subsystem supported", 3, CpuidBaseResolvers.bool),
		new CpuidField("Single range output scheme supported", 2, CpuidBaseResolvers.bool),
		new CpuidField("ToPA tables can hold any number of output entries", 1, CpuidBaseResolvers.bool),
		new CpuidField("Tracing can be anbled with IA32_RTIT_CTL.ToPA=1", 0, CpuidBaseResolvers.bool),
	];
	
	// cpuid.14.0.edx is reserved
	
	// cpuid.14.1.eax
	/*#cpuid_14_eax_fields = [
		new CpuidField("Bitmap of supported MTC period encodings", [31,16], null, { printRawHex: true }),
		new CpuidField("Reserved", [15,3], null, { reserved: true }),
		new CpuidField("Number of configurable address ranges for filtering", [2,0]),
	];*/
	
	// cpuid.15.0.eax
	#cpuid_15_eax_fields = [
		new CpuidField("Denominator of the TSC / core crystal clock ratio", [31,0], CpuidResolversIntel.cpuid15_clock_ratio),
	];
	
	// cpuid.15.0.ebx
	#cpuid_15_ebx_fields = [
		new CpuidField("Numerator of the TSC / core crystal clock ratio", [31,0], CpuidResolversIntel.cpuid15_clock_ratio),
	];
	
	// cpuid.15.0.ecx
	#cpuid_15_ecx_fields = [
		new CpuidField("Nominal frequency of the TSC / core crystal clock ratio", [31,0]),
	];
	
	// cpuid.15.0.edx is reserved
	
	// cpuid.16.0.eax
	#cpuid_16_eax_fields = [
		new CpuidField("Reserved", [31,16], null, { reserved: true }),
		new CpuidField("Processor base frequency", [15,0], CpuidResolversIntel.cpuid16_frequency),
	];
	
	// cpuid.16.0.ebx
	#cpuid_16_ebx_fields = [
		new CpuidField("Reserved", [31,16], null, { reserved: true }),
		new CpuidField("Maximum frequency", [15,0], CpuidResolversIntel.cpuid16_frequency),
	];
	
	// cpuid.16.0.ecx
	#cpuid_16_ecx_fields = [
		new CpuidField("Reserved", [31,16], null, { reserved: true }),
		new CpuidField("Bus reference frequency", [15,0], CpuidResolversIntel.cpuid16_frequency),
	];
	
	// cpuid.16.0.edx is reserved
	
	// cpuid.17.0.eax
	#cpuid_17_eax_fields = [
		new CpuidField("Number of sub-leaves supported in leaf 17h", [31,0]),
	];
	
	// cpuid.17.0.ebx
	#cpuid_17_ebx_fields = [
		new CpuidField("Reserved", [31,17], null, {reserved: true }),
		new CpuidField("SOC Vendor ID field assignment", 16, CpuidResolversIntel.cpuid17_vendor_id_scheme),
		new CpuidField("SOC Vendor ID", [15,0], null, { printRawHex: true }),
	];
	
	// cpuid.17.0.ecx
	#cpuid_17_ecx_fields = [
		new CpuidField("Project ID", [31,0], null, { printRawHex: true }),
	];
	
	// cpuid.17.0.edx
	#cpuid_17_edx_fields = [
		new CpuidField("Stepping ID", [31,0], null, { printRawHex: true }),
	];
	
	// end of documented leaf 0x00000000 to 0x0fffffff
	
	// cpuid.80000000.0.eax
	#cpuid_80000000_eax_fields = [
		new CpuidField("Maximum value for extended CPUID", [31,0], null, { printRawHex: true }),
	];
	
	// cpuid.80000000.0.ebx, cpuid.80000000.0.ecx, cpuid.80000000.0.edx are reserved
	
	// cpuid.80000001.0.eax
	#cpuid_80000001_eax_fields = [
		new CpuidField("Extended processor signature and feature bits", [31,0], null, { printRawHex: true }),
	];
	
	// cpuid.80000001.0.ebx is reserved
	
	// cpuid.80000001.0.ecx
	#cpuid_80000001_ecx_fields = [
		new CpuidField("Reserved", [31,9], null, { reserved: true }),
		new CpuidField("PREFETCHW", 8, CpuidBaseResolvers.bool),
		new CpuidField("Reserved", [7,6], null, { reserved: true }),
		new CpuidField("LZCNT", 5, CpuidBaseResolvers.bool),
		new CpuidField("Reserved", [4,1], null, { reserved: true }),
		new CpuidField("LAHF/SAHF available in 64-bit mode", 0, CpuidBaseResolvers.bool),
	];
	
	// cpuid.80000001.0.edx
	#cpuid_80000001_edx_fields = [
		new CpuidField("Reserved", [31,30], null, { reserved: true }),
		new CpuidField("Intel 64 architecture available", 29, CpuidBaseResolvers.bool),
		new CpuidField("Reserved", 28, null, { reserved: true }),
		new CpuidField("RDTSCP and IA32_TSC_AUX available", 27, CpuidBaseResolvers.bool),
		new CpuidField("1GB pages available", 26, CpuidBaseResolvers.bool),
		new CpuidField("Reserved", [25,21], null, { reserved: true }),
		new CpuidField("Execute disable bit (NX) available", 20, CpuidBaseResolvers.bool),
		new CpuidField("Reserved", [19,12], null, { reserved: true }),
		new CpuidField("SYSCALL/SYSRET available in 64-bit mode", 11, CpuidBaseResolvers.bool),
		new CpuidField("Reserved", [10,0], null, { reserved: true }),
	];
	
	// todo: when multi-leaf context is implemented, have this print a full string
	// I could have put in a per-leaf string concat resolver here, but that wouldn't help much and it'd look ugly.
	
	// cpuid.80000002.0.eax
	#cpuid_80000002_eax_fields = [
		new CpuidField("Processor brand string 0", [31,0], CpuidBaseResolvers.ascii),
	];
	
	// cpuid.80000002.0.ebx
	#cpuid_80000002_ebx_fields = [
		new CpuidField("Processor brand string 1", [31,0], CpuidBaseResolvers.ascii),
	];
	
	// cpuid.80000002.0.ecx
	#cpuid_80000002_ecx_fields = [
		new CpuidField("Processor brand string 2", [31,0], CpuidBaseResolvers.ascii),
	];
	
	// cpuid.80000002.0.edx
	#cpuid_80000002_edx_fields = [
		new CpuidField("Processor brand string 3", [31,0], CpuidBaseResolvers.ascii),
	];
	
	// cpuid.80000003.0.eax
	#cpuid_80000003_eax_fields = [
		new CpuidField("Processor brand string 4", [31,0], CpuidBaseResolvers.ascii),
	];
	
	// cpuid.80000003.0.ebx
	#cpuid_80000003_ebx_fields = [
		new CpuidField("Processor brand string 5", [31,0], CpuidBaseResolvers.ascii),
	];
	
	// cpuid.80000003.0.ecx
	#cpuid_80000003_ecx_fields = [
		new CpuidField("Processor brand string 6", [31,0], CpuidBaseResolvers.ascii),
	];
	
	// cpuid.80000003.0.edx
	#cpuid_80000003_edx_fields = [
		new CpuidField("Processor brand string 7", [31,0], CpuidBaseResolvers.ascii),
	];
	
	// cpuid.80000004.0.eax
	#cpuid_80000004_eax_fields = [
		new CpuidField("Processor brand string 8", [31,0], CpuidBaseResolvers.ascii),
	];
	
	// cpuid.80000004.0.ebx
	#cpuid_80000004_ebx_fields = [
		new CpuidField("Processor brand string 9", [31,0], CpuidBaseResolvers.ascii),
	];
	
	// cpuid.80000004.0.ecx
	#cpuid_80000004_ecx_fields = [
		new CpuidField("Processor brand string 10", [31,0], CpuidBaseResolvers.ascii),
	];
	
	// cpuid.80000004.0.edx
	#cpuid_80000004_edx_fields = [
		new CpuidField("Processor brand string 11", [31,0], CpuidBaseResolvers.ascii),
	];
	
	// cpuid.80000005 is reserved
	
	// cpuid.80000006.0.eax and cpuid.80000006.0.ebx are reserved
	
	// cpuid.80000006.0.ecx
	#cpuid_80000006_ecx_fields = [
		new CpuidField("Cache size in 1K units", [31,16]),
		new CpuidField("L2 associativity", [15,12], CpuidResolversIntel.cpuid80000006_L2_associativity, { printRawHex: true }),
		new CpuidField("Reserved", [11,8], null, { reserved: true }),
		new CpuidField("Cache line size in bytes", [7,0]),
	];
	
	// cpuid.80000006.0.edx is reserved
	
	// cpuid.80000007.0.eax, cpuid.80000007.0.ebx, cpuid.80000007.0.ecx are reserved
	
	//cpuid.80000007.0.edx
	#cpuid_80000007_edx_fields = [
		new CpuidField("Reserved", [31,9], null, { reserved: true }),
		new CpuidField("Invariant TSC available", 8, CpuidBaseResolvers.bool),
		new CpuidField("Reserved", [7,0], null, { reserved: true }),
	];
	
	// cpuid.80000008.0.eax
	#cpuid_80000008_eax_fields = [
		new CpuidField("Reserved", [31,16], null, { reserved: true }),
		new CpuidField("Number of linear address bits", [15,8]),
		new CpuidField("Number of physical address bits", [7,0]),
	];
	
	// cpuid.80000008.0.ebx, cpuid.80000008.0.ecx, cpuid.80000008.0.edx are reserved
	
	// end of the 80000000-8fffffff range
	
	#leaves = [
		{
			id: 0,
			registers: {
				eax: { description: "Maximum basic CPUID value", fields: this.#cpuid_00_eax_fields },
				ebx: { description: "CPU type name", fields: this.#cpuid_00_ebx_fields },
				ecx: { description: "CPU type name", fields: this.#cpuid_00_ecx_fields },
				edx: { description: "CPU type name", fields: this.#cpuid_00_edx_fields },
			}
		},
		{
			id: 1,
			registers: {
				eax: { description: "Version information", fields: this.#cpuid_01_eax_fields },
				ebx: { description: "Basic information", fields: this.#cpuid_01_ebx_fields },
				ecx: { description: "Feature information", fields: this.#cpuid_01_ecx_fields },
				edx: { description: "Feature information", fields: this.#cpuid_01_edx_fields },
			}
		},
		{
			id: 2,
			registers: {
				eax: { description: "Cache, TLB, and prefetch descriptors", fields: this.#cpuid_02_eax_fields },
				ebx: { description: "Cache, TLB, and prefetch descriptors", fields: this.#cpuid_02_ebx_fields },
				ecx: { description: "Cache, TLB, and prefetch descriptors", fields: this.#cpuid_02_ecx_fields },
				edx: { description: "Cache, TLB, and prefetch descriptors", fields: this.#cpuid_02_edx_fields },
			}
		},
		{
			id: 3,
			registers: {
				eax: { description: "Reserved", fields: this.#cpuid_reserved_field },
				ebx: { description: "Reserved", fields: this.#cpuid_reserved_field },
				ecx: { description: "Processor serial number", fields: this.#cpuid_03_ecx_fields },
				edx: { description: "Processor serial number", fields: this.#cpuid_03_edx_fields },
			}
		},
		{
			id: 4,
			registers: {
				eax: { description: "Cache information", fields: this.#cpuid_04_eax_fields },
				ebx: { description: "Cache sets", fields: this.#cpuid_04_ebx_fields },
				ecx: { description: "Cache information", fields: this.#cpuid_04_ecx_fields },
				edx: { description: "Cache information", fields: this.#cpuid_04_edx_fields },
			}
		},
		{
			id: 5,
			registers: {
				eax: { description: "MONITOR/MWAIT", fields: this.#cpuid_05_eax_fields },
				ebx: { description: "MONITOR/MWAIT line size", fields: this.#cpuid_05_ebx_fields },
				ecx: { description: "MONITOR/MWAIT line size", fields: this.#cpuid_05_ecx_fields },
				edx: { description: "MWAIT C-states", fields: this.#cpuid_05_edx_fields },
			}
		},
		{
			id: 6,
			registers: {
				eax: { description: "Thermal and power management", fields: this.#cpuid_06_eax_fields },
				ebx: { description: "Digital temperature sensor interrupts", fields: this.#cpuid_06_ebx_fields },
				ecx: { description: "Thermal and power management", fields: this.#cpuid_06_ecx_fields },
				edx: { description: "Reserved", fields: this.#cpuid_reserved_field },
			}
		},
		{
			id: 7,
			registers: {
				eax: { description: "Maximum sub-leaves for leaf 7", fields: this.#cpuid_07_eax_fields },
				ebx: { description: "Structured extended feature flags", fields: this.#cpuid_07_ebx_fields },
				ecx: { description: "Structured extended feature flags", fields: this.#cpuid_07_ecx_fields },
				edx: { description: "Reserved", fields: this.#cpuid_reserved_field },
			}
		},
		{
			id: 8,
			registers: {
				eax: { description: "Reserved", fields: this.#cpuid_reserved_field },
				ebx: { description: "Reserved", fields: this.#cpuid_reserved_field },
				ecx: { description: "Reserved", fields: this.#cpuid_reserved_field },
				edx: { description: "Reserved", fields: this.#cpuid_reserved_field },
			}
		},
		{
			id: 9,
			registers: {
				eax: { description: "Direct cache access information", fields: this.#cpuid_09_eax_fields },
				ebx: { description: "Reserved", fields: this.#cpuid_reserved_field },
				ecx: { description: "Reserved", fields: this.#cpuid_reserved_field },
				edx: { description: "Reserved", fields: this.#cpuid_reserved_field },
			}
		},
		{
			id: 0xA,
			registers: {
				eax: { description: "Architectural performance monitoring", fields: this.#cpuid_0a_eax_fields },
				ebx: { description: "Performance event availability", fields: this.#cpuid_0a_ebx_fields },
				ecx: { description: "Reserved", fields: this.#cpuid_reserved_field },
				edx: { description: "Architectural performance monitoring", fields: this.#cpuid_0a_edx_fields },
			}
		},
		{
			id: 0xB,
			registers: {
				eax: { description: "Extended topology enumeration", fields: this.#cpuid_0a_eax_fields },
				ebx: { description: "Extended topology enumeration", fields: this.#cpuid_0a_ebx_fields },
				ecx: { description: "Reserved", fields: this.#cpuid_reserved_field },
				edx: { description: "Extended topology enumeration", fields: this.#cpuid_0a_edx_fields },
			}
		},
		{
			id: 0xC,
			registers: {
				eax: { description: "Reserved", fields: this.#cpuid_reserved_field },
				ebx: { description: "Reserved", fields: this.#cpuid_reserved_field },
				ecx: { description: "Reserved", fields: this.#cpuid_reserved_field },
				edx: { description: "Reserved", fields: this.#cpuid_reserved_field },
			}
		},
		{
			id: 0xD,
			registers: {
				eax: { description: "Extended state enumeration", fields: this.#cpuid_0d_eax_fields },
				ebx: { description: "Extended state enumeration", fields: this.#cpuid_0d_ebx_fields },
				ecx: { description: "Extended state enumeration", fields: this.#cpuid_0d_ecx_fields },
				edx: { description: "Extended state enumeration", fields: this.#cpuid_0d_edx_fields },
			}
		},
		{
			id: 0xE,
			registers: {
				eax: { description: "Reserved", fields: this.#cpuid_reserved_field },
				ebx: { description: "Reserved", fields: this.#cpuid_reserved_field },
				ecx: { description: "Reserved", fields: this.#cpuid_reserved_field },
				edx: { description: "Reserved", fields: this.#cpuid_reserved_field },
			}
		},
		{
			id: 0xF,
			registers: {
				eax: { description: "Reserved", fields: this.#cpuid_reserved_field },
				ebx: { description: "Extended state enumeration", fields: this.#cpuid_0f_ebx_fields },
				ecx: { description: "Reserved", fields: this.#cpuid_reserved_field },
				edx: { description: "Extended state enumeration", fields: this.#cpuid_0f_edx_fields },
			}
		},
		{
			id: 0x10,
			registers: {
				eax: { description: "Reserved", fields: this.#cpuid_reserved_field },
				ebx: { description: "Intel Resource Director Technology (RDT)", fields: this.#cpuid_10_ebx_fields },
				ecx: { description: "Reserved", fields: this.#cpuid_reserved_field },
				edx: { description: "Reserved", fields: this.#cpuid_reserved_field },
			}
		},
		{
			id: 0x11,
			registers: {
				eax: { description: "Reserved", fields: this.#cpuid_reserved_field },
				ebx: { description: "Reserved", fields: this.#cpuid_reserved_field },
				ecx: { description: "Reserved", fields: this.#cpuid_reserved_field },
				edx: { description: "Reserved", fields: this.#cpuid_reserved_field },
			}
		},
		{
			id: 0x12,
			registers: {
				eax: { description: "SGX capability enumeration", fields: this.#cpuid_12_eax_fields },
				ebx: { description: "SGX capability enumeration", fields: this.#cpuid_12_ebx_fields },
				ecx: { description: "Reserved", fields: this.#cpuid_reserved_field },
				edx: { description: "SGX capability enumeration", fields: this.#cpuid_12_edx_fields },
			}
		},
		{
			id: 0x13,
			registers: {
				eax: { description: "Reserved", fields: this.#cpuid_reserved_field },
				ebx: { description: "Reserved", fields: this.#cpuid_reserved_field },
				ecx: { description: "Reserved", fields: this.#cpuid_reserved_field },
				edx: { description: "Reserved", fields: this.#cpuid_reserved_field },
			}
		},
		{
			id: 0x14,
			registers: {
				eax: { description: "Intel processor trace enumeration", fields: this.#cpuid_14_eax_fields },
				ebx: { description: "Intel processor trace enumeration", fields: this.#cpuid_14_ebx_fields },
				ecx: { description: "Intel processor trace enumeration", fields: this.#cpuid_14_ecx_fields },
				edx: { description: "Reserved", fields: this.#cpuid_reserved_field },
			}
		},
		{
			id: 0x15,
			registers: {
				eax: { description: "Time stamp counter and nominal core crystal clock", fields: this.#cpuid_15_eax_fields },
				ebx: { description: "Time stamp counter and nominal core crystal clock", fields: this.#cpuid_15_ebx_fields },
				ecx: { description: "Time stamp counter and nominal core crystal clock", fields: this.#cpuid_15_ecx_fields },
				edx: { description: "Reserved", fields: this.#cpuid_reserved_field },
			}
		},
		{
			id: 0x16,
			registers: {
				eax: { description: "Processor frequency information", fields: this.#cpuid_16_eax_fields },
				ebx: { description: "Processor frequency information", fields: this.#cpuid_16_ebx_fields },
				ecx: { description: "Processor frequency information", fields: this.#cpuid_16_ecx_fields },
				edx: { description: "Reserved", fields: this.#cpuid_reserved_field },
			}
		},
		{
			id: 0x17,
			registers: {
				eax: { description: "System-on-chip vendor attribute", fields: this.#cpuid_17_eax_fields },
				ebx: { description: "System-on-chip vendor attribute", fields: this.#cpuid_17_ebx_fields },
				ecx: { description: "System-on-chip vendor attribute", fields: this.#cpuid_17_ecx_fields },
				edx: { description: "System-on-chip vendor attribute", fields: this.#cpuid_17_edx_fields },
			}
		},
		{
			id: 0x80000000,
			registers: {
				eax: { description: "Extended function CPUID information", fields: this.#cpuid_80000000_eax_fields },
				ebx: { description: "Reserved", fields: this.#cpuid_reserved_field },
				ecx: { description: "Reserved", fields: this.#cpuid_reserved_field },
				edx: { description: "Reserved", fields: this.#cpuid_reserved_field },
			}
		},
		{
			id: 0x80000001,
			registers: {
				eax: { description: "Extended processor signature and feature bits", fields: this.#cpuid_80000001_eax_fields },
				ebx: { description: "Reserved", fields: this.#cpuid_reserved_field },
				ecx: { description: "Extended processor signature and feature bits", fields: this.#cpuid_80000001_ecx_fields },
				edx: { description: "Extended processor signature and feature bits", fields: this.#cpuid_80000001_edx_fields },
			}
		},
		{
			id: 0x80000002,
			registers: {
				eax: { description: "Processor brand string", fields: this.#cpuid_80000002_eax_fields },
				ebx: { description: "Processor brand string", fields: this.#cpuid_80000002_ebx_fields },
				ecx: { description: "Processor brand string", fields: this.#cpuid_80000002_ecx_fields },
				edx: { description: "Processor brand string", fields: this.#cpuid_80000002_edx_fields },
			}
		},
		{
			id: 0x80000003,
			registers: {
				eax: { description: "Processor brand string", fields: this.#cpuid_80000003_eax_fields },
				ebx: { description: "Processor brand string", fields: this.#cpuid_80000003_ebx_fields },
				ecx: { description: "Processor brand string", fields: this.#cpuid_80000003_ecx_fields },
				edx: { description: "Processor brand string", fields: this.#cpuid_80000003_edx_fields },
			}
		},
		{
			id: 0x80000004,
			registers: {
				eax: { description: "Processor brand string", fields: this.#cpuid_80000004_eax_fields },
				ebx: { description: "Processor brand string", fields: this.#cpuid_80000004_ebx_fields },
				ecx: { description: "Processor brand string", fields: this.#cpuid_80000004_ecx_fields },
				edx: { description: "Processor brand string", fields: this.#cpuid_80000004_edx_fields },
			}
		},
		{
			id: 0x80000005,
			registers: {
				eax: { description: "Reserved", fields: this.#cpuid_reserved_field },
				ebx: { description: "Reserved", fields: this.#cpuid_reserved_field },
				ecx: { description: "Reserved", fields: this.#cpuid_reserved_field },
				edx: { description: "Reserved", fields: this.#cpuid_reserved_field },
			}
		},
		{
			id: 0x80000006,
			registers: {
				eax: { description: "Reserved", fields: this.#cpuid_reserved_field },
				ebx: { description: "Reserved", fields: this.#cpuid_reserved_field },
				ecx: { description: "L2 cache information", fields: this.#cpuid_80000006_ecx_fields },
				edx: { description: "Reserved", fields: this.#cpuid_reserved_field },
			}
		},
		{
			id: 0x80000007,
			registers: {
				eax: { description: "Reserved", fields: this.#cpuid_reserved_field },
				ebx: { description: "Reserved", fields: this.#cpuid_reserved_field },
				ecx: { description: "Reserved", fields: this.#cpuid_reserved_field },
				edx: { description: "Invariant TSC", fields: this.#cpuid_80000007_edx_fields },
			}
		},
		{
			id: 0x80000008,
			registers: {
				eax: { description: "Linear/physical address size", fields: this.#cpuid_80000008_eax_fields },
				ebx: { description: "Reserved", fields: this.#cpuid_reserved_field },
				ecx: { description: "Reserved", fields: this.#cpuid_reserved_field },
				edx: { description: "Reserved", fields: this.#cpuid_reserved_field },
			}
		},
	];
	
	constructor()
	{
		super();
	}
	
	getLeaf(leafID)
	{
		for (let leaf of this.#leaves)
		{
			if (leaf.id === leafID)
			{
				return leaf;
			}
		}
		return null;
	}
}
