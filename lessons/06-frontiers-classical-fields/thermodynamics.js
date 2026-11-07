"use strict";
/* Chapter 06 · Frontiers · Classical & Fields — Thermodynamics (2 lessons) */
LESSONS.push(
{id:"potentials",f:"Thermodynamics",l:3,t:"Thermodynamic potentials",
 idea:"Different experiments hold different things fixed. Free energies are bookkeeping devices that turn “what happens at constant temperature and pressure” into a simple minimisation problem.",
 math:"G = H − TS   ·   F = U − TS",note:"H enthalpy, T temperature, S entropy, U internal energy. Spontaneous change at fixed T and p lowers G.",
 real:"Chemists predict whether a reaction will happen at room temperature by checking the sign of ΔG, not by running it.",
 wiki:"Thermodynamic potential",need:["engines"]},
{id:"phases",f:"Thermodynamics",l:3,t:"Phase transitions",
 idea:"Melting and boiling are abrupt reorganisations, not gradual changes. Near a critical point the difference between liquid and gas fades away entirely and the two become indistinguishable.",
 math:"dP/dT = L / (T ΔV)",note:"The Clausius–Clapeyron relation. L is latent heat, ΔV the volume change on crossing the boundary.",
 real:"A pressure cooker works by raising the boiling point of water to about 120 °C, so food cooks in a third of the time.",
 wiki:"Phase transition",need:["engines"]}
);
