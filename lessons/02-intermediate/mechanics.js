"use strict";
/* Chapter 02 · Intermediate — Mechanics (3 lessons) */
LESSONS.push(
{id:"energy",f:"Mechanics",l:2,t:"Work, energy & momentum",
 idea:"Energy is a currency that changes form but never vanishes; momentum is mass times velocity and is conserved in every collision. Both let you skip the messy details of the path and compare only the endpoints.",
 math:"KE = ½mv²   ·   p = mv   ·   W = Fd cos θ",note:"KE is energy of motion, p is momentum, W is work: force times distance moved along that force.",
 real:"Crumple zones, airbags and bike helmets all extend the collision distance so that W = Fd needs a smaller F.",
 wiki:"Conservation of energy",need:["newton","calculus"]},
{id:"shm",f:"Mechanics",l:2,t:"Oscillations & simple harmonic motion",lab:"pendulum",
 idea:"Any system with a stable resting point and a restoring force will oscillate. Pull it back, let go, and the mathematics is a sine wave — whether it is a pendulum, a spring or a molecule.",
 math:"T = 2π √(L/g)   ·   T = 2π √(m/k)",note:"T is one full cycle in seconds. The pendulum version only holds for small swings — which the lab lets you break.",
 real:"Quartz watches keep time because a tuning-fork-shaped crystal rings at 32 768 Hz — that number is exactly 2¹⁵.",
 wiki:"Simple harmonic motion",need:["energy","calculus"]},
{id:"rotation",f:"Mechanics",l:2,t:"Rotation & torque",
 idea:"Rotation is ordinary motion measured around an axis. Force becomes torque, mass becomes moment of inertia, and every equation looks exactly like its straight-line twin.",
 math:"τ = Iα   ·   L = Iω",note:"τ is torque (force × lever arm), I is moment of inertia, α is angular acceleration, L is angular momentum.",
 real:"A figure skater pulling her arms in reduces I, so ω must rise — that is why the spin speeds up without any push.",
 wiki:"Torque",need:["newton","vectors"]}
);
