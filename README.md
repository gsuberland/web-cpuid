# web-cpuid

web-cpuid is a lightweight web based decoder for CPUID information.

![screenshot](screenshot.png)

you can find a hosted version of it [here](https://cpuid.apps.poly.nomial.co.uk/).

## usage

either use the hosted version or open `src/cpuid.html` in a browser locally.

cpuid values are loaded into the textarea at the top, in the following format:

```
leaf.subleaf eax ebx ecx edx
```

all values are to be given in hexadecimal.

you can toggle the display of leaf register values and field bit ranges with the buttons at the top of the page.

## build

the files in `src/` are suitable for immediate use as long as you're not hosting them on a server that needs subresource integrity (SRI) - just open `cpuid.html` in a browser and you're good to go.

the `build.py` script generates SHA256 SRI tags for the referenced scripts and styles and outputs everything into a `build` subdirectory.

## status

web-cpuid is in active development and is not yet complete. currently only Intel leaves are supported, but the framework is in place to be able to support AMD, VIA, etc.

not all leaves are decoded but they are rapidly being implemented.

## license

web-cpuid is released under MIT license.

the font used on the hosted version is [GT America Mono](https://www.grillitype.com/typeface/gt-america), a commercial font. I paid for a license to use it on my website. the font is not included in this repository as I do not have the rights to distribute it.