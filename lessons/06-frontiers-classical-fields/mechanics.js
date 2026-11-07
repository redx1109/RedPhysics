"use strict";
/* Chapter 06 · Frontiers · Classical & Fields — Mechanics (3 lessons) */
LESSONS.push(
{id:"orbits",f:"Mechanics",l:3,t:"Gravity & orbits",lab:"orbit",
 idea:"An orbit is falling that keeps missing. The same inverse-square pull that drops an apple bends a planet’s path into a closed loop — provided it is not moving too fast to be caught.",
 math:"F = GMm/r²   ·   v_circ = √(GM/r)",note:"G is the gravitational constant, M the central mass, r the separation. Escape speed is √2 times the circular speed.",
 real:"GPS satellites fly at about 3.87 km/s — one-seventh of escape speed, which is why they stay in orbit rather than leaving.",
 wiki:"Orbital mechanics",need:["energy","rotation"]},
{id:"lagrange",f:"Mechanics",l:3,t:"Lagrangian mechanics",
 idea:"Instead of tracking every force, write down the energy and let one rule — least action — generate the motion for you. Same physics, far less bookkeeping, and it survives any choice of coordinates.",
 math:"L = T − V   ·   d/dt(∂L/∂q̇) = ∂L/∂q",note:"T is kinetic energy, V potential, q any coordinate you like. The equation falls out of differentiating one function.",
 real:"Robot arm controllers use Lagrangian dynamics because joint angles are far easier coordinates than cartesian forces.",
 wiki:"Lagrangian mechanics",need:["energy","calculus"]},
{id:"chaos",f:"Mechanics",l:3,t:"Chaos & nonlinear dynamics",
 idea:"Some systems obey exact laws yet cannot be predicted far ahead, because tiny differences grow exponentially. Deterministic and predictable are not the same word.",
 math:"xₙ₊₁ = r xₙ (1 − xₙ)",note:"The logistic map. For r above about 3.57 the sequence never repeats, yet comes from a one-line rule.",
 real:"Weather models lose accuracy after about ten days — not because the equations are wrong, but because the atmosphere is chaotic.",
 wiki:"Chaos theory",need:["shm","calculus"]}
);
