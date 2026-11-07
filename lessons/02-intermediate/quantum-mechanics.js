"use strict";
/* Chapter 02 · Intermediate — Quantum Mechanics (3 lessons) */
LESSONS.push(
{id:"box",f:"Quantum Mechanics",l:2,t:"Particle in a box",lab:"quantum",
 idea:"Confine a wave and only certain wavelengths fit between the walls. Confine a particle and only certain energies are allowed. Discreteness is not an extra rule — it is what confinement does to waves.",
 math:"Eₙ = n²h² / 8mL²",note:"n is the level (1, 2, 3…), m the mass, L the box width. Energies go as n², so the gaps grow.",
 real:"Quantum dots get their colour purely from size: a 2 nm dot glows blue, a 6 nm dot glows red. Same material, different box.",
 wiki:"Particle in a box",need:["duality","standing"]},
{id:"uncertainty",f:"Quantum Mechanics",l:2,t:"The uncertainty principle",
 idea:"A confined wave cannot have a sharp momentum, and a sharp momentum is not confined. Position and momentum trade off — not because our instruments are clumsy, but because of what a wave is.",
 math:"Δx Δp ≥ ħ/2",note:"Δx is the spread in position, Δp the spread in momentum, ħ = h/2π. Squeeze one and the other must widen.",
 real:"The uncertainty principle is why a hydrogen electron does not crash into the proton — squeezing it tighter only raises its kinetic energy.",
 wiki:"Uncertainty principle",need:["box"]},
{id:"hydrogen",f:"Quantum Mechanics",l:2,t:"The hydrogen atom",
 idea:"An electron around a proton is a three-dimensional standing wave. Solving that wave equation reproduces every spectral line hydrogen has ever emitted — to many decimal places.",
 math:"Eₙ = −13.6 eV / n²",note:"The negative sign means bound. n = 1 is the ground state; n = ∞ is an electron just barely free.",
 real:"Astronomers identify the composition of distant stars from hydrogen's spectral lines — the same lines you see in a gas discharge tube.",
 wiki:"Hydrogen atom",need:["box","fields"]}
);
