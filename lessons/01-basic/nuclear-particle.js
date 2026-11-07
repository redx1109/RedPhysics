"use strict";
/* Chapter 01 · Basic — Nuclear & Particle (2 lessons) */
LESSONS.push(
{id:"nucleus",f:"Nuclear & Particle",l:1,t:"Atoms & the nucleus",
 idea:"Almost all the mass sits in a nucleus 100 000 times smaller than the atom, held together by a strong force that beats electric repulsion at very short range.",
 math:"r ≈ 1.2 fm × A^(1/3)",note:"A is the mass number (protons plus neutrons). The radius grows only as the cube root because nucleons pack like marbles.",
 real:"If an atom were a football stadium, the nucleus would be a pea on the centre spot — and it holds 99.97 % of the mass.",
 wiki:"Atomic nucleus",need:["charge","photons"]},
{id:"decay",f:"Nuclear & Particle",l:1,t:"Radioactive decay",
 idea:"Decay is a probability per nucleus per second, never a schedule for one nucleus. That gives the smooth exponential fall-off, and a half-life that is a property of the isotope alone.",
 math:"N = N₀ e^(−λt)   ·   t½ = ln2 / λ",note:"λ is the decay constant. After one half-life, half remain; after ten, about one thousandth.",
 real:"Carbon-14's 5730-year half-life is what makes radiocarbon dating possible for anything up to about 50 000 years old.",
 wiki:"Radioactive decay",need:["nucleus","probability"]}
);
