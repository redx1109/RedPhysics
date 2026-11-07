"use strict";
/* Chapter 05 · Frontiers · Matter & Many Bodies — Condensed Matter (4 lessons) */
LESSONS.push(
{id:"superconductivity",f:"Condensed Matter",l:3,t:"Superconductivity",
 idea:"Below a critical temperature, electrons pair up and flow with exactly zero resistance. The pairs form a single quantum state spread across the whole material.",
 math:"T < T_c  ⇒  R = 0",note:"T_c is the critical temperature. The pairs (Cooper pairs) cannot scatter one at a time, so there is nothing to resist.",
 real:"MRI scanners use superconducting coils cooled with liquid helium, because only zero resistance gives a strong enough steady field.",
 wiki:"Superconductivity",need:["semiconductors","quantumstats"]},
{id:"bcs",f:"Condensed Matter",l:3,t:"BCS theory of superconductivity",
 idea:"Electrons attract through a phonon-mediated interaction. Below T_c, they form Cooper pairs that condense into a single macroscopic quantum state — and a gap opens up that forbids scattering.",
 setup:"You need second quantization (to write down the pairing Hamiltonian), the Fermi gas (to see what a Fermi surface looks like), and the idea of a coherent state (to see what the condensate actually is).",
 formalism:"Start with the electron-phonon interaction. Integrate out the phonons to get an effective electron-electron attraction. That attractive interaction (however weak) makes the Fermi sea unstable — Cooper's theorem. Write down the reduced BCS Hamiltonian with the pairing interaction. Solve it with a mean-field ansatz for the pairing amplitude Δ.",
 derivation:"Take the BCS Hamiltonian. Introduce Δ = V ∑⟨c_−k↓ c_k↑⟩ as a mean-field parameter. Diagonalise the mean-field Hamiltonian with a Bogoliubov transformation. The quasiparticle dispersion becomes E_k = √(ε_k² + Δ²), which has a gap of 2Δ. Self-consistency gives the gap equation. Solve it at T=0 to get Δ = 2ħω_D exp(−1/N(E_F)V).",
 math:"Δ = 2 ħ ω_D e^(−1/(N(E_F)V))",
 note:"Δ is the gap, ω_D the Debye frequency, N(E_F) the density of states at the Fermi level, V the pairing strength. The exponential is why T_c is so hard to raise.",
 pitfall:"The pairs are not molecules. Cooper pairs are overlapping, with a coherence length ξ ~ ħv_F/Δ that is much larger than the interparticle spacing. The condensate is a coherent superposition of pair states, not a collection of local dimers.",
 real:"The 1986 discovery of cuprate superconductors broke the BCS ceiling and launched high-T_c research — still unsolved.",
 refs:[
  {a:"Tinkham, Introduction to Superconductivity",c:"Ch. 3 — BCS theory"},
  {a:"Abrikosov, Gorkov & Dzyaloshinski",c:"Ch. 7 — BCS theory"},
  {a:"Annett, Superconductivity, Superfluids and Condensates",c:"Ch. 5"}
 ],
 problems:[
  "Derive the BCS gap equation from the mean-field Hamiltonian.",
  "Show that the specific heat jumps at T_c, and compute the ratio ΔC/C_n.",
  "Explain why the Meissner effect requires a gapless mode of the gauge field, and how the Anderson–Higgs mechanism provides it."
 ],
 wiki:"BCS theory",need:["superconductivity","quantumstats"]},
{id:"topological",f:"Condensed Matter",l:3,t:"Topological phases & the quantum Hall effect",
 idea:"Some phases of matter cannot be distinguished by any local order parameter — only by a global topological invariant. Their edges conduct while their bulk is insulating, and that edge current is protected against disorder.",
 setup:"You need band theory (to see what an insulator is), Berry phase (to see where the topological invariant comes from), and the quantum Hall effect as a motivating example.",
 formalism:"For a band insulator, the wavefunction |u_n(k)⟩ is defined up to phase at each k. The Berry connection A_n(k) = i⟨u_n|∇_k|u_n⟩ is gauge-dependent, but its curl — the Berry curvature Ω_n — is gauge-invariant. The integral of Ω over the Brillouin zone, summed over occupied bands, gives the Chern number ν ∈ ℤ.",
 derivation:"Take the Chern number as the topological invariant. Show that it is quantised (it can only change by an integer when the Hamiltonian crosses a gap-closing point). Relate it to the transverse conductivity via the Kubo formula: σ_xy = ν e²/h. The bulk-boundary correspondence then guarantees gapless edge states.",
 math:"σ_xy = ν e² / h,  ν ∈ ℤ",
 note:"ν is the Chern number, a topological invariant of the band structure. Integer quantum Hall gives ν = 1, 2, 3… regardless of sample details.",
 pitfall:"Topological protection does not mean 'impossible to break'. It means the edge states cannot be removed by small perturbations, because doing so would require closing the bulk gap. Strong enough perturbations that close the gap destroy the phase.",
 real:"Topological insulators and quantum spin Hall materials are the experimental descendants — physics Nobel 2016 for Thouless, Haldane and Kosterlitz.",
 refs:[
  {a:"Bernevig & Hughes, Topological Insulators",c:"Ch. 2–3"},
  {a:"Asboth, Oroszlany & Pályi",c:"Ch. 3 — Berry phase and Chern number"},
  {a:"Hasan & Kane, Rev. Mod. Phys. 82, 3045 (2010)",c:"Colloquium on topological insulators"}
 ],
 problems:[
  "Compute the Chern number for a two-band model with a tunable mass term, and show where the topological transition occurs.",
  "Derive the bulk-boundary correspondence for the integer quantum Hall effect using the Laughlin argument.",
  "Show that the Z₂ invariant in a 2D time-reversal-invariant topological insulator reduces to the Chern number in the presence of spin conservation."
 ],
 wiki:"Topological insulator",need:["crystals","quantumstats","hilbert"]},
{id:"manybody",f:"Condensed Matter",l:3,t:"Many-body theory & Green's functions",
 idea:"Instead of tracking 10²³ electrons, track the response of one electron to the presence of all the others. Green's functions encode that response, and Dyson's equation sums the interactions systematically.",
 setup:"You need second quantization, the concept of a quasiparticle (a dressed electron), and some familiarity with Feynman diagrams (the same graphical rules, but at finite density).",
 formalism:"The single-particle Green's function G(k,ω) = ⟨⟨c_k; c_k†⟩⟩ is the propagator of an electron with momentum k and energy ω. Its spectral function A(k,ω) = −(1/π) Im G(k,ω) encodes the quasiparticle dispersion and lifetime. The self-energy Σ(k,ω) is everything the electron feels from the medium, and Dyson's equation resums it: G = G₀ + G₀ΣG.",
 derivation:"Start with the non-interacting G₀. Introduce the interaction term in the Hamiltonian. Expand G order by order in the interaction. Resum the terms into a self-energy Σ. Solve Dyson's equation. The poles of G give the quasiparticle dispersion, and the width of the poles gives the lifetime.",
 math:"G(k,ω) = 1 / (ω − ε_k − Σ(k,ω))",
 note:"Σ is the self-energy: everything the electron feels from the medium. Poles of G give the quasiparticle dispersion and lifetime.",
 pitfall:"The spectral function A(k,ω) does not have to be a sharp delta function. In a strongly correlated system, the quasiparticle peak can carry only a fraction of the spectral weight — the rest is in a broad incoherent background. That's not a bug, it's the physics of strong correlation.",
 real:"ARPES directly measures G(k,ω) — photoemission is the experimental face of many-body theory.",
 refs:[
  {a:"Mahan, Many-Particle Physics",c:"Ch. 3 — Green's functions"},
  {a:"Fetter & Walecka",c:"Ch. 3 — Green's functions at finite density"},
  {a:"Bruus & Flensberg",c:"Ch. 5 — Many-body theory"}
 ],
 problems:[
  "Derive the spectral representation of G(k,ω) and show that it is positive-definite.",
  "Compute the electron self-energy due to electron-phonon coupling and identify the phonon emission threshold.",
  "Show that the Dyson equation for G reduces to the BCS gap equation when the self-energy has a superconducting pairing component."
 ],
 wiki:"Green's function (many-body theory)",need:["quantumstats","feynman"]}
);
