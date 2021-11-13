function clearAllHoverStyles(container=null)
{
	if (container === null)
		container = document;
	
	const spans = container.querySelectorAll("span[data-cpuid-owner]");
	for (const span of spans)
	{
		span.classList.remove("diagram_hover");
	}
}

function handleSpanMouseLeave(e)
{
	const container = e.target.parentElement;
	clearAllHoverStyles(container);
}

function handleSpanMouseHover(e)
{
	if (!e.target.hasAttribute("data-cpuid-owner"))
	{
		console.log(e);
		throw "warning: target element did not contain owner information in handleSpanHover";
	}
	
	const ownerFieldId = parseInt(e.target.getAttribute("data-cpuid-owner"));
	if (isNaN(ownerFieldId) || ownerFieldId < 0)
	{
		console.log(e);
		throw "warning: owner field ID could not be resolved in handleSpanHover";
	}
	
	const container = e.target.parentElement;
	if (container === null)
	{
		console.log(e);
		throw "warning: container element was null for handleSpanHover";
	}
	
	clearAllHoverStyles(container);
	
	let spans = container.querySelectorAll("span[data-cpuid-owner='" + ownerFieldId.toString() + "']");
	for (const span of spans)
	{
		span.classList.add("diagram_hover");
	}
}

function toggleBitRanges()
{
	const diagramElements = document.querySelectorAll(".diagram_container");
	let active = false;
	for (const diagramElement of diagramElements)
	{
		diagramElement.cpuid_diagram.showBitRange = !diagramElement.cpuid_diagram.showBitRange;
		if (diagramElement.cpuid_diagram.showBitRange)
			active = true;
		diagramElement.cpuid_diagram.clear();
		diagramElement.cpuid_diagram.build();
	}
	const buttonElement = document.getElementById("button_toggleBitRanges");
	if (active)
	{
		buttonElement.classList.remove("button_inactive");
		buttonElement.classList.add("button_active");
	}
	else
	{
		buttonElement.classList.remove("button_active");
		buttonElement.classList.add("button_inactive");
	}
}

function loadValues()
{
	cpuid_clear();
	const inputStr = document.getElementById('input_textarea').value;
	const regex = /^(?<leaf>[0-9a-f]+)(?:[.](?<subleaf>[0-9a-f]+))?\s+(?<eax>[0-9a-f]+)\s+(?<ebx>[0-9a-f]+)\s+(?<ecx>[0-9a-f]+)\s+(?<edx>[0-9a-f]+)/img;
	const matches = [...inputStr.matchAll(regex)];
	let values = [];
	for (const match of matches)
	{
		const leaf = {
			leaf: parseInt(match.groups.leaf, 16),
			subleaf: parseInt(match.groups.subleaf ?? "0", 16),
			registers: new Uint32Array( [ parseInt(match.groups.eax, 16), parseInt(match.groups.ebx, 16), parseInt(match.groups.ecx, 16), parseInt(match.groups.edx, 16) ] )
		};
		values.push(leaf);
	}
	cpuid_build(values);
}

function cpuid_clear()
{
	let cpuid_container = document.getElementById("cpuid_container");
	while (cpuid_container.firstChild)
	{
		cpuid_container.removeChild(cpuid_container.lastChild);
	}
}

function cpuid_build(cpuid_values)
{
	let cpuid_container = document.getElementById("cpuid_container");
	
	var cpuid_leaves = new CpuidFieldsIntel();
	
	for (const leafValues of cpuid_values)
	{
		// todo: support sub-leaves
		if (leafValues.subleaf !== 0)
			continue;
		
		var leaf = cpuid_leaves.getLeaf(leafValues.leaf);
		if (leaf === null)
			continue;
		
		var leaf_container = document.createElement("div");
		leaf_container.classList.add("leaf");
		
		var subleaf_container = document.createElement("div");
		subleaf_container.classList.add("subleaf");
		
		for (const reg in leaf.registers)
		{
			var subleaf_reg_container = document.createElement("div");
			subleaf_reg_container.classList.add("subleaf_reg");
			
			var subleaf_reg_heading = document.createElement("h2");
			subleaf_reg_heading.innerText = "cpuid." + leaf.id.toString(16).padStart(2, '0') + ".0:" + reg;
			subleaf_reg_container.appendChild(subleaf_reg_heading);
			
			var subleaf_reg_description = document.createElement("span");
			subleaf_reg_description.classList.add("description");
			subleaf_reg_description.innerText = leaf.registers[reg].description;
			subleaf_reg_container.appendChild(subleaf_reg_description);
			
			var subleaf_reg_contents = document.createElement("div");
			subleaf_reg_contents.classList.add("diagram_container");
			subleaf_reg_contents.id = "cpuid_" + leaf.id.toString(16) + "_0_" + reg;
			subleaf_reg_container.appendChild(subleaf_reg_contents);
			
			subleaf_container.appendChild(subleaf_reg_container);
		}
		
		leaf_container.appendChild(subleaf_container);
		
		cpuid_container.appendChild(leaf_container);
	}

	for (const leafValues of cpuid_values)
	{
		// todo: support sub-leaves
		if (leafValues.subleaf !== 0)
			continue;
		
		var leaf = cpuid_leaves.getLeaf(leafValues.leaf);
		if (leaf === null)
			continue;
		
		let rn = 0;
		for (const reg in leaf.registers)
		{
			const elementName = "cpuid_" + leaf.id.toString(16) + "_0_" + reg;
			let diagram = new CpuidDiagram(elementName, leaf.registers[reg].fields, leafValues.registers[rn], { registers: leafValues.registers });
			rn++;
			diagram.build();
			document.getElementById(elementName).cpuid_diagram = diagram;
		}
	}
}
