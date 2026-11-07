"use strict";
/* Chapter 01 · Basic — Electricity & Magnetism (2 lessons) */
LESSONS.push(
{id:"charge",f:"Electricity & Magnetism",l:1,t:"Charge & Coulomb’s law",
 idea:"Electric charge comes in two signs, like charges repel, and the force follows the same inverse-square shape as gravity — but is about 10³⁶ times stronger, which is why matter holds together at all.",
 math:"F = k q₁q₂ / r²",note:"k is Coulomb’s constant (9×10⁹ N·m²/C²), q the charges in coulombs, r the separation. Negative F means attraction.",
 real:"Static cling happens because rubbing transfers electrons, and that tiny imbalance beats gravity on a scrap of paper.",
 wiki:"Coulomb's law",need:["vectors","newton"]},
{id:"circuits",f:"Electricity & Magnetism",l:1,t:"Circuits & Ohm’s law",lab:"circuit",
 idea:"Voltage is the push, current is the flow, resistance is the friction. In series the current is shared; in parallel the voltage is — and that single distinction solves most circuits.",
 math:"V = IR   ·   P = VI",note:"V in volts, I in amps, R in ohms. P is the power turned into heat, in watts.",
 real:"Your house is wired in parallel so each socket gets the full 230 V and switching one lamp off does not kill the rest.",
 wiki:"Ohm's law",need:["charge","energy"]}
);
