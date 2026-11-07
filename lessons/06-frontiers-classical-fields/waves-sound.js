"use strict";
/* Chapter 06 · Frontiers · Classical & Fields — Waves & Sound (2 lessons) */
LESSONS.push(
{id:"fourier",f:"Waves & Sound",l:3,t:"Fourier analysis",
 idea:"Any shape of wave at all can be built from pure sines added together. That is why a complicated sound can be described by a spectrum — and why filtering, compression and noise cancelling work.",
 math:"f(t) = Σ aₙ sin(nωt + φₙ)",note:"aₙ is how much of each harmonic is present, ω the base frequency, φₙ a phase offset for each.",
 real:"Every MP3 is this idea in reverse: throw away the harmonics you cannot hear, store the rest.",
 wiki:"Fourier analysis",need:["standing","calculus"]},
{id:"dispersion",f:"Waves & Sound",l:3,t:"Dispersion & wave packets",
 idea:"When speed depends on wavelength, a bundle of waves smears out as it travels. This is why a prism splits light and why a fibre-optic pulse blurs over a long cable.",
 math:"v_g = dω/dk",note:"v_g is the group velocity — the speed the packet moves at, which can differ from the speed of the crests.",
 real:"A prism makes a rainbow because violet light slows more than red inside glass, so it bends through a bigger angle.",
 wiki:"Dispersion relation",need:["fourier"]}
);
