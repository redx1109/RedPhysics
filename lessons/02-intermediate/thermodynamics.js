"use strict";
/* Chapter 02 · Intermediate — Thermodynamics (2 lessons) */
LESSONS.push(
{id:"laws",f:"Thermodynamics",l:2,t:"The laws of thermodynamics",
 idea:"Energy is conserved — that is the first law. Disorder always increases overall — that is the second. The second law is why engines cannot be perfect, and why time seems to run one way.",
 math:"ΔU = Q − W   ·   ΔS ≥ 0",note:"U is internal energy, Q heat in, W work out. S is entropy, and in any real process it rises.",
 real:"You cannot un-fry an egg. The second law is the only fundamental law of physics that cares which direction time points.",
 wiki:"Second law of thermodynamics",need:["gas"]},
{id:"engines",f:"Thermodynamics",l:2,t:"Entropy & heat engines",
 idea:"An engine turns a temperature difference into work, and the second law caps how much of that heat you can ever convert. The cap depends only on the two temperatures, not on the cleverness of the design.",
 math:"η ≤ 1 − T_c/T_h",note:"η is efficiency, T_c and T_h the cold and hot reservoir temperatures in kelvin. Carnot’s limit is unreachable in practice.",
 real:"A car engine tops out near 35 % efficient; the rest leaves as hot exhaust and coolant, exactly as Carnot predicts.",
 wiki:"Heat engine",need:["laws"]}
);
