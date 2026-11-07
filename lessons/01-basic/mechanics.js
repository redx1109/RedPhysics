"use strict";
/* Chapter 01 · Basic — Mechanics (3 lessons) */
LESSONS.push(
{id:"kinematics",f:"Mechanics",l:1,t:"Motion in a straight line",
 idea:"Describe motion before explaining it. Position, velocity and acceleration are three numbers where each one measures how fast the one before it changes. Get these straight and most confusion evaporates.",
 math:"v = v₀ + at   ·   x = v₀t + ½at²",note:"v₀ is the starting speed, a the acceleration, t the elapsed time. These two only hold when a is constant.",
 real:"A 0–60 mph time is just these two equations with a solved for: about 3.9 m/s² for a decent family car.",
 wiki:"Kinematics",need:["calculus","vectors"]},
{id:"newton",f:"Mechanics",l:1,t:"Forces & Newton’s laws",
 idea:"A force is a push or a pull, and the net force decides the acceleration. Things do not need a force to keep moving — they need one to change how they are moving. That single inversion took two thousand years.",
 math:"ΣF = ma",note:"Σ means “add them all up, as vectors”. Mass m resists acceleration; the net force is what is left after cancellation.",
 real:"A seatbelt works by stretching the time over which your momentum changes — same Δp, longer Δt, smaller force.",
 wiki:"Newton's laws of motion",need:["vectors"]},
{id:"projectile",f:"Mechanics",l:1,t:"Projectiles",lab:"projectile",
 idea:"Throw something and gravity only pulls downward. The horizontal motion is untouched while the vertical motion accelerates, so the two can be solved separately — and the path comes out a parabola.",
 math:"R = v² sin 2θ / g   ·   H = v² sin²θ / 2g",note:"R is the range, H the peak height, θ the launch angle, v the launch speed, g the local gravity. Max range at 45°.",
 real:"Basketball free throws are aimed at about 45–52°, near the angle that needs the least speed for the distance.",
 wiki:"Projectile motion",need:["kinematics","newton"]}
);
