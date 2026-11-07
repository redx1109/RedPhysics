"use strict";
/* Chapter 02 · Intermediate — Statistical Mechanics (2 lessons) */
LESSONS.push(
{id:"boltzmann",f:"Statistical Mechanics",l:2,t:"The Boltzmann distribution",
 idea:"At temperature T, high-energy states are exponentially rare. That one exponential governs reaction rates, spectral line strengths, and why water boils at 100 °C rather than 20.",
 math:"P(E) ∝ e^(−E/kT)",note:"P is the probability of a state with energy E. Doubling T roughly doubles the energy scale, so high states get much more likely.",
 real:"A 10 °C rise roughly doubles many chemical reaction rates — that is the exponential in this formula doing the work.",
 wiki:"Boltzmann distribution",need:["microstates","gas"]},
{id:"partition",f:"Statistical Mechanics",l:2,t:"Partition functions",
 idea:"One sum over all the states — the partition function — encodes every thermodynamic property of a system. Differentiate it and pressure, energy and entropy fall out.",
 math:"Z = Σ e^(−Eᵢ/kT)   ·   F = −kT ln Z",note:"Z counts the thermally accessible states, weighted. F is the Helmholtz free energy, and everything else is a derivative of it.",
 real:"Molecular simulation software computes Z to predict how a candidate drug binds, before anyone makes it in a lab.",
 wiki:"Partition function (statistical mechanics)",need:["boltzmann"]}
);
