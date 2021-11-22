function cpuid_build(cpuid_values)
{
	let cpuid_container = document.getElementById("cpuid_container");
	
	var intelFields = new CpuidFieldsIntel();
	var vendorFieldDefs = [ intelFields ];
	var cpuid_leaves = null;
	var cpuid_leaf0 = cpuid_values.find(lv => lv.leaf == 0);
	var cpuid_leaf0_0 = cpuid_leaf0.subleaves.find(slv => slv.subleaf == 0);
	for (const vendorFieldDef of vendorFieldDefs)
	{
		if (vendorFieldDef.isMatch(cpuid_leaf0_0.registers))
			cpuid_leaves = vendorFieldDef;
	}
	
	for (const leafValues of cpuid_values)
	{
		var leaf_container = document.createElement("div");
		leaf_container.classList.add("leaf");
		leaf_container.id = "cpuid." + leafValues.leaf.toString(16).padStart(2, '0');
		
		/*var sl0regs = leafValues.subleaves[0]?.registers ?? new Uint32Array([0,0,0,0]);
		const leafSummaryText = cpuid_leaves.getLeafSummary(leafValues.leaf, sl0regs);
		if (leafSummaryText !== null)
		{
			var leaf_summary = document.createElement("span");
			leaf_summary.classList.add("summary");
			leaf_summary.classList.add("leaf_summary");
			leaf_summary.innerText = leafSummaryText;
			leaf_container.appendChild(leaf_summary);
		}*/
		
		for (const subleafValues of leafValues.subleaves)
		{
			var leaf = cpuid_leaves.getLeaf(leafValues.leaf, subleafValues.subleaf);
			if (leaf === null)
				continue;
			
			var subleaf_container = document.createElement("div");
			subleaf_container.classList.add("subleaf");
			subleaf_container.id = "cpuid." + leaf.leafID.toString(16).padStart(2, '0') + "." + leaf.subleafID.toString(16);
			
			let rn = 0;
			for (const reg in leaf.registers)
			{
				var subleaf_reg_container = document.createElement("div");
				subleaf_reg_container.classList.add("subleaf_reg");
				subleaf_reg_container.id = "cpuid." + leaf.leafID.toString(16).padStart(2, '0') + "." + leaf.subleafID.toString(16) + ":" + reg;
				
				var subleaf_reg_heading = document.createElement("h2");
				subleaf_reg_heading.innerText = "cpuid.";
				
				var subleaf_reg_number = document.createElement("span");
				subleaf_reg_number.innerText = leaf.leafID.toString(16).padStart(2, '0');
				subleaf_reg_number.title = leaf.leafID.toString(16).padStart(2, '0') + "h = " + leaf.leafID.toString(10);
				subleaf_reg_heading.appendChild(subleaf_reg_number);
				
				var subleaf_reg_separator = document.createElement("span");
				subleaf_reg_separator.innerText = '.';
				subleaf_reg_heading.appendChild(subleaf_reg_separator);
				
				var subleaf_reg_subleafnumber = document.createElement("span");
				subleaf_reg_subleafnumber.innerText = leaf.subleafID.toString(16);
				subleaf_reg_heading.appendChild(subleaf_reg_subleafnumber);
				
				var subleaf_reg_colon = document.createElement("span");
				subleaf_reg_colon.innerText = ':';
				subleaf_reg_heading.appendChild(subleaf_reg_colon);
				
				var subleaf_reg_regname = document.createElement("span");
				subleaf_reg_regname.innerText = reg;
				subleaf_reg_heading.appendChild(subleaf_reg_regname);
				
				var subleaf_reg_value = document.createElement("span");
				subleaf_reg_value.innerText = " = " + subleafValues.registers[rn].toString(16).toUpperCase().padStart(8, '0') + "h";
				subleaf_reg_value.classList.add("register_value");
				subleaf_reg_heading.appendChild(subleaf_reg_value);
				subleaf_reg_container.appendChild(subleaf_reg_heading);
				
				var subleaf_reg_description = document.createElement("span");
				subleaf_reg_description.classList.add("description");
				subleaf_reg_description.innerText = leaf.registers[reg].description;
				subleaf_reg_container.appendChild(subleaf_reg_description);
				
				var subleaf_reg_contents = document.createElement("div");
				subleaf_reg_contents.classList.add("diagram_container");
				subleaf_reg_contents.id = "cpuid_" + leaf.leafID.toString(16) + "_" + leaf.subleafID.toString(16) + "_" + reg;
				subleaf_reg_container.appendChild(subleaf_reg_contents);
				
				subleaf_container.appendChild(subleaf_reg_container);
				
				rn++;
			}
			
			leaf_container.appendChild(subleaf_container);
		}
		cpuid_container.appendChild(leaf_container);
	}

	for (const leafValues of cpuid_values)
	{
		for (const subleafValues of leafValues.subleaves)
		{
			var leaf = cpuid_leaves.getLeaf(leafValues.leaf, subleafValues.subleaf);
			if (leaf === null)
				continue;
			
			let rn = 0;
			for (const reg in leaf.registers)
			{
				const elementName = "cpuid_" + leaf.leafID.toString(16) + "_" + leaf.subleafID.toString(16) + "_" + reg;
				let diagram = new CpuidDiagram(elementName, leaf.registers[reg].fields, subleafValues.registers[rn], { registers: subleafValues.registers });
				rn++;
				diagram.build();
				document.getElementById(elementName).cpuid_diagram = diagram;
			}
		}
	}
}

function cpuid_clear()
{
	let cpuid_container = document.getElementById("cpuid_container");
	while (cpuid_container.firstChild)
	{
		cpuid_container.removeChild(cpuid_container.lastChild);
	}
}

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

function toggleButton(elementName)
{
	const buttonElement = document.getElementById(elementName);
	var active = buttonElement.getAttribute("data-active") ?? "false";
	active = (active === "true");
	active = !active;
	buttonElement.setAttribute("data-active", active);
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
	return active;
}

function toggleBitRanges()
{
	const active = toggleButton("button_toggleBitRanges");
	
	const diagramElements = document.querySelectorAll(".diagram_container");
	for (const diagramElement of diagramElements)
	{
		diagramElement.cpuid_diagram.showBitRange = active;
		diagramElement.cpuid_diagram.clear();
		diagramElement.cpuid_diagram.build();
	}
}

function toggleRegisterValues()
{
	const active = toggleButton("button_toggleRegisterValues");
	
	const registerValueElements = document.querySelectorAll(".register_value");
	for (const registerValueElement of registerValueElements)
	{
		registerValueElement.style.display = active ? null : "none";
	}
}

function toggleDeuteranopiaMode()
{
	const active = toggleButton("button_toggleDeuteranopiaMode");
	document.querySelector(':root').style.setProperty('--false-colour', active ? 'var(--false-colour-deuteranopia)' : 'var(--false-colour-standard)');
}

async function fileUploadEvent(e)
{
	console.log(e);
	const fileInput = e.target;
	if (fileInput.files.length == 0)
	{
		return;
	}
	if (fileInput.files.length > 1)
	{
		console.log("warning: multiple files opened, ignoring extras.");
	}
	var xmlStr = await fileInput.files[0].text();
	if (!xmlStr.startsWith('<?xml version "1.0"?>'))
	{
		alert("Sorry, that doesn't look like a valid CPUID Explorer dump.");
		return;
	}
	// cpuid explorer files are not well-formed XML. they have an invalid version tag, use namespaces without defining them, and have multiple root elements. fix them up!
	xmlStr = xmlStr.replace('<?xml version "1.0"?>', '<?xml version="1.0"?><cpuid_data>').replaceAll('<CPUID:', '<').replaceAll('</CPUID:', '</') + "\n</cpuid_data>";
	console.log(xmlStr);
	const parser = new DOMParser();
	const xml = parser.parseFromString(xmlStr, "text/xml");
	console.log(xml);
	
	let cpuidString = "# Imported " + fileInput.files[0].name + "\n# CPUID Explorer file\n";
	
	const cpuName = xml.getElementsByTagName("id")[0].getAttribute("name") ?? "(failed to read from input file)";
	cpuidString += "# CPU: " + cpuName + "\n\n";
	
	const leafXPath = "/cpuid_data/block/CPUID[@EAX]";
	const results = xml.evaluate(leafXPath, xml, null, XPathResult.ANY_TYPE, null);
	let leafNode = results.iterateNext();
	while (leafNode)
	{
		const leafID = parseInt(leafNode.getAttribute("EAX"), 16) >>> 0;
		const subleafID = parseInt(leafNode.getAttribute("ECX") ?? "0", 16) >>> 0;
		const eax = parseInt(leafNode.getElementsByTagName("EAX")[0].getAttribute("value"), 16) >>> 0;
		const ebx = parseInt(leafNode.getElementsByTagName("EBX")[0].getAttribute("value"), 16) >>> 0;
		const ecx = parseInt(leafNode.getElementsByTagName("ECX")[0].getAttribute("value"), 16) >>> 0;
		const edx = parseInt(leafNode.getElementsByTagName("EDX")[0].getAttribute("value"), 16) >>> 0;
		console.log("leaf=" + leafID.toString(16) + ", subleaf=" + subleafID.toString(16) + ", eax=" + eax.toString(16).padStart(8, '0') + ", ebx=" + ebx.toString(16).padStart(8, '0') + ", ecx=" + ecx.toString(16).padStart(8, '0') + ", edx=" + edx.toString(16).padStart(8, '0'));
		cpuidString += leafID.toString(16).padStart(8, '0') + '.' + subleafID.toString(16).padStart(2, '0') + '    ' + eax.toString(16).padStart(8, '0') + '  ' + ebx.toString(16).padStart(8, '0') + '  ' + ecx.toString(16).padStart(8, '0') + '  ' + edx.toString(16).padStart(8, '0') + "\n";
		leafNode = results.iterateNext();
	}
	
	document.getElementById('input_textarea').value = cpuidString;
	loadValues();
}

function importFromCpuidExplorer()
{
	const fileInput = document.getElementById("file_input");
	fileInput.files.length = 0;
	fileInput.value = null;
	fileInput.setAttribute("accept", ".cpuid");
	fileInput.addEventListener("change", fileUploadEvent, { capture: false, once: true });
	fileInput.click();
}

function loadValues()
{
	cpuid_clear();
	const inputStr = document.getElementById('input_textarea').value;
	const linuxCpuidRegex = /^\s*0x(?<leaf>[0-9a-f]+)\s+0x(?<subleaf>[0-9a-f]+):\s+eax=0x(?<eax>[0-9a-f]+)\s+ebx=0x(?<ebx>[0-9a-f]+)\s+ecx=0x(?<ecx>[0-9a-f]+)\s+edx=0x(?<edx>[0-9a-f]+)\s*$/img;
	const standardRegex = /^\s*(?<leaf>[0-9a-f]+)(?:[.](?<subleaf>[0-9a-f]+))?\s+(?<eax>[0-9a-f]+)\s+(?<ebx>[0-9a-f]+)\s+(?<ecx>[0-9a-f]+)\s+(?<edx>[0-9a-f]+)/img;
	let matches = null;
	if (inputStr.match(linuxCpuidRegex) !== null)
	{
		// linux 'cpuid' tool output
		matches = [...inputStr.matchAll(linuxCpuidRegex)];
	}
	else
	{
		// regular format
		matches = [...inputStr.matchAll(standardRegex)];
	}
	let values = [];
	// join them all into one big array
	for (const match of matches)
	{
		const leaf = {
			leaf: parseInt(match.groups.leaf, 16),
			subleaf: parseInt(match.groups.subleaf ?? "0", 16),
			registers: new Uint32Array( [ parseInt(match.groups.eax, 16), parseInt(match.groups.ebx, 16), parseInt(match.groups.ecx, 16), parseInt(match.groups.edx, 16) ] )
		};
		values.push(leaf);
	}
	// rebuild the array to nest subleaves
	const leafIDs = [...new Set(values.map(v => v.leaf))];
	let leaves = [];
	for (const leafID of leafIDs)
	{
		let leaf = {
			leaf: leafID,
			subleaves: [],
		};
		for (const value of values)
		{
			if (value.leaf == leafID)
			{
				leaf.subleaves.push({
					subleaf: value.subleaf,
					registers: value.registers,
				});
			}
		}
		leaves.push(leaf);
	}
	cpuid_build(leaves);
}

