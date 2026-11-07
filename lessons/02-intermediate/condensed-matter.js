"use strict";
/* Chapter 02 · Intermediate — Condensed Matter (2 lessons) */
LESSONS.push(
{id:"crystals",f:"Condensed Matter",l:2,t:"Crystals & band theory",
 idea:"In a crystal, electron waves must fit the repeating lattice, which opens up forbidden energy bands. Whether a band is full or empty decides whether the material conducts at all.",
 math:"E(k)  band structure",note:"k is the wave vector. Gaps appear where the electron wavelength matches the atomic spacing — those gaps are why insulators exist.",
 real:"Diamond and graphite are both pure carbon; the difference is how the bands line up, which decides hard-and-clear versus soft-and-black.",
 wiki:"Electronic band structure",need:["elasticity","box"]},
{id:"semiconductors",f:"Condensed Matter",l:2,t:"Semiconductors",
 idea:"A small band gap makes a material switchable: a little heat or a few dopant atoms frees carriers, so conduction can be turned on and off. Every transistor is this sentence.",
 math:"n_i ∝ e^(−E_g / 2kT)",note:"n_i is the intrinsic carrier density, E_g the gap. Silicon’s gap is 1.1 eV — small enough to switch, big enough not to leak.",
 real:"A modern processor has around 50 billion transistors, each one a tiny switch controlled by doping and voltage.",
 wiki:"Semiconductor",need:["crystals"]}
);
