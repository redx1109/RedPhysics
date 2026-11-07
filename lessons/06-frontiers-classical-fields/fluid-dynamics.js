"use strict";
/* Chapter 06 · Frontiers · Classical & Fields — Fluid Dynamics (1 lesson) */
LESSONS.push(
{id:"navier",f:"Fluid Dynamics",l:3,t:"The Navier–Stokes equations",
 idea:"Newton’s second law written for a tiny blob of fluid: inertia on the left, then pressure, viscosity and gravity on the right. Solving it in general is still an open problem.",
 math:"ρ(∂v/∂t + v·∇v) = −∇p + μ∇²v + ρg",note:"v is the velocity field, ∇ the spatial derivative. Each term is a force per unit volume.",
 real:"Every weather forecast, aircraft design and blood-flow simulation is a numerical attempt at this one equation.",
 wiki:"Navier–Stokes equations",need:["viscosity","calculus"]}
);
