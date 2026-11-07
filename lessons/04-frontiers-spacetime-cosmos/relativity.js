"use strict";
/* Chapter 04 · Frontiers · Spacetime & Cosmos — Relativity (6 lessons) */
LESSONS.push(
{id:"lorentz",f:"Relativity",l:3,t:"Spacetime & Lorentz transformations",
 idea:"Space and time mix when you change frames, exactly the way x and y mix when you rotate. Spacetime is the thing that is really there; space and time separately are just projections.",
 math:"s² = c²t² − x² − y² − z²",note:"s² is the invariant interval: every observer agrees on it, even when they disagree about t and x individually.",
 real:"If a star 10 light-years away exploded now, a ship at 0.99c would measure the trip as 1.4 years, not 10.",
 wiki:"Lorentz transformation",need:["timedilation"]},
{id:"gr",f:"Relativity",l:3,t:"General relativity",
 idea:"Gravity is not a force pulling; it is the shape of spacetime. Mass curves the geometry, and free objects follow the straightest available path through it — which looks like a falling apple.",
 math:"G_μν = 8πG T_μν / c⁴",note:"G_μν describes curvature, T_μν the energy and momentum causing it. Matter tells spacetime how to bend; spacetime tells matter how to move.",
 real:"Gravitational lensing lets astronomers weigh galaxy clusters by how much they bend the light of things behind them.",
 wiki:"General relativity",need:["lorentz","orbits"]},
{id:"blackholes",f:"Relativity",l:3,t:"Black holes",
 idea:"Pack enough mass into a small enough region and the escape velocity exceeds c. Nothing gets out, not even light — and the boundary is simply where that becomes true.",
 math:"r_s = 2GM/c²",note:"r_s is the Schwarzschild radius. For the Sun it is about 3 km; for Earth, about 9 mm.",
 real:"The first image of one, M87*, was released in 2019 — a 6.5-billion-solar-mass black hole 55 million light-years away.",
 wiki:"Black hole",need:["gr"]},
{id:"einstein",f:"Relativity",l:3,t:"The Einstein field equations",
 idea:"Curvature equals stress-energy, up to a constant. That is the whole theory — ten coupled nonlinear PDEs whose solutions are the shape of spacetime around any distribution of matter.",
 setup:"You need differential geometry: the metric, covariant derivative, Riemann/Ricci tensors, and the Bianchi identities. Without these, the field equations are just a symbol soup.",
 formalism:"The left-hand side must be a symmetric rank-2 tensor built from the metric and its derivatives, and it must be divergence-free (Bianchi identity). The only combination is G_μν = R_μν − ½R g_μν. Add the cosmological constant Λ g_μν. Equate to the stress-energy tensor.",
 derivation:"Vary the Einstein–Hilbert action S = (1/16πG)∫√(−g) R d⁴x + S_matter with respect to g^μν. The variation of the Ricci scalar gives G_μν. The variation of S_matter gives T_μν. Setting them equal gives the field equations.",
 math:"R_μν − ½ R g_μν + Λ g_μν = 8πG T_μν / c⁴",
 note:"R_μν is the Ricci tensor, R the Ricci scalar, g the metric, Λ the cosmological constant, T the stress-energy tensor.",
 pitfall:"The field equations are local — they relate curvature at a point to matter at that same point. They do not give you a global solution directly; you must impose boundary conditions, and the choice of topology is part of the solution.",
 real:"The Λ term was called Einstein's 'biggest blunder' — then dark energy made it look prescient after all.",
 refs:[
  {a:"Wald, General Relativity",c:"Ch. 4 — The field equations"},
  {a:"Schutz, A First Course in GR",c:"Ch. 7 — Curvature and the field equations"},
  {a:"Carroll, Spacetime and Geometry",c:"Ch. 4 — The Einstein equation"}
 ],
 problems:[
  "Verify that the Einstein tensor G_μν is divergence-free by contracting the Bianchi identities.",
  "Derive the Schwarzschild solution in the static, spherically symmetric ansatz.",
  "Show that the cosmological constant can be viewed as a perfect fluid with equation of state p = −ρc²."
 ],
 wiki:"Einstein field equations",need:["gr","lagrange"]},
{id:"kerr",f:"Relativity",l:3,t:"Schwarzschild & Kerr black holes",
 idea:"Schwarzschild is the non-rotating solution; Kerr is the rotating one. Real black holes rotate, and that gives them an ergosphere — a region where you cannot help but be dragged around.",
 setup:"You need the Schwarzschild solution (to see the non-rotating limit) and the notion of Killing vectors (symmetries of the metric). The Kerr solution has two Killing vectors: time translation and rotation about the spin axis.",
 formalism:"In Boyer–Lindquist coordinates, the Kerr metric has parameters M (mass) and a = J/Mc (spin). The horizons are at r_± = M ± √(M² − a²). The ergosphere is at r_ergo = M + √(M² − a² cos²θ), outside the outer horizon — inside it, no observer can remain at fixed (r,θ,φ).",
 derivation:"Starting from the Kerr–Schild form, transform to Boyer–Lindquist coordinates. Identify the event horizon where the metric component g_rr blows up. Identify the ergosphere where g_tt vanishes. Show that as a → 0, the metric reduces to Schwarzschild.",
 math:"ds² = −(1−r_s r/Σ) c² dt² − (2 r_s r a sin²θ/Σ) c dt dφ + ...",
 note:"Σ = r² + a²cos²θ, a = J/Mc. When a → 0 the Kerr metric reduces to Schwarzschild.",
 pitfall:"The ergosphere is not the horizon. You can escape the ergosphere; you cannot escape the horizon. Inside the ergosphere, no observer can be static — you must rotate with the black hole, but you can still leave.",
 real:"The Event Horizon Telescope image of M87* fits a Kerr black hole with a ≈ 0.9 — spin near the theoretical maximum.",
 refs:[
  {a:"Wald, General Relativity",c:"Ch. 12 — Black holes"},
  {a:"Carroll, Spacetime and Geometry",c:"Ch. 6 — Rotating black holes"},
  {a:"Chandrasekhar, The Mathematical Theory of Black Holes",c:"Ch. 6"}
 ],
 problems:[
  "Verify that the Kerr metric has two Killing horizons and find their locations r_±.",
  "Show that the Penrose process can extract energy from a rotating black hole, and derive the maximum efficiency.",
  "Compute the area of the event horizon and show that it satisfies the second law of black hole mechanics."
 ],
 wiki:"Kerr metric",need:["einstein","blackholes"]},
{id:"hawking",f:"Relativity",l:3,t:"Hawking radiation & black hole thermodynamics",
 idea:"Quantum field theory in curved spacetime forces a black hole to radiate at a temperature set by its surface gravity. Black holes are thermodynamic objects — and this is where gravity and quantum mechanics first collided.",
 setup:"You need QFT in flat space (to see how vacuum states are defined) and the concept of a Killing horizon (the black hole event horizon as a null surface). The Bogoliubov transformation between different vacua is the technical heart.",
 formalism:"Consider a scalar field propagating on the Schwarzschild background. Define a positive-frequency mode basis on the past null infinity I⁻ and another on the future null infinity I⁺. The two bases are related by a Bogoliubov transformation. The particle number operator in one basis, evaluated on the vacuum of the other, gives the Hawking flux.",
 derivation:"Trace the outgoing modes backward through the collapsing body. A mode of the field is redshifted as it climbs out of the gravitational well. Summing over the outgoing modes gives a thermal spectrum at temperature T_H = ħκ/2π, where κ is the surface gravity.",
 math:"T_H = ħ c³ / (8π G M k_B)",
 note:"Temperature is inversely proportional to mass. A solar-mass black hole has T ≈ 6 × 10⁻⁸ K — far colder than the CMB, so it absorbs more than it emits.",
 pitfall:"Hawking radiation does not come from inside the horizon — it emerges from the region just outside it. The 'particle pair' heuristic is misleading; the real derivation is a Bogoliubov transformation between two inequivalent vacua.",
 real:"The information paradox — what happens to the infalling quantum state after evaporation? — is still the sharpest clue we have toward quantum gravity.",
 refs:[
  {a:"Hawking, 'Particle Creation by Black Holes' (1975)",c:"Comm. Math. Phys. 43, 199"},
  {a:"Wald, Quantum Field Theory in Curved Spacetime",c:"Ch. 5"},
  {a:"Carroll, Spacetime and Geometry",c:"Ch. 9 — Quantum field theory in curved spacetime"}
 ],
 problems:[
  "Compute the Bogoliubov coefficients for the simplest collapsing shell model and verify the thermal spectrum.",
  "Derive the black hole entropy S = A/4G from the first law of black hole thermodynamics.",
  "Explain why the information paradox is sharpened, not resolved, by the existence of Hawking radiation."
 ],
 wiki:"Hawking radiation",need:["kerr","quantumstats"]}
);
