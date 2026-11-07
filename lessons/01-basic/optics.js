"use strict";
/* Chapter 01 · Basic — Optics (2 lessons) */
LESSONS.push(
{id:"reflection",f:"Optics",l:1,t:"Reflection & refraction",
 idea:"Light bounces off a surface at the angle it arrived, and bends when it changes speed between two media. That bend is why a straw looks broken in a glass of water.",
 math:"n₁ sin θ₁ = n₂ sin θ₂",note:"n is the refractive index (1 for vacuum, 1.33 for water, 1.5 for glass). Going into a denser medium bends light toward the normal.",
 real:"Fibre-optic internet works by total internal reflection — light bounces along inside the glass for kilometres without escaping.",
 wiki:"Snell's law",need:["emwaves"]},
{id:"lenses",f:"Optics",l:1,t:"Lenses & images",
 idea:"A curved surface steers parallel rays to a single point. That is image formation, and once you know the focal length it is pure geometry — no physics left in it.",
 math:"1/f = 1/d_o + 1/d_i",note:"f focal length, d_o object distance, d_i image distance. A negative d_i means a virtual image on the same side as the object.",
 real:"An optician's prescription of −2.00 dioptres means a focal length of −0.5 m — the lens spreads light as if it came from half a metre behind you.",
 wiki:"Thin lens",need:["reflection"]}
);
