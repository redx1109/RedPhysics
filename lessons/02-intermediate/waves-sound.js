"use strict";
/* Chapter 02 · Intermediate — Waves & Sound (3 lessons) */
LESSONS.push(
{id:"interference",f:"Waves & Sound",l:2,t:"Superposition & interference",lab:"waves",
 idea:"Waves add. Crest on crest gives double height; crest on trough cancels to nothing. Steady patterns of both make the fringes you see in ripples, soap films and double-slit light.",
 math:"Δ = r₂ − r₁ = mλ   (bright)",note:"Δ is the extra distance one wave travels. Whole wavelengths arrive in step and reinforce; half wavelengths cancel.",
 real:"Noise-cancelling headphones generate an inverted copy of the ambient sound so the two waves cancel at your ear.",
 wiki:"Interference (wave propagation)",need:["waveprops"]},
{id:"standing",f:"Waves & Sound",l:2,t:"Standing waves & resonance",
 idea:"Trap a wave between two boundaries and only certain wavelengths fit. Those are the resonant frequencies — the notes of a guitar string, the modes of a laser cavity.",
 math:"λₙ = 2L/n   ·   fₙ = nv/2L",note:"L is the length of the cavity and n a whole number. More nodes means a shorter wavelength and a higher note.",
 real:"A microwave oven's turntable exists because standing waves leave hot and cold spots a few centimetres apart.",
 wiki:"Standing wave",need:["interference"]},
{id:"doppler",f:"Waves & Sound",l:2,t:"The Doppler effect",
 idea:"Motion toward you squeezes the waves and raises the pitch; motion away stretches them and lowers it. Police radar, ultrasound scans and cosmological redshift all use this one equation.",
 math:"f′ = f (v ± v_o)/(v ∓ v_s)",note:"v is the wave speed, v_o the observer’s, v_s the source’s. Signs chosen so approaching raises the pitch.",
 real:"An ambulance siren audibly drops in pitch the instant it passes you — that is the sign flipping in this formula.",
 wiki:"Doppler effect",need:["sound"]}
);
