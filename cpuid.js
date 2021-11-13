"use strict";


/*
Exception types
*/
function NotImplementedError(message = "") {
  this.name = "NotImplementedError";
  this.message = message;
}
NotImplementedError.prototype = Error.prototype;

/*
Basic resolvers for common data types
*/
class CpuidBaseResolvers
{
	static increment(v, ctx=null)
	{
		return v+1;
	}
	
	static decrement(v, ctx=null)
	{
		return v-1;
	}

	static hex(v, ctx=null)
	{
		return v.toString(16).toUpperCase().padStart(2,'0') + "h";
	}

	static ascii(v, ctx=null)
	{
		return '"' + String.fromCharCode(v&0xFF) + String.fromCharCode((v>>8)&0xFF) + String.fromCharCode((v>>16)&0xFF) + String.fromCharCode((v>>24)&0xFF) + '"';
	}

	static bool(v, ctx=null)
	{
		return (v == 1) ? true : false;
	}

	static boolInv(v, ctx=null)
	{
		return (v == 1) ? "false" : "true";
	}

}

/*
Various helper functions that are useful in multiple contexts.
*/
class CpuidHelpers
{
	// extract bits from a value. bits can be a single bit index (0-31) or a range of bits [hi:lo]
	static extractBits(value, bits)
	{
		let mask = 1;
		let shift = 0;
		if (Array.isArray(bits))
		{
			for (let b = bits[1]; b < bits[0]; b++)
			{
				mask |= mask << 1;
			}
			shift = bits[1];
		}
		else
		{
			shift = bits;
		}
		return (value >> shift) & mask;
	}
}

/*
Base class for CPUID fields. This is overridden for each vendor.
*/
class CpuidFieldsBase
{
	getLeafDefinition(leaf)
	{
		throw new NotImplementedError("getLeafDefinition must be overridden in a deriving class");
	}
}

/*
Class that contains information about each cell in the diagram.
*/
class CpuidDiagramCell
{
	constructor()
	{
		this.value = ' ';
		this.style = 'd';
		this.owner = null;
	}
}

/*
Class for describing fields of CPUID registers
*/
class CpuidField
{
	constructor(name, bits, resolve=null, options={printRawHex: false, reserved: false})
	{
		this.name = name;
		this.bits = bits;
		this.resolveFunction = resolve;
		this.printRawHex = options.printRawHex ?? false;
		this.reserved = options.reserved ?? false;
	}
	
	// returns true if this field is a single bit wide, otherwise false
	isSingleBit()
	{
		return !Array.isArray(this.bits);
	}
	
	// returns true if this field consists of multiple bits, otherwise false
	isBitRange()
	{
		return Array.isArray(this.bits);
	}
	
	getBitIndices()
	{
		let bitArray = [];
		if (this.isSingleBit())
		{
			bitArray[0] = field.bits;
		}
		else
		{
			for (let i = this.bits[0]; i >= this.bits[1]; i--)
			{
				bitArray.push(i);
			}
		}
		return bitArray;
	}
	
	// returns true if this field is reserved, otherwise false
	isReserved()
	{
		return this.reserved === true;
	}
	
	// returns the boolean value of this field if it is a boolean, otherwise null
	getBooleanValue(registerValue, context=null)
	{
		let value = this.getDisplayValue(registerValue, context);
		if (typeof value === 'boolean')
		{
			return value;
		}
		return null;
	}
	
	getStyleCode(registerValue, context=null)
	{
		// 'r' for reserved fields
		if (this.isReserved())
			return 'r';
		
		// if the field resolves to a boolean, return 't' or 'f' for true/false respectively
		let boolValue = this.getBooleanValue(registerValue, context);
		if (boolValue !== null)
		{
			return boolValue === true ? 't' : 'f';
		}
		
		// 'd' for default
		return 'd';
	}
	
	// returns the raw value of this field, for a given register value
	getRawValue(registerValue)
	{
		let extractedValue = CpuidHelpers.extractBits(registerValue, this.bits);
		return extractedValue;
	}
	
	// returns the raw value of this field, for a given register value, as a formatted string
	getRawValueFormatted(registerValue)
	{
		let value = this.getRawValue(registerValue);
		// print in hex if explicitly told to, or if this is a reserved multi-bit field
		let printHex = this.printRawHex || (this.reserved && this.isBitRange());
		let fieldDisplayWidth = printHex ? (this.isBitRange() ? Math.max(2, Math.ceil((this.bits[0] - this.bits[1]) / 4)) : 2) : 0;
		let fieldValueStr = (value>>>0).toString(printHex ? 16 : 10).toUpperCase().padStart(fieldDisplayWidth, '0') + (printHex ? "h" : "");
		return fieldValueStr;
	}
	
	// returns the decoded value of this field, for a given register value, or null if there is no decoded value
	getDisplayValue(registerValue, context=null)
	{
		let value = this.getRawValue(registerValue);
		if (typeof this.resolveFunction === 'function')
			return this.resolveFunction(value, context);
		return null;
	}
}

/*
CPUID diagram class
Responsible for building and managing diagrams
*/
class CpuidDiagram
{
	constructor(elementName, fields, registerValue, context=null)
	{
		this.container = document.getElementById(elementName);
		this.fields = fields;
		this.context = context;
		this.height = fields.length + 2;
		this.width = 256;
		this.registerValue = registerValue;
		this.showBitRange = false;
		this.initCells();
	}
	
	initCells()
	{
		this.cells = new Array(this.height);
		for (let y = 0; y < this.height; y++)
		{
			this.cells[y] = new Array(this.width);
			for (let x = 0; x < this.width; x++)
			{
				this.cells[y][x] = new CpuidDiagramCell();
			}
		}
	}
	
	// gets the X position in the diagram for a given bit index
	getXPosForBit(bitIndex)
	{
		return (31-bitIndex)*2;
	}
	
	// finds the index of the field that is associated with a specific bit index
	getFieldIndexForBit(bitIndex)
	{
		for (const [fieldIndex, field] of this.fields.entries())
		{
			if (field.isSingleBit())
			{
				if (field.bits == bitIndex)
					return fieldIndex;
			}
			else
			{
				if ((field.bits[0] >= bitIndex) && (field.bits[1] <= bitIndex))
					return fieldIndex;
			}
		}
		return null;
	}
	
	styleCodeToClass(style)
	{
		/*
		defined styles:
			f = false, red
			t = true, green
			r = reserved, grey
			d = default
		*/
		if (style === "f")
			return "bit_false";
		if (style === "t")
			return "bit_true";
		if (style === "r")
			return "bit_reserved";
		return "bit_default";
	}
	
	// sets the value of a cell. the field index ties the cell to a specific field for highlighting
	setCellValue(y, x, value, ownerFieldIndex, style='d')
	{
		this.cells[y][x].owner = ownerFieldIndex;
		this.cells[y][x].value = value;
		this.cells[y][x].style = style;
	}
	
	getMaxFieldNameLength()
	{
		// figure out the max field name length
		let maxFieldNameLen = 0;
		for (let i = 0; i < this.fields.length; i++)
		{
			maxFieldNameLen = Math.max(maxFieldNameLen, this.fields[i].name.length);
		}
		return maxFieldNameLen;
	}
	
	makeDiagramSpan(owner, extraStyles)
	{
		let span = document.createElement("span");
		span.classList.add("diagram_span");
		if (owner !== null)
		{
			span.setAttribute("data-cpuid-owner", owner.toString());
			span.onmouseover = handleSpanMouseHover;
			span.onmouseleave = handleSpanMouseLeave;
		}
		for (const styleName of extraStyles)
		{
			if (styleName !== null)
				span.classList.add(styleName);
		}
		return span;
	}
	
	clear()
	{
		while (this.container.firstChild)
		{
			this.container.removeChild(this.container.lastChild);
		}
		this.initCells();
	}
	
	build()
	{
		const BITS_ROW = 0;
		const COMBINING_ROW = 1;
		const BEGIN_ROW = 2;
		
		const VBAR = "│";
		const HBAR = "─";
		const LEFT_EDGE = "└";
		const RIGHT_EDGE = "┘";
		const TEE = "┬";
		
		// gap between the lines and the field name
		const FIELDNAME_GAP = 2;
		// x position of the field names
		const FIELDNAME_POS = (32*2)+FIELDNAME_GAP;
		// gap between the longest field name and the field value
		const FIELDVAL_GAP = 4;
		
		// write the bit values
		for (let i = 0; i < 32; i++)
		{
			const bitValue = CpuidHelpers.extractBits(this.registerValue, i);
			const associatedFieldIndex = this.getFieldIndexForBit(i);
			const associatedField = this.fields[associatedFieldIndex];
			this.setCellValue(
				BITS_ROW, this.getXPosForBit(i),
				bitValue,
				associatedFieldIndex,
				associatedField.getStyleCode(this.registerValue, this.context)
			);
		}
		
		// mark the internal spaces between bits within multi-bit fields with the owning field ID
		for (const [fieldIndex, field] of this.fields.entries())
		{
			if (field.isBitRange())
			{
				const leftmostPos = this.getXPosForBit(field.bits[0]);
				const rightmostPos = this.getXPosForBit(field.bits[1]);
				for (let x = leftmostPos + 1; x < rightmostPos; x += 2)
				{
					this.setCellValue(
						BITS_ROW, x,
						' ',
						fieldIndex,
						field.getStyleCode(this.registerValue, this.context)
					);
				}
			}
		}
		
		// write the combining lines
		for (const [fieldIndex, field] of this.fields.entries())
		{
			const styleCode = field.getStyleCode(this.registerValue, this.context);
			if (field.isSingleBit())
			{
				// for single bits, just write a vertical bar
				let bitValue = CpuidHelpers.extractBits(this.registerValue, field.bits);
				this.setCellValue(
					COMBINING_ROW, this.getXPosForBit(field.bits),
					VBAR,
					fieldIndex,
					styleCode
				);
			}
			else
			{
				// for multiple bits we need to draw the combining lines
				const highBitIndex = field.bits[0];
				const lowBitIndex = field.bits[1];
				const highBitXPos = this.getXPosForBit(highBitIndex);
				const lowBitXPos = this.getXPosForBit(lowBitIndex);
				// write the left edge
				this.setCellValue(
					COMBINING_ROW, highBitXPos,
					LEFT_EDGE,
					fieldIndex,
					styleCode
				);
				// write the right edge
				this.setCellValue(
					COMBINING_ROW, lowBitXPos,
					RIGHT_EDGE,
					fieldIndex,
					styleCode
				);
				// join them together with a line
				for (let x = highBitXPos + 1; x < lowBitXPos; x++)
				{
					this.setCellValue(
						COMBINING_ROW, x,
						HBAR,
						fieldIndex,
						styleCode
					);
				}
				// draw the tee in the middle
				const fieldWidth = lowBitXPos - highBitXPos;
				const fieldMidPos = highBitXPos + (fieldWidth / 2);
				this.setCellValue(
					COMBINING_ROW, fieldMidPos,
					TEE,
					fieldIndex,
					styleCode
				);
			}
		}
		
		// write the main lines
		for (let y = BEGIN_ROW; y < this.height; y++)
		{
			for (const [fieldIndex, field] of this.fields.entries())
			{
				let linePos = -1;
				if (field.isSingleBit())
				{
					linePos = this.getXPosForBit(field.bits);
				}
				else
				{
					const highBitXPos = this.getXPosForBit(field.bits[1]);
					const lowBitXPos = this.getXPosForBit(field.bits[0]);
					const fieldWidth = lowBitXPos - highBitXPos;
					const fieldMidPos = highBitXPos + (fieldWidth / 2);
					linePos = fieldMidPos;
				}
				if ((y + 1) == (this.fields.length - fieldIndex) + BEGIN_ROW)
				{
					this.setCellValue(
						y, linePos,
						LEFT_EDGE,
						fieldIndex,
						field.getStyleCode(this.registerValue, this.context)
					);
					for (let x = linePos + 1; x < FIELDNAME_POS - FIELDNAME_GAP; x++)
					{
						this.setCellValue(
							y, x,
							HBAR,
							fieldIndex,
							field.getStyleCode(this.registerValue, this.context)
						);
					}
				}
				else if ((y + 1) < (this.fields.length - fieldIndex) + BEGIN_ROW)
				{
					this.setCellValue(
						y, linePos,
						VBAR,
						fieldIndex,
						field.getStyleCode(this.registerValue, this.context)
					);
				}
			}
		}
		
		// write the field bit ranges, names and values
		const maxFieldNameLen = this.getMaxFieldNameLength();
		for (const [fieldIndex, field] of this.fields.entries())
		{
			let yPos = BEGIN_ROW + ((this.fields.length - 1) - fieldIndex);
			let offsetX = FIELDNAME_POS - FIELDNAME_GAP;
			
			const fieldStyleCode = field.getStyleCode(this.registerValue, this.context);
			
			// if bit ranges are shown, write them
			if (this.showBitRange)
			{
				let bitRangeStr = '[';
				if (field.isSingleBit())
				{
					bitRangeStr += '   ' + field.bits.toString().padStart(2, '0');
				}
				else
				{
					bitRangeStr += field.bits[0].toString().padStart(2, '0') + ':' + field.bits[1].toString().padStart(2, '0');
				}
				bitRangeStr = bitRangeStr.padEnd(6, ' ');
				bitRangeStr += ']';
				
				for (let s = 0; s < bitRangeStr.length; s++)
				{
					this.setCellValue(
						yPos, offsetX + s,
						bitRangeStr[s],
						fieldIndex,
						fieldStyleCode
					);
				}
				
				offsetX += 7;
			}
			
			// spaces between line and field names
			for (let s = 0; s < FIELDNAME_GAP; s++)
			{
				this.setCellValue(
					yPos, offsetX + s,
					' ',
					fieldIndex,
					fieldStyleCode
				);
			}
			
			offsetX += FIELDNAME_GAP;
			
			// field name
			for (let s = 0; s < field.name.length; s++)
			{
				this.setCellValue(
					yPos, offsetX + s,
					field.name[s],
					fieldIndex,
					fieldStyleCode
				);
			}
			
			// spaces between field name and gap
			for (let s = offsetX + field.name.length; s < offsetX + maxFieldNameLen + FIELDVAL_GAP; s++)
			{
				this.setCellValue(
					yPos, s,
					' ',
					fieldIndex,
					fieldStyleCode
				);
			}
			offsetX += maxFieldNameLen + FIELDVAL_GAP;
			
			// field display value, if any
			let needToCloseBracket = false;
			const displayValue = field.getDisplayValue(this.registerValue, this.context);
			if (displayValue !== null)
			{
				const displayValueStr = displayValue.toString();
				
				for (let s = 0; s < displayValueStr.length; s++)
				{
					this.setCellValue(
						yPos, offsetX + s,
						displayValueStr[s],
						fieldIndex,
						fieldStyleCode
					);
				}
				
				offsetX += displayValueStr.length + 2;
				
				this.setCellValue(
					yPos, offsetX - 1,
					"(",
					fieldIndex,
					fieldStyleCode
				);
				this.setCellValue(
					yPos, offsetX - 2,
					" ",
					fieldIndex,
					fieldStyleCode
				);
				needToCloseBracket = true;
			}
			
			// field raw value
			const rawValue = field.getRawValueFormatted(this.registerValue, this.context);
			for (let s = 0; s < rawValue.length; s++)
			{
				this.setCellValue(
					yPos, offsetX + s,
					rawValue[s],
					fieldIndex,
					fieldStyleCode
				);
			}
			
			// closing bracket if the raw value was inclosed in parenthesis
			if (needToCloseBracket)
			{
				this.setCellValue(
					yPos, offsetX + rawValue.length,
					")",
					fieldIndex,
					fieldStyleCode
				);
			}
		}
		
		
		// build the html
		for (let y = 0; y < this.height; y++)
		{
			// set the style based on the left-most cell in this row
			let currentStyle = this.cells[y][0].style;
			// set the owner tag based on the left-most cell in this row
			let currentOwner = this.cells[y][0].owner;
			
			// start a new span for the row, with the relevant styles
			let currentSpan = this.makeDiagramSpan(currentOwner, [ this.styleCodeToClass(currentStyle), (y === BITS_ROW) ? "bitfield" : null ]);
			
			let outputString = "";
			for (let x = 0; x < this.width; x++)
			{
				if ((this.cells[y][x].style !== currentStyle) || (this.cells[y][x].owner !== currentOwner))
				{
					// we've changed style or owner, so we need a new span. write the current one out then make a new one.
					currentSpan.innerText = outputString;
					this.container.appendChild(currentSpan);
					outputString = "";
					
					currentStyle = this.cells[y][x].style;
					currentOwner = this.cells[y][x].owner;
					currentSpan = this.makeDiagramSpan(currentOwner, [ this.styleCodeToClass(currentStyle), (y === BITS_ROW) ? "bitfield" : null ]);
				}
				outputString += this.cells[y][x].value;
			}
			currentSpan.innerText = outputString;
			this.container.appendChild(currentSpan);
			this.container.appendChild(document.createElement("br"));
		}
	}
}
