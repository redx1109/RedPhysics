"use strict";
/* Chapter 02 · Intermediate — Fluid Dynamics (2 lessons) */
LESSONS.push(
{id:"bernoulli",f:"Fluid Dynamics",l:2,t:"Flow & Bernoulli’s principle",
 idea:"Where a fluid speeds up, its pressure drops — because the energy has to come from somewhere. That one idea explains aerofoils, carburettors, and why a shower curtain gets sucked in.",
 math:"p + ½ρv² + ρgh = constant",note:"Three energies per unit volume: pressure, motion, height. Along a streamline their sum never changes.",
 real:"An atomiser sprays perfume because fast air across the top of a tube lowers the pressure and pulls liquid up.",
 wiki:"Bernoulli's principle",need:["pressure","energy"]},
{id:"viscosity",f:"Fluid Dynamics",l:2,t:"Viscosity & turbulence",
 idea:"Real fluids resist sliding, and past a certain speed smooth flow shatters into swirls. The Reynolds number tells you which regime you are in before you build anything.",
 math:"Re = ρ v D / μ",note:"ρ density, v speed, D pipe diameter, μ viscosity. Low Re is syrupy and smooth; high Re is chaotic.",
 real:"Aircraft are tested in wind tunnels at matched Reynolds numbers so a 1:20 model behaves like the real wing.",
 wiki:"Reynolds number",need:["bernoulli"]}
);
