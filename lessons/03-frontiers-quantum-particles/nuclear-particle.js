"use strict";
/* Chapter 03 · Frontiers · Quantum & Particles — Nuclear & Particle (7 lessons) */
LESSONS.push(
{id:"qft",f:"Nuclear & Particle",l:3,t:"Quantum field theory",
 idea:"Particles are not objects; they are ripples in fields that fill all of space. The vacuum is the field at rest, and an excitation of it is a particle.",
 math:"φ(x)  with quantised excitations",note:"φ is the field value at each point in spacetime. Quantising it turns smooth ripples into discrete particle counts.",
 real:"The Casimir effect — two uncharged plates in a vacuum attracting — is a measurable consequence of vacuum fields.",
 wiki:"Quantum field theory",need:["standard","hilbert"]},
{id:"feynman",f:"Nuclear & Particle",l:3,t:"Feynman diagrams & gauge symmetry",
 idea:"Each diagram is a term in a series and each vertex is a rule. Gauge symmetry is what forces the forces to exist — it is a consistency requirement, not a decoration.",
 math:"amplitude = Σ (all diagrams)",note:"Lines are particles, vertices are interactions. Each vertex contributes a factor of the coupling constant, so more vertices means a smaller term.",
 real:"The anomalous magnetic moment of the electron has been calculated to 12 digits using these diagrams and matches experiment.",
 wiki:"Feynman diagram",need:["qft","perturbation"]},
{id:"pathintegral",f:"Nuclear & Particle",l:3,t:"Path integral quantization",
 idea:"Sum a phase factor e^(iS/ħ) over every possible history of a field, and the classical path emerges as the one where phases line up. Quantum field theory is literally an infinite-dimensional integral over configurations.",
 setup:"You need the classical action (from the Lagrangian), the concept of a functional integral over field configurations, and enough Feynman-diagram familiarity to recognise the expansion.",
 formalism:"Define the generating functional Z[J] = ∫ Dφ exp(iS[φ] + i∫Jφ). Sources J are inserted to compute correlation functions. The measure Dφ is the subtle part — it is a limit of lattice path integrals and generally lacks a rigorous mathematical definition.",
 derivation:"Start with the propagator ⟨0|T φ(x)φ(y)|0⟩. Write it as a path integral. Discretise on a lattice, take the continuum limit. Expand the exponential in the interaction term — each term gives a Feynman diagram. The classical path is the stationary point of S, so it dominates in the ħ→0 limit.",
 math:"Z = ∫ Dφ  e^(iS[φ]/ħ)",
 note:"S is the action, Dφ the measure over all field configurations. Expanding in ħ recovers Feynman diagrams as saddle-point corrections.",
 pitfall:"The path integral is not a sum over physically real histories — it's a sum over formal configurations weighted by phase. Interference between them is what produces quantum behaviour. Only in the classical limit does the saddle-point contribution dominate.",
 real:"Lattice QCD evaluates this integral numerically on supercomputers — it is how we predict the proton's mass from quarks.",
 refs:[
  {a:"Peskin & Schroeder",c:"Ch. 9 — Path integrals"},
  {a:"Zee, QFT in a Nutshell",c:"Ch. I.2 — Path integrals"},
  {a:"Feynman & Hibbs",c:"Ch. 2 — The path integral"}
 ],
 problems:[
  "Derive the free-particle propagator from the path integral for a single particle.",
  "Show that the path integral reproduces the Schrödinger equation when you take the limit of small time slices.",
  "Explain why the Gaussian integral over fluctuations gives the 1/2 factors in the exponent of the one-loop effective action."
 ],
 wiki:"Path integral formulation",need:["qft","feynman"]},
{id:"renormalization",f:"Nuclear & Particle",l:3,t:"Renormalization & the RG",
 idea:"Loop integrals in QFT diverge — they blow up as the internal momentum goes to infinity. Renormalization is the systematic procedure that absorbs those infinities into a handful of measured parameters. What survives is that every coupling becomes a function of the energy scale at which you probe it, and the way it runs is a physical prediction, not bookkeeping.",
 setup:"You need path integrals (to see why loop integrals appear), Feynman rules (to write them down), and dimensional analysis (to see why the divergences are logarithmic, quadratic, or worse in specific dimensions).",
 formalism:"Introduce a momentum cutoff Λ or use dimensional regularization (d = 4 − ε). Split the bare Lagrangian into renormalized terms plus counterterms. The renormalized coupling is defined at a subtraction scale μ. The Callan–Symanzik equation enforces that physics is independent of μ.",
 derivation:"Compute a one-loop self-energy or vertex diagram. Isolate the divergent piece as 1/ε in dim reg. Absorb it into a counterterm. Demand that the renormalized Green's function be finite as ε → 0. The residual μ-dependence defines the beta function via μ ∂g/∂μ = β(g). Solve the ODE and you get g(μ).",
 math:"μ dg/dμ = β(g),   β(g) = −(g³/16π²)(11 − 2n_f/3) + O(g⁵)",
 note:"The negative sign in QCD means the coupling shrinks at high energy — asymptotic freedom.",
 pitfall:"Renormalization is not 'subtracting infinity from infinity'. The bare parameters are infinite; the renormalized ones are finite and measurable. Physically, you're trading unobservable bare quantities for observable ones — the infinities never appear in any prediction.",
 real:"The LHC relies on this daily: proton structure is defined at one scale and evolved to another using the RG equations, or every cross-section prediction would be wrong.",
 refs:[
  {a:"Peskin & Schroeder",c:"Ch. 10 — Renormalization"},
  {a:"Weinberg, QFT Vol. I",c:"Ch. 12 — Renormalization theory"},
  {a:"Zee, QFT in a Nutshell",c:"Ch. III.3 — Running couplings"}
 ],
 problems:[
  "Compute the one-loop beta function of φ⁴ theory and verify it is positive.",
  "Show that the QED beta function is positive at one loop, and explain why this prevents a Landau pole below the Planck scale.",
  "Derive the Callan–Symanzik equation from the requirement that the bare coupling is μ-independent."
 ],
 wiki:"Renormalization",need:["pathintegral","feynman"]},
{id:"gaugetheory",f:"Nuclear & Particle",l:3,t:"Non-abelian gauge theories",
 idea:"Demand that a Lagrangian be invariant under a local SU(N) transformation and you are forced to introduce gauge bosons that interact with themselves. Yang–Mills is the whole Standard Model in one sentence.",
 setup:"You need the abelian case (QED) to see the pattern: local U(1) invariance forces a massless vector field. Then extend to a non-abelian group where the generators do not commute.",
 formalism:"Introduce a Lie-algebra-valued gauge field A_μ = A_μ^a T^a. The field strength is F_μν = ∂_μ A_ν − ∂_ν A_μ + ig[A_μ, A_ν]. The +ig[A,A] term is what distinguishes Yang–Mills from Maxwell — it comes from the non-commutativity of the generators.",
 derivation:"Start with the free Dirac Lagrangian. Demand invariance under ψ → e^(iα^a(x)T^a)ψ. The derivative must become covariant: D_μ = ∂_μ − ig A_μ^a T^a. The commutator [D_μ, D_ν] defines F_μν, and the trace F_μν F^μν gives the gauge kinetic term.",
 math:"F_μν^a = ∂_μ A_ν^a − ∂_ν A_μ^a + g f^abc A_μ^b A_ν^c",
 note:"f^abc are the structure constants. The last term is what makes the theory non-abelian — gluons carry colour and therefore couple to each other.",
 pitfall:"The self-interaction of gauge bosons is not an added feature — it is forced by the symmetry. If you try to write down a mass term m² A_μ A^μ, you break gauge invariance. That is exactly why mass must come from the Higgs mechanism.",
 real:"The three-jet events seen at PETRA in 1979 were the first direct evidence that gluons self-interact.",
 refs:[
  {a:"Peskin & Schroeder",c:"Ch. 15–16 — Yang–Mills"},
  {a:"Schwartz, QFT and the SM",c:"Ch. 25 — Gauge theories"},
  {a:"Weinberg Vol. II",c:"Ch. 15 — Non-abelian gauge theories"}
 ],
 problems:[
  "Verify that the field strength F_μν transforms covariantly under a gauge transformation.",
  "Compute the gluon self-energy at one loop and verify that the beta function is negative.",
  "Show that the Ward identity of QED generalises to the Slavnov–Taylor identities of Yang–Mills."
 ],
 wiki:"Yang–Mills theory",need:["qft","hilbert"]},
{id:"higgs",f:"Nuclear & Particle",l:3,t:"Spontaneous symmetry breaking & the Higgs",
 idea:"Give a scalar field a Mexican-hat potential and the vacuum must pick a direction — the symmetry is broken by the ground state, not the Lagrangian. The gauge bosons that 'eat' the Goldstone mode become massive, which is how the W and Z get mass without violating gauge invariance.",
 setup:"You need local gauge invariance (to see why naively adding a mass term for W/Z breaks the theory) and the Goldstone theorem (massless scalars appear whenever a continuous symmetry is spontaneously broken).",
 formalism:"Start with an SU(2)×U(1) gauge theory coupled to a complex scalar doublet φ. The potential is V(φ) = −μ²|φ|² + λ|φ|⁴. The vacuum expectation value is ⟨φ⟩ = (0, v/√2) with v = √(μ²/λ) ≈ 246 GeV.",
 derivation:"Expand φ around its vev: φ = ⟨φ⟩ + h. The kinetic term (D_μ φ)†(D^μ φ) generates a mass term for the gauge fields proportional to g²v²/4. The three Goldstone modes become the longitudinal polarizations of W⁺, W⁻, Z⁰. The remaining scalar h is the physical Higgs boson, with mass m_h = √(2λ) v.",
 math:"M_W = ½ g v,   M_Z = ½ √(g² + g′²) v,   m_H = √(2λ) v",
 note:"v ≈ 246 GeV is fixed by the Fermi constant. The ratio M_W/M_Z = cos θ_W is a tree-level prediction of the Standard Model.",
 pitfall:"The Higgs does not 'give mass' by some mysterious touch. It gives mass through the interaction term between the scalar and the gauge fields — the mass is the coefficient of A_μ A^μ in the Lagrangian after symmetry breaking. Fermions get mass through Yukawa couplings to the same scalar.",
 real:"Without the Higgs, the weak force bosons would be massless, and the weak force would be as long-ranged as electromagnetism — which would make beta decay impossible.",
 refs:[
  {a:"Peskin & Schroeder",c:"Ch. 20 — Spontaneous symmetry breaking"},
  {a:"Schwartz, QFT and the SM",c:"Ch. 28 — The Higgs mechanism"},
  {a:"Griffiths, Introduction to Elementary Particles",c:"Ch. 10"}
 ],
 problems:[
  "Verify that the photon remains massless after SU(2)×U(1) breaking, and identify the combination of gauge fields that becomes the physical photon.",
  "Compute the tree-level relation between M_W, M_Z, and the weak mixing angle θ_W.",
  "Show that the Goldstone boson is 'eaten' by the gauge field by explicitly gauge-transforming away the Goldstone mode."
 ],
 wiki:"Higgs mechanism",need:["gaugetheory","standard"]},
{id:"adscft",f:"Nuclear & Particle",l:3,t:"The AdS/CFT correspondence",
 idea:"A gravitational theory in (d+1)-dimensional anti-de Sitter space is exactly equivalent to a conformal field theory on its d-dimensional boundary. Two very different descriptions of the same physics — and one is often much easier.",
 setup:"You need classical general relativity (to see what the AdS solution looks like) and CFT basics (what a conformal field theory is, what its operators are). The match between Isometries of AdS and the conformal group of the boundary is the geometric clue.",
 formalism:"AdS_(d+1) is the maximally symmetric solution of Einstein's equations with negative cosmological constant. Its isometry group is SO(2,d), which is precisely the conformal group of d-dimensional Minkowski space. The holographic dictionary states that a bulk field φ with mass m is dual to a boundary operator O with dimension Δ satisfying Δ(Δ−d) = m²L².",
 derivation:"Start with the AdS metric in Poincaré coordinates. Identify the asymptotic boundary at z = 0. Take a bulk field φ(z,x) with action S_bulk. Show that the on-shell action reduces to a boundary term evaluated at z = ε. Take ε → 0. The result is the generating functional of the boundary CFT with the boundary value φ₀(x) playing the role of a source.",
 math:"Z_gravity[φ_boundary] = ⟨e^(∫ φ₀ O)⟩_CFT",
 note:"φ is a bulk field; φ₀ its boundary value; O the dual CFT operator. Strongly coupled field theories map to weakly coupled gravity.",
 pitfall:"AdS/CFT is a duality, not a derivation from known principles. It holds for a specific pair (type IIB string theory on AdS₅×S⁵ and N=4 SYM in 4D). Generalisations are conjectural, and the mapping between bulk quantities and boundary observables is only partially understood.",
 real:"AdS/CFT has been used to model quark-gluon plasma and even aspects of high-T_c superconductivity, both strongly-coupled systems.",
 refs:[
  {a:"Maldacena, Adv. Theor. Math. Phys. 2, 231 (1998)",c:"The original AdS/CFT paper"},
  {a:"Ammon & Erdmenger, Gauge/Gravity Duality",c:"Ch. 5 — The dictionary"},
  {a:"Natsuume, AdS/CFT Duality in Condensed Matter Physics",c:"Ch. 2–3"}
 ],
 problems:[
  "Verify that the isometry group of AdS_(d+1) is SO(2,d).",
  "Derive the mass-dimension relation Δ(Δ−d) = m²L² for a scalar field in AdS.",
  "Show that the two-point function of a boundary operator dual to a bulk scalar has the power-law form ⟨OO⟩ ~ 1/|x−y|^(2Δ)."
 ],
 wiki:"AdS/CFT correspondence",need:["qft","rg"]}
);
