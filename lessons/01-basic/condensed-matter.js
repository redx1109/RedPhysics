"use strict";
/* Chapter 01 · Basic — Condensed Matter (2 lessons) */
LESSONS.push(
{id:"states",f:"Condensed Matter",l:1,t:"States of matter",
 idea:"Solids hold their shape, liquids hold their volume, gases hold neither. The difference is how much thermal energy the particles have compared with the bonds pulling them together.",
 math:"competition:  kT  vs  bond energy",note:"When kT is much smaller than the bond energy you get a solid. Comparable, and you get a liquid; much larger, a gas.",
 real:"Dry ice sublimates straight from solid to gas at room pressure — the bonds are so weak that liquid is not stable.",
 wiki:"State of matter",need:["gas","boltzmann"]},
{id:"elasticity",f:"Condensed Matter",l:1,t:"Elasticity",
 idea:"Solids are springs made of atoms. Small stretches give a linear response — double the force, double the stretch — but past the elastic limit the atoms slide and it does not come back.",
 math:"σ = E ε   ·   F = −kx",note:"σ is stress (force per area), ε is strain (fractional stretch), E is Young’s modulus. The minus sign means restoring.",
 real:"A paperclip bent a little springs back; bent too far it stays bent, because the atomic planes have slipped past each other.",
 wiki:"Elasticity (physics)",need:["states"]}
);
