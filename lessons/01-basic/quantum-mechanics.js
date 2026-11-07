"use strict";
/* Chapter 01 · Basic — Quantum Mechanics (2 lessons) */
LESSONS.push(
{id:"photons",f:"Quantum Mechanics",l:1,t:"Photons & the photoelectric effect",
 idea:"Light arrives in packets of energy hf. Brighter light means more packets, not bigger ones — which is why blue light ejects electrons and red never does, however bright you make it.",
 math:"E = hf",note:"h is Planck’s constant, f the frequency. Violet photons carry roughly twice the energy of red ones.",
 real:"Solar panels and digital camera sensors both work this way: a photon either has enough energy to free an electron, or it does nothing.",
 wiki:"Photoelectric effect",need:["emwaves"]},
{id:"duality",f:"Quantum Mechanics",l:1,t:"Wave–particle duality",
 idea:"Electrons diffract like waves and land like particles. Both descriptions are partial; the object itself is neither, and the best we can do is say which behaviour shows up in which experiment.",
 math:"λ = h/p",note:"The de Broglie wavelength. p is momentum, so a fast or heavy object has a wavelength too small to notice.",
 real:"Electron microscopes resolve atoms because a 100 keV electron has a wavelength of about 4 picometres.",
 wiki:"Wave–particle duality",need:["photons","diffraction"]}
);
