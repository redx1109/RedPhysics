"use strict";
/* Chapter 04 · Frontiers · Spacetime & Cosmos — Astrophysics & Cosmology (3 lessons) */
LESSONS.push(
{id:"bigbang",f:"Astrophysics & Cosmology",l:3,t:"Expansion & the Big Bang",
 idea:"Every galaxy is moving away from every other, and the further away it is the faster it recedes. Run that backwards and everything was once in a very small, very hot place.",
 math:"v = H₀ d",note:"Hubble’s law. H₀ is about 70 km/s per megaparsec. The expansion is of space itself, not motion through space.",
 real:"The Andromeda galaxy is actually blue-shifted: it is close enough to be falling toward us and will merge in 4 billion years.",
 wiki:"Big Bang",need:["galaxies","gr"]},
{id:"cmb",f:"Astrophysics & Cosmology",l:3,t:"The cosmic microwave background",
 idea:"The leftover glow from the moment the universe first became transparent. Its tiny temperature ripples, about one part in 100 000, are the seeds every galaxy grew from.",
 math:"T ≈ 2.725 K",note:"A near-perfect blackbody spectrum, now stretched into microwaves. Its peaks and troughs encode the composition of the early universe.",
 real:"About 1 % of the static on an untuned analogue TV was this 13.8-billion-year-old light.",
 wiki:"Cosmic microwave background",need:["bigbang","boltzmann"]},
{id:"inflation",f:"Astrophysics & Cosmology",l:3,t:"Inflation & the early universe",
 idea:"A brief epoch of exponential expansion solves the horizon and flatness problems and turns quantum fluctuations into the seeds of galaxies. It is the standard story, though we still do not know what drove it.",
 setup:"You need the Friedmann equation and the FRW metric. The horizon problem is why the CMB is uniform across regions that were never in causal contact; the flatness problem is why the universe is so close to critical density.",
 formalism:"Introduce a scalar field φ (the inflaton) with potential V(φ). The energy density is dominated by the potential. Slow-roll conditions: ε ≪ 1 and |η| ≪ 1, where ε and η are derived from V and its derivatives. Under slow-roll, H ≈ constant, so a(t) grows exponentially.",
 derivation:"Start from the FRW equation with a scalar field. Write the equation of motion for φ (the Klein–Gordon equation in curved spacetime). Apply slow-roll: ignore φ̈, find ε and η. The scalar power spectrum P_s ∝ H²/ε. The tensor-to-scalar ratio r = 16ε. Measure r to test the model.",
 math:"a(t) ∝ e^(Ht),  H² ≈ V(φ)/3M_P²",
 note:"φ is the inflaton field, M_P the reduced Planck mass. Slow-roll means H is nearly constant — that is what makes the expansion exponential.",
 pitfall:"Inflation is a framework, not a single model. The inflaton has never been identified, and its couplings to ordinary matter are unknown. Saying 'inflation predicts X' is only true for a specific model; the framework as a whole makes broad predictions but not sharp ones.",
 real:"The BICEP/Keck experiment hunts for primordial B-mode polarization — the swirly imprint of gravitational waves from inflation.",
 refs:[
  {a:"Baumann, Cosmology",c:"Ch. 6 — Inflation"},
  {a:"Mukhanov, Physical Foundations of Cosmology",c:"Ch. 5"},
  {a:"Weinberg, Cosmology",c:"Ch. 4 — Inflation"}
 ],
 problems:[
  "Derive the slow-roll conditions from the inflaton equation of motion and the Friedmann equation.",
  "Show that a massive scalar field V(φ) = ½m²φ² satisfies slow roll for large φ, and compute the predicted r.",
  "Explain how quantum fluctuations in the inflaton are amplified into the primordial scalar power spectrum."
 ],
 wiki:"Inflation (cosmology)",need:["bigbang","cmb"]}
);
