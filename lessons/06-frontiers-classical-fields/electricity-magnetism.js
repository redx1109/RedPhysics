"use strict";
/* Chapter 06 · Frontiers · Classical & Fields — Electricity & Magnetism (2 lessons) */
LESSONS.push(
{id:"maxwell",f:"Electricity & Magnetism",l:3,t:"Maxwell’s equations",
 idea:"Four equations unify electricity, magnetism and light. Their most famous consequence: a changing field propagates at 1/√(μ₀ε₀) — and that number turns out to be the speed of light.",
 math:"∇·E = ρ/ε₀   ·   ∇×B = μ₀J + μ₀ε₀ ∂E/∂t",note:"∇· is divergence (source strength), ∇× curl (circulation). The last term was Maxwell’s addition, and it made light possible.",
 real:"Wi-Fi, radio, X-rays and visible light are the same equations at different wavelengths — this is why they share a name.",
 wiki:"Maxwell's equations",need:["induction","fields"]},
{id:"emwaves",f:"Electricity & Magnetism",l:3,t:"Electromagnetic radiation",
 idea:"Light is a self-sustaining ripple of electric and magnetic fields. Radio, microwaves, visible light and X-rays differ only in wavelength — same phenomenon, different scale.",
 math:"c = 1/√(μ₀ε₀) = f λ",note:"μ₀ is the vacuum permeability, ε₀ the permittivity. Their combination fixes c, which is why light needs no medium.",
 real:"Sunlight takes 8 minutes 20 seconds to reach Earth — that is the whole of the Sun–Earth distance at 3×10⁸ m/s.",
 wiki:"Electromagnetic radiation",need:["maxwell","waveprops"]}
);
