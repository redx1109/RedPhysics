"use strict";
/* Chapter 06 · Frontiers · Classical & Fields — Optics (2 lessons) */
LESSONS.push(
{id:"fourieroptics",f:"Optics",l:3,t:"Fourier optics",
 idea:"A lens physically computes a Fourier transform: the focal plane holds the spatial frequencies of the object. Blocking parts of that plane is image processing done with glass.",
 math:"U(x,y) → F(u,v) at the focal plane",note:"U is the field at the lens, F its two-dimensional spectrum. This is why spatial filtering can sharpen or blur a photo.",
 real:"Astronomers put a dark mask in the focal plane of a coronagraph to block a star's light and see the planets beside it.",
 wiki:"Fourier optics",need:["diffraction","fourier"]},
{id:"lasers",f:"Optics",l:3,t:"Lasers & coherence",
 idea:"Stimulated emission makes new photons identical to the ones that triggered them — same phase, colour and direction. Coherence is what separates a laser from a torch.",
 math:"N₂ / N₁ > 1   (population inversion)",note:"Normally more atoms sit in the lower state. Pump enough energy in and you invert the ratio, and light amplifies instead of absorbing.",
 real:"The first laser, in 1960, was a ruby rod; today they scan barcodes, cut steel and measure the Moon's distance to the millimetre.",
 wiki:"Laser",need:["diffraction","photons"]}
);
