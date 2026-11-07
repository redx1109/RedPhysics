"use strict";
/* Chapter 02 · Intermediate — Electricity & Magnetism (3 lessons) */
LESSONS.push(
{id:"fields",f:"Electricity & Magnetism",l:2,t:"Electric fields & potential",
 idea:"A charge fills the space around it with a field. Other charges feel that field locally, and sliding along it trades potential energy for kinetic — exactly like a ball rolling downhill.",
 math:"E = F/q   ·   V = kq/r",note:"E is force per unit charge (a vector), V is potential energy per unit charge (a scalar). E points downhill in V.",
 real:"Lightning is air breaking down at about 3 million volts per metre — roughly 3000 V across your height.",
 wiki:"Electric potential",need:["charge"]},
{id:"magnetism",f:"Electricity & Magnetism",l:2,t:"Magnetism",
 idea:"Moving charges create magnetic fields, and magnetic fields push moving charges sideways. That one loop explains motors, compasses, MRI scanners and the aurora.",
 math:"F = q v × B",note:"The cross product means the force is perpendicular to both the velocity and the field. A charge at rest feels nothing.",
 real:"The aurora happens when solar-wind particles spiral along Earth's magnetic field lines into the polar atmosphere.",
 wiki:"Magnetic field",need:["fields","circuits"]},
{id:"induction",f:"Electricity & Magnetism",l:2,t:"Faraday induction",
 idea:"Change a magnetic field through a loop and you get a voltage. This is how every generator, transformer and induction hob works — and how Maxwell noticed that light might be electromagnetic.",
 math:"ε = − dΦ_B/dt",note:"ε is the induced voltage, Φ_B the magnetic flux through the loop. The minus sign is Lenz’s law: nature pushes back.",
 real:"An induction hob heats the pan but not the glass, because the changing field only makes current in metal.",
 wiki:"Faraday's law of induction",need:["magnetism"]}
);
