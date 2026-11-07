"use strict";
/* Chapter 01 · Basic — Statistical Mechanics (2 lessons) */
LESSONS.push(
{id:"probability",f:"Statistical Mechanics",l:1,t:"Probability & randomness",
 idea:"With 10²³ particles you cannot track any of them, but you can say how likely each arrangement is. Physics turns into statistics — and the averages become exact.",
 math:"⟨A⟩ = Σ Aᵢ Pᵢ",note:"⟨A⟩ is the expected value, Aᵢ each possible outcome, Pᵢ its probability. The probabilities must sum to 1.",
 real:"Casinos make money from exactly this: each spin is random, but a million spins is a certainty.",
 wiki:"Probability theory",need:["notation"]},
{id:"microstates",f:"Statistical Mechanics",l:1,t:"Microstates & entropy",
 idea:"One macrostate — a temperature and pressure — can be made of astronomically many microstates. Entropy is the logarithm of that count, which is why it always tends to increase.",
 math:"S = k_B ln W",note:"k_B is Boltzmann’s constant, W the number of microstates. Logarithm because counts multiply while entropy adds.",
 real:"A shuffled deck is not “more disordered” than a sorted one by physics — it just has 10⁶⁸ arrangements and only one sorted order.",
 wiki:"Entropy (statistical thermodynamics)",need:["probability","laws"]}
);
