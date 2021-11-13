/*
this fixes the size of the fallback font when GT America Mono isn't available.
the size of monospace fonts is particularly variable. Consolas is a good 12% smaller than GT America Mono.
to get it back to about the same size, this scales the font size based on the ascent and descent distances from the baseline.
*/

async function fix_font_size()
{
	const font = new FontFace('GT America Mono Regular', 'url(GT-America-Mono-Regular.woff2)');
	try
	{
		await font.load();
		console.log("GT America Mono is present. No font fix applied.");
		/*const canvas = document.createElement('canvas');
		const ctx = canvas.getContext('2d');
		ctx.font = '16px "GT America Mono OCC"';
		console.log(ctx.font);
		const m = ctx.measureText('└─┬┘│",.^[]><()0123456789 the quick brown fox jumps over the lazy dog THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG');
		console.log(m);*/
	}
	catch 
	{
		// font loading failed. resize.
		console.log("GT America Mono is not present. Fixing font size.");
		// create a canvas to measure the font.
		const canvas = document.createElement('canvas');
		const ctx = canvas.getContext('2d');
		// get the font specifier applied to the body, minus the GT America Mono reference
		const fontSize = document.body.computedStyleMap().get("font-size");
		const fontFamily = document.body.computedStyleMap().get("font-family").toString().replace('"GT America Mono Regular"', '').replace(/^[ ,]*/g, '').replace(/[ ,]*$/g, '');
		ctx.font = fontSize.toString() + ' ' + fontFamily.toString();
		// measure a string that contains all the values we expect to see
		const m = ctx.measureText('└─┬┘│",.^[]><()0123456789 the quick brown fox jumps over the lazy dog THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG');
		// descent + ascent = 24 for GT America Mono 16px. scale this font based on that.
		let scalingFactor = 24.0 / (m.actualBoundingBoxAscent + m.actualBoundingBoxDescent);
		// scaling we apply is half the delta from 1.0
		scalingFactor = 1.0 + ((scalingFactor - 1.0) * 0.5);
		console.log("Scaling factor: " + (scalingFactor * 100.0).toFixed(1) + '%');
		// apply the scaled font size
		const styleSheet = document.createElement('style');
		styleSheet.innerText = 'body { font-size: ' + (fontSize.value * scalingFactor).toFixed(2) + fontSize.unit + '; }';
		document.body.appendChild(styleSheet);
	}
}
