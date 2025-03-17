"use strict";


/*
Resolvers for AMD CPUs
*/
class CpuidResolversAMD
{
	static cpuid1_clflushLineSize(v, ctx=null)
	{
		return (v>>>0)*8;
	}

    static cpuid1_brandIndex(v, ctx=null)
    {
        return "not implemented yet :(";
    }
}


/*
Field definitions for AMD CPUs
*/
class CpuidFieldsAMD extends CpuidFieldsBase
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
		new CpuidField("Reserved", [15,12], null, { reserved: true }),
		new CpuidField("Family ID", [11,8], null, { printRawHex: true }),
		new CpuidField("Model ID", [7,4], null, { printRawHex: true }),
		new CpuidField("Stepping ID", [3,0], null, { printRawHex: true }),
	];

	// cpuid.1.0:ebx
	#cpuid_01_ebx_fields = [
		new CpuidField("Initial APIC value", [31,24], null, { printRawHex: true }),
		new CpuidField("Logical processors", [23,16]),
		new CpuidField("CLFLUSH line size", [15,8], CpuidResolversAMD.cpuid1_clflushLineSize, { printRawHex: true }),
		new CpuidField("Brand index", [7,0], CpuidResolversAMD.cpuid1_brandIndex, { printRawHex: true }),
	];

	// cpuid.1.0:ecx
	#cpuid_01_ecx_fields = [
		new CpuidField("Hypervisor (not set by hardware)", 31, CpuidBaseResolvers.bool), // this is not a CPUID bit specific to Intel, but it is set to true by some hypervisors.
		new CpuidField("RDRAND", 30, CpuidBaseResolvers.bool),
		new CpuidField("16-bit FP conversion", 29, CpuidBaseResolvers.bool),
		new CpuidField("AVX", 28, CpuidBaseResolvers.bool),
		new CpuidField("XSAVE/XRSTOR enabled by OS", 27, CpuidBaseResolvers.bool),
		new CpuidField("XSAVE", 26, CpuidBaseResolvers.bool),
		new CpuidField("AESNI", 25, CpuidBaseResolvers.bool),
		new CpuidField("TSC deadline", 24, CpuidBaseResolvers.bool),
		new CpuidField("POPCNT", 23, CpuidBaseResolvers.bool),
		new CpuidField("MOVBE", 22, CpuidBaseResolvers.bool),
		new CpuidField("x2APIC", 21, CpuidBaseResolvers.bool),
		new CpuidField("SSE4.2", 20, CpuidBaseResolvers.bool),
		new CpuidField("SSE4.1", 19, CpuidBaseResolvers.bool),
		new CpuidField("Reserved", 18, null, { reserved: true }),
		new CpuidField("Process-context identifiers", 17, CpuidBaseResolvers.bool),
		new CpuidField("Reserved", [16,14], null, { reserved: true }),
		new CpuidField("CMPXCHG16B", 13, CpuidBaseResolvers.bool),
		new CpuidField("FMA", 12, CpuidBaseResolvers.bool),
		new CpuidField("Reserved", [11,10], null, { reserved: true }),
		new CpuidField("SSSE3", 9, CpuidBaseResolvers.bool),
		new CpuidField("Reserved", [8,4], null, { reserved: true }),
		new CpuidField("MONITOR/MWAIT", 3, CpuidBaseResolvers.bool),
		new CpuidField("Reserved", 2, null, { reserved: true }),
		new CpuidField("PCLMULQDQ", 1, CpuidBaseResolvers.bool),
		new CpuidField("SSE3", 0, CpuidBaseResolvers.bool),
	];

	// cpuid.1.0:edx
	#cpuid_01_edx_fields = [
		new CpuidField("Reserved", [31,29], null, { reserved: true }),
		new CpuidField("HyperThreading / max APIC IDs field is valid", 28, CpuidBaseResolvers.bool),
		new CpuidField("Reserved", 27, null, { reserved: true }),
		new CpuidField("SSE2", 26, CpuidBaseResolvers.bool),
		new CpuidField("SSE", 25, CpuidBaseResolvers.bool),
		new CpuidField("FXSAVE/FXSTOR", 24, CpuidBaseResolvers.bool),
		new CpuidField("MMX", 23, CpuidBaseResolvers.bool),
		new CpuidField("Reserved", [22,20], null, { reserved: true }),
		new CpuidField("CLFLUSH", 19, CpuidBaseResolvers.bool),
		new CpuidField("Reserved", 18, null, { reserved: true }),
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

    // cpuid 2-4 are reserved

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

    #cpuid_06_eax_fields = [
        new CpuidField("Reserved", [31,3], { reserved: true }),
        new CpuidField("Always running APIC timer (ARAT)", 2, CpuidBaseResolvers.bool),
        new CpuidField("Reserved", [1,0], { reserved: true }),
    ];

    #cpuid_06_ecx_fields = [
        new CpuidField("Reserved", [31,1], { reserved: true }),
        new CpuidField("Hardware coordination feedback capability (APERF and MPERF)", 0, CpuidBaseResolvers.bool),
    ];

    
	// cpuid.7.0:eax
	#cpuid_07_eax_fields = [
		new CpuidField("Number of sub-leaves present", [31,0]),
	];
	
	// cpuid.7.0:ebx
	#cpuid_07_ebx_fields = [
        new CpuidField("Reserved", [31,30], { reserved: true }),
		new CpuidField("SHA extensions", 29, CpuidBaseResolvers.bool),
        new CpuidField("Reserved", [28,25], { reserved: true }),
		new CpuidField("Cache line write back (CLWB)", 24, CpuidBaseResolvers.bool),
		new CpuidField("CLFLUSHOPT", 23, CpuidBaseResolvers.bool),
        new CpuidField("RDPID instruction and TSC_AUX MSR support", 22, CpuidBaseResolvers.bool),
		new CpuidField("Reserved", 21, { reserved: true }),
		new CpuidField("Supervisor-mode access prevention (SMAP)", 20, CpuidBaseResolvers.bool),
		new CpuidField("Arbitrary precision add-carry instructions (ADX)", 19, CpuidBaseResolvers.bool),
		new CpuidField("RDSEED", 18, CpuidBaseResolvers.bool),
        new CpuidField("Reserved", [17,16], { reserved: true }),
		new CpuidField("PQE / Resource director technology allocation (RDT-A) capability", 15, CpuidBaseResolvers.bool),
		new CpuidField("Reserved", [14,13], { reserved: true }),
		new CpuidField("PQM / Resource director technology monitoring (RDT-M) capability", 12, CpuidBaseResolvers.bool),
        new CpuidField("Reserved", 11, { reserved: true }),
		new CpuidField("INVPCID", 10, CpuidBaseResolvers.bool),
		new CpuidField("REP MOVSB/STOSB supported", 9, CpuidBaseResolvers.bool),
		new CpuidField("BMI2", 8, CpuidBaseResolvers.bool),
		new CpuidField("Supervisor-mode execution prevention (SMEP)", 7, CpuidBaseResolvers.bool),
        new CpuidField("Reserved", 6, { reserved: true }),
		new CpuidField("AVX2", 5, CpuidBaseResolvers.bool),
        new CpuidField("Reserved", 4, { reserved: true }),
		new CpuidField("BMI1", 3, CpuidBaseResolvers.bool),
        new CpuidField("Reserved", [2,1], { reserved: true }),
		new CpuidField("FSGSBASE", 0, CpuidBaseResolvers.bool),
	];
	
	// cpuid.7.0:ecx
	#cpuid_07_ecx_fields = [
        new CpuidField("Reserved", [31,23], { reserved: true }),
		new CpuidField("Read processor ID (RDPID)", 22, CpuidBaseResolvers.bool),
        new CpuidField("Reserved", [21,11], { reserved: true }),
		new CpuidField("VEX-encoded PCLMUL (VPCL)", 10, CpuidBaseResolvers.bool),
		new CpuidField("VEX-encoded AES-NI (VAES)", 9, CpuidBaseResolvers.bool),
        new CpuidField("Reserved", 8, { reserved: true }),
		new CpuidField("CET shadow stack (CET SS)", 7, CpuidBaseResolvers.bool),
        new CpuidField("Reserved", [6,5], { reserved: true }),
		new CpuidField("OS support enabled for protection keys (OSPKE)", 4, CpuidBaseResolvers.bool),
		new CpuidField("Supports protection keys for user-mode pages (PKU)", 3, CpuidBaseResolvers.bool),
		new CpuidField("User-mode instruction prevention (UMIP)", 2, CpuidBaseResolvers.bool),
        new CpuidField("Reserved", [1,0], { reserved: true }),
	];
	
	// cpuid.7.0:edx
	#cpuid_07_edx_fields = [
		new CpuidField("Reserved", [31,5], null, { reserved: true }),
		new CpuidField("Fast short REP MOV", 4 , CpuidBaseResolvers.bool), /* undocumented on AMD */
		new CpuidField("Reserved", [3,0], null, { reserved: true }),
	];

    #leaves = [
		{
			leafID: 0,
			subleaves: [
				{
					subleafID: 0,
					registers: {
						eax: { description: "Maximum basic CPUID value", fields: this.#cpuid_00_eax_fields },
						ebx: { description: "CPU type name", fields: this.#cpuid_00_ebx_fields },
						ecx: { description: "CPU type name", fields: this.#cpuid_00_ecx_fields },
						edx: { description: "CPU type name", fields: this.#cpuid_00_edx_fields },
					},
				},
			],
		},
		{
			leafID: 1,
			subleaves: [
				{
					subleafID: 0,
					registers: {
						eax: { description: "Version information", fields: this.#cpuid_01_eax_fields },
						ebx: { description: "Basic information", fields: this.#cpuid_01_ebx_fields },
						ecx: { description: "Feature information", fields: this.#cpuid_01_ecx_fields },
						edx: { description: "Feature information", fields: this.#cpuid_01_edx_fields },
					},
				},
			],
		},
        {
			leafID: 2,
			subleaves: [
				{
					subleafID: 0,
					registers: {
						eax: { description: "Reserved", fields: this.#cpuid_reserved_field },
						ebx: { description: "Reserved", fields: this.#cpuid_reserved_field },
						ecx: { description: "Reserved", fields: this.#cpuid_reserved_field },
						edx: { description: "Reserved", fields: this.#cpuid_reserved_field },
					},
				},
			],
        },
        {
			leafID: 3,
			subleaves: [
				{
					subleafID: 0,
					registers: {
						eax: { description: "Reserved", fields: this.#cpuid_reserved_field },
						ebx: { description: "Reserved", fields: this.#cpuid_reserved_field },
						ecx: { description: "Reserved", fields: this.#cpuid_reserved_field },
						edx: { description: "Reserved", fields: this.#cpuid_reserved_field },
					},
				},
			],
        },
        {
			leafID: 4,
			subleaves: [
				{
					subleafID: 0,
					registers: {
						eax: { description: "Reserved", fields: this.#cpuid_reserved_field },
						ebx: { description: "Reserved", fields: this.#cpuid_reserved_field },
						ecx: { description: "Reserved", fields: this.#cpuid_reserved_field },
						edx: { description: "Reserved", fields: this.#cpuid_reserved_field },
					},
				},
			],
        },
		{
			leafID: 5,
			subleaves: [
				{
					subleafID: 0,
					registers: {
						eax: { description: "MONITOR/MWAIT", fields: this.#cpuid_05_eax_fields },
						ebx: { description: "MONITOR/MWAIT line size", fields: this.#cpuid_05_ebx_fields },
						ecx: { description: "MONITOR/MWAIT line size", fields: this.#cpuid_05_ecx_fields },
						edx: { description: "Reserved", fields: this.#cpuid_reserved_field },
					},
				},
			],
		},
        {
			leafID: 6,
			subleaves: [
				{
					subleafID: 0,
					registers: {
						eax: { description: "Thermal and power management", fields: this.#cpuid_06_eax_fields },
						ebx: { description: "Reserved", fields: this.#cpuid_reserved_field },
						ecx: { description: "Thermal and power management", fields: this.#cpuid_06_ecx_fields },
						edx: { description: "Reserved", fields: this.#cpuid_reserved_field },
					},
				},
			],
		},
        {
			leafID: 7,
			subleaves: [
				{
					subleafID: 0,
					registers: {
						eax: { description: "Maximum sub-leaves for leaf 7", fields: this.#cpuid_07_eax_fields },
						ebx: { description: "Structured extended feature flags", fields: this.#cpuid_07_ebx_fields },
						ecx: { description: "Structured extended feature flags", fields: this.#cpuid_07_ecx_fields },
						edx: { description: "Structured extended feature flags", fields: this.#cpuid_07_edx_fields },
					},
				},
            ],
        }
    ];

    
	constructor()
	{
		super();
		
		// mark each subleaf with the parent leaf ID
		for (const leaf of this.#leaves)
		{
			for (let subleaf of leaf.subleaves)
			{
				subleaf.leafID = leaf.leafID;
			}
		}
	}
	
	isMatch(cpuid0regs)
	{
		const EBX = 1;
		const ECX = 2;
		const EDX = 3;
		return (cpuid0regs[EBX] == 0x68747541 /* 'Auth' */) && (cpuid0regs[EDX] == 0x69746E65 /* 'enti' */) && (cpuid0regs[ECX] == 0x444D4163 /* 'cAMD' */);
	}

    getLeaf(leafID, subleafID = 0)
	{
		for (const leaf of this.#leaves)
		{
			if (leaf.leafID === leafID)
			{
				// if the definition says to repeat a specific subleaf, use that index for all subleaves
				if ((leaf.repeatSubleaf ?? null) !== null)
				{
					// copy the definition and write the requested subleaf ID into it
					let sl = {};
					Object.assign(sl, leaf.subleaves[leaf.repeatSubleaf]);
					sl.subleafID = subleafID;
					return sl;
				}
				
				// find the requested subleaf
				for (let subleaf of leaf.subleaves)
				{
					if (subleaf.subleafID == subleafID)
					{
						return subleaf;
					}
				}
			}
		}
		return null;
	}
}
