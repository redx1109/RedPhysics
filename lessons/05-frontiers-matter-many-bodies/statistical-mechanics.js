"use strict";
/* Chapter 05 · Frontiers · Matter & Many Bodies — Statistical Mechanics (2 lessons) */
LESSONS.push(
{id:"quantumstats",f:"Statistical Mechanics",l:3,t:"Bose–Einstein & Fermi–Dirac statistics",
 idea:"Identical particles are truly indistinguishable, and that changes the counting. Bosons pile into the same state; fermions refuse to share, which is why matter has structure at all.",
 math:"n̄ = 1 / (e^((E−μ)/kT) ∓ 1)",note:"n̄ is the average occupation, μ the chemical potential. Minus is bosons, plus is fermions — a single sign changes the universe.",
 real:"Electrons are fermions, so they stack into shells — which is the entire reason chemistry exists and you do not collapse.",
 wiki:"Fermi–Dirac statistics",need:["partition","hilbert"]},
{id:"rg",f:"Statistical Mechanics",l:3,t:"Renormalization group & critical phenomena",
 idea:"Near a critical point, the system looks the same at every length scale. Coarse-grain it repeatedly and you flow toward a fixed point — and the critical exponents are the eigenvalues of the flow near that point.",
 setup:"You need the Landau theory of phase transitions (to see what an order parameter is) and a bit of Wilsonian thinking (coarse-graining and effective actions).",
 formalism:"Introduce a coarse-graining step: integrate out short-wavelength fluctuations. Renormalise the couplings. The flow is defined by dK/dl = β(K) where K is a coupling and l is the log of the length scale. Fixed points (β(K*) = 0) define scale-invariant points in the space of theories.",
 derivation:"Take the Landau–Ginzburg free energy. Integrate out short-wavelength modes (momentum shell from Λ to Λ/b). Rescale lengths and fields. Read off the flow of the couplings. Find the fixed point K*. Linearise the flow around K*: the eigenvalues λ give the critical exponents via ν = 1/λ_relevant. This is the origin of universality.",
 math:"K′ = f(K),  |f′(K*)| sets ν",
 note:"K is a coupling, K* the fixed point, f′ the derivative there. Relevant directions give the critical exponents; irrelevant ones are washed out.",
 pitfall:"Renormalisation group is a semigroup, not a group — you cannot run it backward. Integrating out high momentum destroys information. That is why the flow is irreversible and why the fixed point is an attractor.",
 real:"Universality: water and a magnet near their critical points share the same exponents, because both flow to the same fixed point.",
 refs:[
  {a:"Cardy, Scaling and Renormalization in Statistical Physics",c:"Ch. 3–5"},
  {a:"Wilson & Kogut, Phys. Rep. 12, 75 (1974)",c:"The renormalization group and the ε expansion"},
  {a:"Goldenfeld, Lectures on Phase Transitions",c:"Ch. 5 — Renormalization group"}
 ],
 problems:[
  "Compute the one-loop beta function for φ⁴ theory in d = 4 − ε, and derive the Wilson–Fisher fixed point.",
  "Show that the Gaussian fixed point is unstable below d = 4, and identify the upper critical dimension.",
  "Derive the scaling relation ν = 1/(2 − η) for the mean-field theory, and explain why it fails."
 ],
 wiki:"Renormalization group",need:["partition","phases"]}
);
