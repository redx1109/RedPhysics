(function(){
"use strict";
var $=function(s,r){return (r||document).querySelector(s)};
var $$=function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))};
var MONO='"IBM Plex Mono",ui-monospace,monospace';
var clamp=function(x,a,b){return Math.min(b,Math.max(a,x))};
var TAU=Math.PI*2,DEG=Math.PI/180;
var f=function(x,d){return Number(x).toFixed(d==null?2:d)};
var esc=function(s){return String(s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})};
var PLANETS=[["Earth",9.81],["Moon",1.62],["Mars",3.71],["Jupiter",24.79]];
var RM=window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches;

/* =========================================================
   LESSON DATA
   f = track, l = level (0 foundations, 1 basic, 2 intermediate, 3 advanced)
   need = prerequisite lesson ids, real = real-world hook, wiki = API title
   ========================================================= */
var LESSONS=[
/* ---------- FOUNDATIONS ---------- */
{id:"units",f:"Foundations",l:0,t:"Units & sanity checks",
 idea:"Physics begins with measurement: every quantity is a number with a unit attached. Units must balance on both sides of an equation, so a wrong unit almost always means a wrong answer — and you can catch it before you finish the algebra.",
 math:"[left] = [right]",note:"Square brackets mean “the units of”. Treat units like algebra: m/s × s = m, and m/s × s² = m.",
 real:"NASA's Mars Climate Orbiter burned up in 1999 because one team worked in pound-seconds and the other in newton-seconds.",
 wiki:"Dimensional analysis",need:[]},
{id:"notation",f:"Foundations",l:0,t:"Scientific notation & scale",
 idea:"Physics runs from 10⁻¹⁵ m (a proton) to 10²⁶ m (the observable universe). Writing numbers as a × 10ⁿ keeps the size and the digits separate, so you can compare a nucleus to a galaxy without counting zeros.",
 math:"a × 10ⁿ,  1 ≤ a < 10",note:"Multiply: add the exponents. Divide: subtract. To add, match the exponents first.",
 real:"A single drop of water holds about 1.7 × 10²¹ molecules — more than the number of stars in the sky you can see.",
 wiki:"Scientific notation",need:["units"]},
{id:"graphs",f:"Foundations",l:0,t:"Slope and area under a graph",
 idea:"A graph is a machine for turning shapes into meaning. The slope tells you how fast something changes; the area underneath tells you how much has piled up. Almost every formula in this course is one of those two moves.",
 math:"slope = Δy / Δx   ·   area = Σ y Δx",note:"Δ means “change in”. A steep line is a fast change; the area is a sum of thin rectangles.",
 real:"A car's odometer is the area under its speedometer graph. The speedometer itself is the slope of the odometer.",
 wiki:"Slope",need:["units"]},
{id:"vectors",f:"Foundations",l:0,t:"Vectors & components",
 idea:"Some quantities are just a size (temperature); others carry a direction too (force, velocity). A vector is an arrow, and any arrow splits into a sideways part and an upward part that add back to the original.",
 math:"A = √(Aₓ² + A_y²)   ·   tan θ = A_y / A_x",note:"Aₓ = A cos θ and A_y = A sin θ. Components add separately — that is the whole trick.",
 real:"A plane pointing north but flying in a crosswind lands somewhere east of north. Pilots add the two vectors before takeoff.",
 wiki:"Euclidean vector",need:["graphs"]},
{id:"algebra",f:"Foundations",l:0,t:"Rearranging & proportional reasoning",
 idea:"Most problems are one equation rearranged. Better still, most questions can be answered without numbers at all: if y = kx², doubling x multiplies y by four. Knowing how a formula scales is often enough.",
 math:"y = k xⁿ  ⇒  y₂ / y₁ = (x₂ / x₁)ⁿ",note:"n = 1 straight, n = 2 square, n = −1 inverse, n = −2 inverse square. Identify n and you know the trend.",
 real:"Stopping distance goes as the square of speed. Double your speed and you need four times the road to stop.",
 wiki:"Proportionality (mathematics)",need:["notation"]},
{id:"calculus",f:"Foundations",l:0,t:"Rates of change",
 idea:"Velocity is how fast position changes; acceleration is how fast velocity changes. Calculus is just the language for “how fast does this change”, plus its inverse: “how much has accumulated”.",
 math:"v = dx/dt   ·   a = dv/dt   ·   x = ∫ v dt",note:"d/dt means “rate of change of”. The integral is the area under the graph — the idea you already met.",
 real:"A phone's accelerometer measures d²x/dt² directly, then integrates twice to draw your route on a map.",
 wiki:"Derivative",need:["graphs"]},

/* ---------- MECHANICS ---------- */
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
 wiki:"Projectile motion",need:["kinematics","newton"]},
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
 wiki:"Torque",need:["newton","vectors"]},
{id:"orbits",f:"Mechanics",l:3,t:"Gravity & orbits",lab:"orbit",
 idea:"An orbit is falling that keeps missing. The same inverse-square pull that drops an apple bends a planet’s path into a closed loop — provided it is not moving too fast to be caught.",
 math:"F = GMm/r²   ·   v_circ = √(GM/r)",note:"G is the gravitational constant, M the central mass, r the separation. Escape speed is √2 times the circular speed.",
 real:"GPS satellites fly at about 3.87 km/s — one-seventh of escape speed, which is why they stay in orbit rather than leaving.",
 wiki:"Orbital mechanics",need:["energy","rotation"]},
{id:"lagrange",f:"Mechanics",l:3,t:"Lagrangian mechanics",
 idea:"Instead of tracking every force, write down the energy and let one rule — least action — generate the motion for you. Same physics, far less bookkeeping, and it survives any choice of coordinates.",
 math:"L = T − V   ·   d/dt(∂L/∂q̇) = ∂L/∂q",note:"T is kinetic energy, V potential, q any coordinate you like. The equation falls out of differentiating one function.",
 real:"Robot arm controllers use Lagrangian dynamics because joint angles are far easier coordinates than cartesian forces.",
 wiki:"Lagrangian mechanics",need:["energy","calculus"]},
{id:"chaos",f:"Mechanics",l:3,t:"Chaos & nonlinear dynamics",
 idea:"Some systems obey exact laws yet cannot be predicted far ahead, because tiny differences grow exponentially. Deterministic and predictable are not the same word.",
 math:"xₙ₊₁ = r xₙ (1 − xₙ)",note:"The logistic map. For r above about 3.57 the sequence never repeats, yet comes from a one-line rule.",
 real:"Weather models lose accuracy after about ten days — not because the equations are wrong, but because the atmosphere is chaotic.",
 wiki:"Chaos theory",need:["shm","calculus"]},

/* ---------- FLUIDS ---------- */
{id:"pressure",f:"Fluid Dynamics",l:1,t:"Pressure & buoyancy",
 idea:"A fluid pushes in every direction, and deeper means more push. Anything submerged is pushed up by exactly the weight of the fluid it displaced — which is why a steel ship floats.",
 math:"p = F/A   ·   F_b = ρ V g",note:"p is force per area, ρ is fluid density, V the displaced volume. Pressure depends on depth, not on the shape of the container.",
 real:"A submarine controls its depth by pumping water in and out of ballast tanks, changing V and therefore F_b.",
 wiki:"Buoyancy",need:["newton"]},
{id:"bernoulli",f:"Fluid Dynamics",l:2,t:"Flow & Bernoulli’s principle",
 idea:"Where a fluid speeds up, its pressure drops — because the energy has to come from somewhere. That one idea explains aerofoils, carburettors, and why a shower curtain gets sucked in.",
 math:"p + ½ρv² + ρgh = constant",note:"Three energies per unit volume: pressure, motion, height. Along a streamline their sum never changes.",
 real:"An atomiser sprays perfume because fast air across the top of a tube lowers the pressure and pulls liquid up.",
 wiki:"Bernoulli's principle",need:["pressure","energy"]},
{id:"viscosity",f:"Fluid Dynamics",l:2,t:"Viscosity & turbulence",
 idea:"Real fluids resist sliding, and past a certain speed smooth flow shatters into swirls. The Reynolds number tells you which regime you are in before you build anything.",
 math:"Re = ρ v D / μ",note:"ρ density, v speed, D pipe diameter, μ viscosity. Low Re is syrupy and smooth; high Re is chaotic.",
 real:"Aircraft are tested in wind tunnels at matched Reynolds numbers so a 1:20 model behaves like the real wing.",
 wiki:"Reynolds number",need:["bernoulli"]},
{id:"navier",f:"Fluid Dynamics",l:3,t:"The Navier–Stokes equations",
 idea:"Newton’s second law written for a tiny blob of fluid: inertia on the left, then pressure, viscosity and gravity on the right. Solving it in general is still an open problem.",
 math:"ρ(∂v/∂t + v·∇v) = −∇p + μ∇²v + ρg",note:"v is the velocity field, ∇ the spatial derivative. Each term is a force per unit volume.",
 real:"Every weather forecast, aircraft design and blood-flow simulation is a numerical attempt at this one equation.",
 wiki:"Navier–Stokes equations",need:["viscosity","calculus"]},

/* ---------- WAVES ---------- */
{id:"waveprops",f:"Waves & Sound",l:1,t:"What a wave actually is",
 idea:"A wave carries energy without carrying matter. Only the pattern travels; the medium just wobbles in place and passes the disturbance along.",
 math:"v = f λ",note:"v is the speed of the pattern, f the frequency in hertz, λ the wavelength in metres. Change the medium, and v and λ change but f does not.",
 real:"A stadium wave is exactly this: no person moves seats, but the pattern circles the ground.",
 wiki:"Wave",need:["shm"]},
{id:"sound",f:"Waves & Sound",l:1,t:"Sound, pitch & loudness",
 idea:"Sound is pressure rippling through air. Frequency is pitch, amplitude is loudness, and it needs a medium — no air, no sound, which is why space is silent.",
 math:"v ≈ 343 m/s in air at 20 °C",note:"Faster in warmer air and much faster in water or steel, because stiffer media spring back harder.",
 real:"Thunder arrives after lightning because light takes microseconds to reach you while sound takes about 3 seconds per kilometre.",
 wiki:"Sound",need:["waveprops","pressure"]},
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
 wiki:"Doppler effect",need:["sound"]},
{id:"fourier",f:"Waves & Sound",l:3,t:"Fourier analysis",
 idea:"Any shape of wave at all can be built from pure sines added together. That is why a complicated sound can be described by a spectrum — and why filtering, compression and noise cancelling work.",
 math:"f(t) = Σ aₙ sin(nωt + φₙ)",note:"aₙ is how much of each harmonic is present, ω the base frequency, φₙ a phase offset for each.",
 real:"Every MP3 is this idea in reverse: throw away the harmonics you cannot hear, store the rest.",
 wiki:"Fourier analysis",need:["standing","calculus"]},
{id:"dispersion",f:"Waves & Sound",l:3,t:"Dispersion & wave packets",
 idea:"When speed depends on wavelength, a bundle of waves smears out as it travels. This is why a prism splits light and why a fibre-optic pulse blurs over a long cable.",
 math:"v_g = dω/dk",note:"v_g is the group velocity — the speed the packet moves at, which can differ from the speed of the crests.",
 real:"A prism makes a rainbow because violet light slows more than red inside glass, so it bends through a bigger angle.",
 wiki:"Dispersion relation",need:["fourier"]},

/* ---------- THERMO ---------- */
{id:"heat",f:"Thermodynamics",l:1,t:"Temperature & heat",
 idea:"Temperature measures the average jiggle of molecules; heat is energy in transit because of a temperature difference. A bathtub of warm water holds far more heat than a spark, but at a lower temperature.",
 math:"Q = mcΔT",note:"Q is heat added, m mass, c specific heat capacity, ΔT the temperature change. Water’s c is unusually large.",
 real:"Coastal cities stay mild because water's huge heat capacity soaks up summer heat and releases it in winter.",
 wiki:"Heat capacity",need:["energy"]},
{id:"gas",f:"Thermodynamics",l:1,t:"The ideal gas law",lab:"gas",
 idea:"Squeeze a gas and the pressure rises; heat it and the pressure rises too. For a dilute gas those quantities are locked together in a single equation that works from balloons to stars.",
 math:"pV = NkT",note:"p pressure, V volume, N number of particles, k Boltzmann’s constant, T absolute temperature in kelvin.",
 real:"A car tyre's pressure reads higher after a motorway run — the air got hotter, and V barely changed.",
 wiki:"Ideal gas law",need:["heat","pressure"]},
{id:"laws",f:"Thermodynamics",l:2,t:"The laws of thermodynamics",
 idea:"Energy is conserved — that is the first law. Disorder always increases overall — that is the second. The second law is why engines cannot be perfect, and why time seems to run one way.",
 math:"ΔU = Q − W   ·   ΔS ≥ 0",note:"U is internal energy, Q heat in, W work out. S is entropy, and in any real process it rises.",
 real:"You cannot un-fry an egg. The second law is the only fundamental law of physics that cares which direction time points.",
 wiki:"Second law of thermodynamics",need:["gas"]},
{id:"engines",f:"Thermodynamics",l:2,t:"Entropy & heat engines",
 idea:"An engine turns a temperature difference into work, and the second law caps how much of that heat you can ever convert. The cap depends only on the two temperatures, not on the cleverness of the design.",
 math:"η ≤ 1 − T_c/T_h",note:"η is efficiency, T_c and T_h the cold and hot reservoir temperatures in kelvin. Carnot’s limit is unreachable in practice.",
 real:"A car engine tops out near 35 % efficient; the rest leaves as hot exhaust and coolant, exactly as Carnot predicts.",
 wiki:"Heat engine",need:["laws"]},
{id:"potentials",f:"Thermodynamics",l:3,t:"Thermodynamic potentials",
 idea:"Different experiments hold different things fixed. Free energies are bookkeeping devices that turn “what happens at constant temperature and pressure” into a simple minimisation problem.",
 math:"G = H − TS   ·   F = U − TS",note:"H enthalpy, T temperature, S entropy, U internal energy. Spontaneous change at fixed T and p lowers G.",
 real:"Chemists predict whether a reaction will happen at room temperature by checking the sign of ΔG, not by running it.",
 wiki:"Thermodynamic potential",need:["engines"]},
{id:"phases",f:"Thermodynamics",l:3,t:"Phase transitions",
 idea:"Melting and boiling are abrupt reorganisations, not gradual changes. Near a critical point the difference between liquid and gas fades away entirely and the two become indistinguishable.",
 math:"dP/dT = L / (T ΔV)",note:"The Clausius–Clapeyron relation. L is latent heat, ΔV the volume change on crossing the boundary.",
 real:"A pressure cooker works by raising the boiling point of water to about 120 °C, so food cooks in a third of the time.",
 wiki:"Phase transition",need:["engines"]},

/* ---------- EM ---------- */
{id:"charge",f:"Electricity & Magnetism",l:1,t:"Charge & Coulomb’s law",
 idea:"Electric charge comes in two signs, like charges repel, and the force follows the same inverse-square shape as gravity — but is about 10³⁶ times stronger, which is why matter holds together at all.",
 math:"F = k q₁q₂ / r²",note:"k is Coulomb’s constant (9×10⁹ N·m²/C²), q the charges in coulombs, r the separation. Negative F means attraction.",
 real:"Static cling happens because rubbing transfers electrons, and that tiny imbalance beats gravity on a scrap of paper.",
 wiki:"Coulomb's law",need:["vectors","newton"]},
{id:"circuits",f:"Electricity & Magnetism",l:1,t:"Circuits & Ohm’s law",lab:"circuit",
 idea:"Voltage is the push, current is the flow, resistance is the friction. In series the current is shared; in parallel the voltage is — and that single distinction solves most circuits.",
 math:"V = IR   ·   P = VI",note:"V in volts, I in amps, R in ohms. P is the power turned into heat, in watts.",
 real:"Your house is wired in parallel so each socket gets the full 230 V and switching one lamp off does not kill the rest.",
 wiki:"Ohm's law",need:["charge","energy"]},
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
 wiki:"Faraday's law of induction",need:["magnetism"]},
{id:"maxwell",f:"Electricity & Magnetism",l:3,t:"Maxwell’s equations",
 idea:"Four equations unify electricity, magnetism and light. Their most famous consequence: a changing field propagates at 1/√(μ₀ε₀) — and that number turns out to be the speed of light.",
 math:"∇·E = ρ/ε₀   ·   ∇×B = μ₀J + μ₀ε₀ ∂E/∂t",note:"∇· is divergence (source strength), ∇× curl (circulation). The last term was Maxwell’s addition, and it made light possible.",
 real:"Wi-Fi, radio, X-rays and visible light are the same equations at different wavelengths — this is why they share a name.",
 wiki:"Maxwell's equations",need:["induction","fields"]},
{id:"emwaves",f:"Electricity & Magnetism",l:3,t:"Electromagnetic radiation",
 idea:"Light is a self-sustaining ripple of electric and magnetic fields. Radio, microwaves, visible light and X-rays differ only in wavelength — same phenomenon, different scale.",
 math:"c = 1/√(μ₀ε₀) = f λ",note:"μ₀ is the vacuum permeability, ε₀ the permittivity. Their combination fixes c, which is why light needs no medium.",
 real:"Sunlight takes 8 minutes 20 seconds to reach Earth — that is the whole of the Sun–Earth distance at 3×10⁸ m/s.",
 wiki:"Electromagnetic radiation",need:["maxwell","waveprops"]},

/* ---------- OPTICS ---------- */
{id:"reflection",f:"Optics",l:1,t:"Reflection & refraction",
 idea:"Light bounces off a surface at the angle it arrived, and bends when it changes speed between two media. That bend is why a straw looks broken in a glass of water.",
 math:"n₁ sin θ₁ = n₂ sin θ₂",note:"n is the refractive index (1 for vacuum, 1.33 for water, 1.5 for glass). Going into a denser medium bends light toward the normal.",
 real:"Fibre-optic internet works by total internal reflection — light bounces along inside the glass for kilometres without escaping.",
 wiki:"Snell's law",need:["emwaves"]},
{id:"lenses",f:"Optics",l:1,t:"Lenses & images",
 idea:"A curved surface steers parallel rays to a single point. That is image formation, and once you know the focal length it is pure geometry — no physics left in it.",
 math:"1/f = 1/d_o + 1/d_i",note:"f focal length, d_o object distance, d_i image distance. A negative d_i means a virtual image on the same side as the object.",
 real:"An optician's prescription of −2.00 dioptres means a focal length of −0.5 m — the lens spreads light as if it came from half a metre behind you.",
 wiki:"Thin lens",need:["reflection"]},
{id:"diffraction",f:"Optics",l:2,t:"Diffraction & interference",
 idea:"Light bends around edges and interferes with itself. Two slits produce fringes whose spacing reveals the wavelength — which is how we first measured the size of an atom.",
 math:"d sin θ = mλ",note:"d is the slit separation, θ the angle to the bright fringe, m the fringe order (0, 1, 2…). Bigger d means tighter fringes.",
 real:"The colours on a CD are diffraction fringes from its 1.6 µm track spacing — a built-in ruler you can see in daylight.",
 wiki:"Diffraction",need:["interference","lenses"]},
{id:"polarization",f:"Optics",l:2,t:"Polarization",
 idea:"Light’s electric field oscillates in a particular direction. A polariser passes only one direction, and that is direct proof that light is a transverse wave — it cannot be a pressure ripple.",
 math:"I = I₀ cos²θ",note:"I is the transmitted intensity, θ the angle between the light’s polarization and the filter axis. Cross two filters and you get darkness.",
 real:"Polarised sunglasses cut glare because light reflected off water is partially polarised horizontally — the filter is vertical.",
 wiki:"Polarization (waves)",need:["emwaves"]},
{id:"fourieroptics",f:"Optics",l:3,t:"Fourier optics",
 idea:"A lens physically computes a Fourier transform: the focal plane holds the spatial frequencies of the object. Blocking parts of that plane is image processing done with glass.",
 math:"U(x,y) → F(u,v) at the focal plane",note:"U is the field at the lens, F its two-dimensional spectrum. This is why spatial filtering can sharpen or blur a photo.",
 real:"Astronomers put a dark mask in the focal plane of a coronagraph to block a star's light and see the planets beside it.",
 wiki:"Fourier optics",need:["diffraction","fourier"]},
{id:"lasers",f:"Optics",l:3,t:"Lasers & coherence",
 idea:"Stimulated emission makes new photons identical to the ones that triggered them — same phase, colour and direction. Coherence is what separates a laser from a torch.",
 math:"N₂ / N₁ > 1   (population inversion)",note:"Normally more atoms sit in the lower state. Pump enough energy in and you invert the ratio, and light amplifies instead of absorbing.",
 real:"The first laser, in 1960, was a ruby rod; today they scan barcodes, cut steel and measure the Moon's distance to the millimetre.",
 wiki:"Laser",need:["diffraction","photons"]},

/* ---------- RELATIVITY ---------- */
{id:"frames",f:"Relativity",l:1,t:"Frames of reference",
 idea:"Motion only means something relative to something else. An inertial frame is one where Newton’s laws hold without inventing fake forces like centrifugal — and there is no experiment that says one is truly at rest.",
 math:"x′ = x − vt",note:"The Galilean transform: switch to a frame moving at v and subtract its motion. Good enough until speeds approach c.",
 real:"Sitting still, you are moving at about 30 km/s around the Sun and 230 km/s around the galaxy — and feel neither.",
 wiki:"Inertial frame of reference",need:["kinematics"]},
{id:"lightspeed",f:"Relativity",l:1,t:"The speed of light is the same for everyone",
 idea:"Measure light from a moving lamp and you still get c. That single stubborn fact, confirmed again and again, forces everything strange that follows in relativity.",
 math:"c = 299 792 458 m/s, for all observers",note:"Not 299 792 458 ± v. This is the postulate, not a derivation — and nothing with mass can match it.",
 real:"GPS clocks are corrected for both this and gravity every day, or your position would drift by 10 km within minutes.",
 wiki:"Special relativity",need:["frames","emwaves"]},
{id:"timedilation",f:"Relativity",l:2,t:"Time dilation & length contraction",lab:"relativity",
 idea:"A moving clock runs slow, and a moving object is shortened along its direction of travel. Both fall out of light’s fixed speed, and both are measured, not theoretical.",
 math:"γ = 1/√(1 − v²/c²)   ·   Δt = γ Δτ",note:"γ is the Lorentz factor, always ≥ 1. Δτ is proper time on the moving clock; Δt is what the stay-at-home measures.",
 real:"Muons created by cosmic rays should decay long before reaching the ground — they survive because their clocks run slow.",
 wiki:"Time dilation",need:["lightspeed"]},
{id:"emc2",f:"Relativity",l:2,t:"Relativistic energy, E = mc²",
 idea:"Mass is a form of energy. Speeding something up adds energy, and added energy behaves like added mass — so pushing harder gives diminishing returns and c can never be reached.",
 math:"E = γmc²   ·   E₀ = mc²",note:"E₀ is rest energy. At low speeds the extra kinetic energy reduces to the familiar ½mv².",
 real:"The Sun converts about 4 million tonnes of mass into light every second — that is where all of it comes from.",
 wiki:"Mass–energy equivalence",need:["timedilation","energy"]},
{id:"lorentz",f:"Relativity",l:3,t:"Spacetime & Lorentz transformations",
 idea:"Space and time mix when you change frames, exactly the way x and y mix when you rotate. Spacetime is the thing that is really there; space and time separately are just projections.",
 math:"s² = c²t² − x² − y² − z²",note:"s² is the invariant interval: every observer agrees on it, even when they disagree about t and x individually.",
 real:"If a star 10 light-years away exploded now, a ship at 0.99c would measure the trip as 1.4 years, not 10.",
 wiki:"Lorentz transformation",need:["timedilation"]},
{id:"gr",f:"Relativity",l:3,t:"General relativity",
 idea:"Gravity is not a force pulling; it is the shape of spacetime. Mass curves the geometry, and free objects follow the straightest available path through it — which looks like a falling apple.",
 math:"G_μν = 8πG T_μν / c⁴",note:"G_μν describes curvature, T_μν the energy and momentum causing it. Matter tells spacetime how to bend; spacetime tells matter how to move.",
 real:"Gravitational lensing lets astronomers weigh galaxy clusters by how much they bend the light of things behind them.",
 wiki:"General relativity",need:["lorentz","orbits"]},
{id:"blackholes",f:"Relativity",l:3,t:"Black holes",
 idea:"Pack enough mass into a small enough region and the escape velocity exceeds c. Nothing gets out, not even light — and the boundary is simply where that becomes true.",
 math:"r_s = 2GM/c²",note:"r_s is the Schwarzschild radius. For the Sun it is about 3 km; for Earth, about 9 mm.",
 real:"The first image of one, M87*, was released in 2019 — a 6.5-billion-solar-mass black hole 55 million light-years away.",
 wiki:"Black hole",need:["gr"]},

/* ---------- QUANTUM ---------- */
{id:"photons",f:"Quantum Mechanics",l:1,t:"Photons & the photoelectric effect",
 idea:"Light arrives in packets of energy hf. Brighter light means more packets, not bigger ones — which is why blue light ejects electrons and red never does, however bright you make it.",
 math:"E = hf",note:"h is Planck’s constant, f the frequency. Violet photons carry roughly twice the energy of red ones.",
 real:"Solar panels and digital camera sensors both work this way: a photon either has enough energy to free an electron, or it does nothing.",
 wiki:"Photoelectric effect",need:["emwaves"]},
{id:"duality",f:"Quantum Mechanics",l:1,t:"Wave–particle duality",
 idea:"Electrons diffract like waves and land like particles. Both descriptions are partial; the object itself is neither, and the best we can do is say which behaviour shows up in which experiment.",
 math:"λ = h/p",note:"The de Broglie wavelength. p is momentum, so a fast or heavy object has a wavelength too small to notice.",
 real:"Electron microscopes resolve atoms because a 100 keV electron has a wavelength of about 4 picometres.",
 wiki:"Wave–particle duality",need:["photons","diffraction"]},
{id:"box",f:"Quantum Mechanics",l:2,t:"Particle in a box",lab:"quantum",
 idea:"Confine a wave and only certain wavelengths fit between the walls. Confine a particle and only certain energies are allowed. Discreteness is not an extra rule — it is what confinement does to waves.",
 math:"Eₙ = n²h² / 8mL²",note:"n is the level (1, 2, 3…), m the mass, L the box width. Energies go as n², so the gaps grow.",
 real:"Quantum dots get their colour purely from size: a 2 nm dot glows blue, a 6 nm dot glows red. Same material, different box.",
 wiki:"Particle in a box",need:["duality","standing"]},
{id:"uncertainty",f:"Quantum Mechanics",l:2,t:"The uncertainty principle",
 idea:"A confined wave cannot have a sharp momentum, and a sharp momentum is not confined. Position and momentum trade off — not because our instruments are clumsy, but because of what a wave is.",
 math:"Δx Δp ≥ ħ/2",note:"Δx is the spread in position, Δp the spread in momentum, ħ = h/2π. Squeeze one and the other must widen.",
 real:"The uncertainty principle is why a hydrogen electron does not crash into the proton — squeezing it tighter only raises its kinetic energy.",
 wiki:"Uncertainty principle",need:["box"]},
{id:"hydrogen",f:"Quantum Mechanics",l:2,t:"The hydrogen atom",
 idea:"An electron around a proton is a three-dimensional standing wave. Solving that wave equation reproduces every spectral line hydrogen has ever emitted — to many decimal places.",
 math:"Eₙ = −13.6 eV / n²",note:"The negative sign means bound. n = 1 is the ground state; n = ∞ is an electron just barely free.",
 real:"Astronomers identify the composition of distant stars from hydrogen's spectral lines — the same lines you see in a gas discharge tube.",
 wiki:"Hydrogen atom",need:["box","fields"]},
{id:"hilbert",f:"Quantum Mechanics",l:3,t:"States, operators & measurement",
 idea:"A quantum state is a vector, an observable is an operator, and measurement is a projection onto a result. The whole formalism is linear algebra wearing a lab coat.",
 math:"Â |ψ⟩ = a |ψ⟩",note:"|ψ⟩ is the state vector, Â the operator for the quantity you measure, a an allowed outcome (an eigenvalue).",
 real:"Every quantum computing gate is literally a matrix multiplication on a state vector — hardware, but mathematics too.",
 wiki:"Quantum state",need:["uncertainty","vectors"]},
{id:"perturbation",f:"Quantum Mechanics",l:3,t:"Perturbation theory",
 idea:"Most real systems are a simple system plus a small nuisance. Perturbation theory computes the correction order by order instead of starting the whole problem again.",
 math:"Eₙ ≈ Eₙ⁰ + ⟨n⁰|V|n⁰⟩",note:"Eₙ⁰ is the exact answer for the simple case, V the small extra term. The bracket is the average of V over the unperturbed state.",
 real:"It is how the Lamb shift was predicted — a one-part-in-a-billion correction that launched modern quantum electrodynamics.",
 wiki:"Perturbation theory (quantum mechanics)",need:["hydrogen"]},
{id:"entanglement",f:"Quantum Mechanics",l:3,t:"Entanglement",
 idea:"Two particles can share a single state so that measuring one instantly fixes the other. Not a signal — a correlation stronger than any classical version can produce.",
 math:"|Ψ⟩ = (|↑↓⟩ − |↓↑⟩)/√2",note:"Neither particle has a definite spin until measured, yet the pair is perfectly anti-correlated. Bell tests rule out hidden variables.",
 real:"Quantum key distribution uses entangled pairs to make eavesdropping physically detectable, not just difficult.",
 wiki:"Quantum entanglement",need:["hilbert"]},

/* ---------- STAT MECH ---------- */
{id:"probability",f:"Statistical Mechanics",l:1,t:"Probability & randomness",
 idea:"With 10²³ particles you cannot track any of them, but you can say how likely each arrangement is. Physics turns into statistics — and the averages become exact.",
 math:"⟨A⟩ = Σ Aᵢ Pᵢ",note:"⟨A⟩ is the expected value, Aᵢ each possible outcome, Pᵢ its probability. The probabilities must sum to 1.",
 real:"Casinos make money from exactly this: each spin is random, but a million spins is a certainty.",
 wiki:"Probability theory",need:["notation"]},
{id:"microstates",f:"Statistical Mechanics",l:1,t:"Microstates & entropy",
 idea:"One macrostate — a temperature and pressure — can be made of astronomically many microstates. Entropy is the logarithm of that count, which is why it always tends to increase.",
 math:"S = k_B ln W",note:"k_B is Boltzmann’s constant, W the number of microstates. Logarithm because counts multiply while entropy adds.",
 real:"A shuffled deck is not “more disordered” than a sorted one by physics — it just has 10⁶⁸ arrangements and only one sorted order.",
 wiki:"Entropy (statistical thermodynamics)",need:["probability","laws"]},
{id:"boltzmann",f:"Statistical Mechanics",l:2,t:"The Boltzmann distribution",
 idea:"At temperature T, high-energy states are exponentially rare. That one exponential governs reaction rates, spectral line strengths, and why water boils at 100 °C rather than 20.",
 math:"P(E) ∝ e^(−E/kT)",note:"P is the probability of a state with energy E. Doubling T roughly doubles the energy scale, so high states get much more likely.",
 real:"A 10 °C rise roughly doubles many chemical reaction rates — that is the exponential in this formula doing the work.",
 wiki:"Boltzmann distribution",need:["microstates","gas"]},
{id:"partition",f:"Statistical Mechanics",l:2,t:"Partition functions",
 idea:"One sum over all the states — the partition function — encodes every thermodynamic property of a system. Differentiate it and pressure, energy and entropy fall out.",
 math:"Z = Σ e^(−Eᵢ/kT)   ·   F = −kT ln Z",note:"Z counts the thermally accessible states, weighted. F is the Helmholtz free energy, and everything else is a derivative of it.",
 real:"Molecular simulation software computes Z to predict how a candidate drug binds, before anyone makes it in a lab.",
 wiki:"Partition function (statistical mechanics)",need:["boltzmann"]},
{id:"quantumstats",f:"Statistical Mechanics",l:3,t:"Bose–Einstein & Fermi–Dirac statistics",
 idea:"Identical particles are truly indistinguishable, and that changes the counting. Bosons pile into the same state; fermions refuse to share, which is why matter has structure at all.",
 math:"n̄ = 1 / (e^((E−μ)/kT) ∓ 1)",note:"n̄ is the average occupation, μ the chemical potential. Minus is bosons, plus is fermions — a single sign changes the universe.",
 real:"Electrons are fermions, so they stack into shells — which is the entire reason chemistry exists and you do not collapse.",
 wiki:"Fermi–Dirac statistics",need:["partition","hilbert"]},

/* ---------- CONDENSED ---------- */
{id:"states",f:"Condensed Matter",l:1,t:"States of matter",
 idea:"Solids hold their shape, liquids hold their volume, gases hold neither. The difference is how much thermal energy the particles have compared with the bonds pulling them together.",
 math:"competition:  kT  vs  bond energy",note:"When kT is much smaller than the bond energy you get a solid. Comparable, and you get a liquid; much larger, a gas.",
 real:"Dry ice sublimates straight from solid to gas at room pressure — the bonds are so weak that liquid is not stable.",
 wiki:"State of matter",need:["gas","boltzmann"]},
{id:"elasticity",f:"Condensed Matter",l:1,t:"Elasticity",
 idea:"Solids are springs made of atoms. Small stretches give a linear response — double the force, double the stretch — but past the elastic limit the atoms slide and it does not come back.",
 math:"σ = E ε   ·   F = −kx",note:"σ is stress (force per area), ε is strain (fractional stretch), E is Young’s modulus. The minus sign means restoring.",
 real:"A paperclip bent a little springs back; bent too far it stays bent, because the atomic planes have slipped past each other.",
 wiki:"Elasticity (physics)",need:["states"]},
{id:"crystals",f:"Condensed Matter",l:2,t:"Crystals & band theory",
 idea:"In a crystal, electron waves must fit the repeating lattice, which opens up forbidden energy bands. Whether a band is full or empty decides whether the material conducts at all.",
 math:"E(k)  band structure",note:"k is the wave vector. Gaps appear where the electron wavelength matches the atomic spacing — those gaps are why insulators exist.",
 real:"Diamond and graphite are both pure carbon; the difference is how the bands line up, which decides hard-and-clear versus soft-and-black.",
 wiki:"Electronic band structure",need:["elasticity","box"]},
{id:"semiconductors",f:"Condensed Matter",l:2,t:"Semiconductors",
 idea:"A small band gap makes a material switchable: a little heat or a few dopant atoms frees carriers, so conduction can be turned on and off. Every transistor is this sentence.",
 math:"n_i ∝ e^(−E_g / 2kT)",note:"n_i is the intrinsic carrier density, E_g the gap. Silicon’s gap is 1.1 eV — small enough to switch, big enough not to leak.",
 real:"A modern processor has around 50 billion transistors, each one a tiny switch controlled by doping and voltage.",
 wiki:"Semiconductor",need:["crystals"]},
{id:"superconductivity",f:"Condensed Matter",l:3,t:"Superconductivity",
 idea:"Below a critical temperature, electrons pair up and flow with exactly zero resistance. The pairs form a single quantum state spread across the whole material.",
 math:"T < T_c  ⇒  R = 0",note:"T_c is the critical temperature. The pairs (Cooper pairs) cannot scatter one at a time, so there is nothing to resist.",
 real:"MRI scanners use superconducting coils cooled with liquid helium, because only zero resistance gives a strong enough steady field.",
 wiki:"Superconductivity",need:["semiconductors","quantumstats"]},

/* ---------- NUCLEAR ---------- */
{id:"nucleus",f:"Nuclear & Particle",l:1,t:"Atoms & the nucleus",
 idea:"Almost all the mass sits in a nucleus 100 000 times smaller than the atom, held together by a strong force that beats electric repulsion at very short range.",
 math:"r ≈ 1.2 fm × A^(1/3)",note:"A is the mass number (protons plus neutrons). The radius grows only as the cube root because nucleons pack like marbles.",
 real:"If an atom were a football stadium, the nucleus would be a pea on the centre spot — and it holds 99.97 % of the mass.",
 wiki:"Atomic nucleus",need:["charge","photons"]},
{id:"decay",f:"Nuclear & Particle",l:1,t:"Radioactive decay",
 idea:"Decay is a probability per nucleus per second, never a schedule for one nucleus. That gives the smooth exponential fall-off, and a half-life that is a property of the isotope alone.",
 math:"N = N₀ e^(−λt)   ·   t½ = ln2 / λ",note:"λ is the decay constant. After one half-life, half remain; after ten, about one thousandth.",
 real:"Carbon-14's 5730-year half-life is what makes radiocarbon dating possible for anything up to about 50 000 years old.",
 wiki:"Radioactive decay",need:["nucleus","probability"]},
{id:"fission",f:"Nuclear & Particle",l:2,t:"Fission & fusion",
 idea:"Binding energy per nucleon peaks near iron. Splitting heavy nuclei or fusing light ones both release energy, because both move the system closer to that peak.",
 math:"E = Δm c²",note:"Δm is the mass difference between reactants and products — the missing mass appears as energy. About 0.1 % of the mass in fission.",
 real:"The Sun fuses 600 million tonnes of hydrogen per second; a reactor splits about 3 kg of uranium a day for the same power.",
 wiki:"Nuclear fission",need:["decay","emc2"]},
{id:"standard",f:"Nuclear & Particle",l:2,t:"The Standard Model",
 idea:"Matter is a handful of particles, forces are exchanged particles, and symmetry rules decide which interactions are allowed. It predicts almost everything we have ever measured.",
 math:"quarks, leptons, gauge bosons",note:"Six quarks, six leptons, and the bosons that carry the forces. The Higgs is the exception: it gives the others mass.",
 real:"The Higgs boson was found at CERN in 2012, 48 years after it was predicted, using exactly this framework.",
 wiki:"Standard Model",need:["nucleus","quantumstats"]},
{id:"qft",f:"Nuclear & Particle",l:3,t:"Quantum field theory",
 idea:"Particles are not objects; they are ripples in fields that fill all of space. The vacuum is the field at rest, and an excitation of it is a particle.",
 math:"φ(x)  with quantised excitations",note:"φ is the field value at each point in spacetime. Quantising it turns smooth ripples into discrete particle counts.",
 real:"The Casimir effect — two uncharged plates in a vacuum attracting — is a measurable consequence of vacuum fields.",
 wiki:"Quantum field theory",need:["standard","hilbert"]},
{id:"feynman",f:"Nuclear & Particle",l:3,t:"Feynman diagrams & gauge symmetry",
 idea:"Each diagram is a term in a series and each vertex is a rule. Gauge symmetry is what forces the forces to exist — it is a consistency requirement, not a decoration.",
 math:"amplitude = Σ (all diagrams)",note:"Lines are particles, vertices are interactions. Each vertex contributes a factor of the coupling constant, so more vertices means a smaller term.",
 real:"The anomalous magnetic moment of the electron has been calculated to 12 digits using these diagrams and matches experiment.",
 wiki:"Feynman diagram",need:["qft","perturbation"]},

/* ---------- ASTRO ---------- */
{id:"solar",f:"Astrophysics & Cosmology",l:1,t:"The solar system",
 idea:"Planets orbit by the same gravity that drops an apple, and their periods and distances are locked together by a single relation. Kepler found it before Newton explained it.",
 math:"T² ∝ a³",note:"T is the orbital period, a the semi-major axis. Measure one in years and the other in AU and the constant is exactly 1.",
 real:"Neptune was found in 1846 by calculating where this relation said an unseen planet had to be.",
 wiki:"Kepler's laws of planetary motion",need:["orbits"]},
{id:"stars",f:"Astrophysics & Cosmology",l:1,t:"Stars & starlight",
 idea:"A star’s colour gives its surface temperature and its luminosity gives its size. Its spectrum tells you what it is made of, without ever visiting.",
 math:"L = 4πR² σ T⁴",note:"L is luminosity, R radius, T surface temperature, σ the Stefan–Boltzmann constant. Double the temperature and it radiates 16 times as hard.",
 real:"Betelgeuse looks orange because its surface is about 3500 K; the Sun at 5800 K looks white-yellow.",
 wiki:"Star",need:["emwaves","gas"]},
{id:"lifecycle",f:"Astrophysics & Cosmology",l:2,t:"Stellar life cycles",
 idea:"Gravity pulls in, fusion pushes out. For millions of years they balance. When the fuel runs out the balance breaks, and the star collapses into a white dwarf, a neutron star or a black hole.",
 math:"dP/dr = −GMρ/r²",note:"Hydrostatic equilibrium: the pressure gradient exactly cancels gravity at every radius. Remove the pressure and the star falls in.",
 real:"The iron in your blood was made in a star that exploded before the Sun existed — you are recycled stellar material.",
 wiki:"Stellar evolution",need:["stars","fission"]},
{id:"galaxies",f:"Astrophysics & Cosmology",l:2,t:"Galaxies & dark matter",
 idea:"Stars orbit galaxy centres far too fast for the visible mass to explain. Something invisible has to supply the extra gravity — and it outweighs ordinary matter about five to one.",
 math:"v = √(GM(r)/r)",note:"v is the orbital speed at radius r. Flat rotation curves mean M(r) keeps growing with r, even where nothing is visible.",
 real:"Vera Rubin's 1970s measurements of flat rotation curves were the first hard evidence that dark matter exists.",
 wiki:"Dark matter",need:["lifecycle","orbits"]},
{id:"bigbang",f:"Astrophysics & Cosmology",l:3,t:"Expansion & the Big Bang",
 idea:"Every galaxy is moving away from every other, and the further away it is the faster it recedes. Run that backwards and everything was once in a very small, very hot place.",
 math:"v = H₀ d",note:"Hubble’s law. H₀ is about 70 km/s per megaparsec. The expansion is of space itself, not motion through space.",
 real:"The Andromeda galaxy is actually blue-shifted: it is close enough to be falling toward us and will merge in 4 billion years.",
 wiki:"Big Bang",need:["galaxies","gr"]},
{id:"cmb",f:"Astrophysics & Cosmology",l:3,t:"The cosmic microwave background",
 idea:"The leftover glow from the moment the universe first became transparent. Its tiny temperature ripples, about one part in 100 000, are the seeds every galaxy grew from.",
 math:"T ≈ 2.725 K",note:"A near-perfect blackbody spectrum, now stretched into microwaves. Its peaks and troughs encode the composition of the early universe.",
 real:"About 1 % of the static on an untuned analogue TV was this 13.8-billion-year-old light.",
 wiki:"Cosmic microwave background",need:["bigbang","boltzmann"]}
];

/* ---------- indices ---------- */
var byId={},UNL={},ANC={},DES={};
LESSONS.forEach(function(l){byId[l.id]=l});
LESSONS.forEach(function(l){l.need.forEach(function(k){(UNL[k]=UNL[k]||[]).push(l.id)})});
function ancSet(id,seen){seen=seen||{};(byId[id].need||[]).forEach(function(k){if(seen[k]||!byId[k])return;seen[k]=1;ancSet(k,seen)});return seen}
function desSet(id,seen){seen=seen||{};(UNL[id]||[]).forEach(function(k){if(seen[k])return;seen[k]=1;desSet(k,seen)});return seen}
LESSONS.forEach(function(l){ANC[l.id]=ancSet(l.id);DES[l.id]=desSet(l.id)});
var LAB2LESSON={};LESSONS.forEach(function(l){if(l.lab)LAB2LESSON[l.lab]=l.id});
var LVN=["Foundations","Basic","Intermediate","Advanced"];

/* ---------- persistence ---------- */
var done={},saved={};
try{done=JSON.parse(localStorage.getItem("rp.done")||"{}")||{}}catch(e){done={}}
try{saved=JSON.parse(localStorage.getItem("rp.saved")||"{}")||{}}catch(e){saved={}}
function saveDone(){try{localStorage.setItem("rp.done",JSON.stringify(done))}catch(e){}}
function saveSaved(){try{localStorage.setItem("rp.saved",JSON.stringify(saved))}catch(e){}}

/* =========================================================
   CANVAS + LAB ENGINE
   ========================================================= */
var COL={};
function readCols(){var cs=getComputedStyle(document.documentElement);var gv=function(n){return cs.getPropertyValue(n).trim()};
  COL={surface:gv("--surface"),ink:gv("--ink"),muted:gv("--muted"),line:gv("--line"),soft:gv("--soft"),vec:gv("--red"),wave:gv("--ok"),cool:gv("--cool")}}
function rgb(h){h=h.replace("#","");if(h.length===3)h=h.split("").map(function(c){return c+c}).join("");var n=parseInt(h,16);return[n>>16&255,n>>8&255,n&255]}
readCols();

var cv=$("#cv"),g=cv.getContext("2d");
var W=320,H=200,lab=null,P={},ST={},paused=RM,last=0,tick=0;
function fit(){var r=cv.getBoundingClientRect();if(!r.width)return;var d=Math.min(window.devicePixelRatio||1,2);
  W=Math.round(r.width);H=Math.round(r.height);cv.width=W*d;cv.height=H*d;g.setTransform(d,0,0,d,0,0)}
if(window.ResizeObserver)new ResizeObserver(fit).observe(cv);else addEventListener("resize",fit);

function txt(s,x,y,o){o=o||{};g.fillStyle=o.c||COL.muted;g.font=o.font||("12px "+MONO);g.textAlign=o.a||"left";g.textBaseline="alphabetic";g.fillText(s,x,y)}
function arrow(x1,y1,x2,y2,col,w){var a=Math.atan2(y2-y1,x2-x1),h=8;g.strokeStyle=col;g.fillStyle=col;g.lineWidth=w||2;
  g.beginPath();g.moveTo(x1,y1);g.lineTo(x2,y2);g.stroke();
  g.beginPath();g.moveTo(x2,y2);g.lineTo(x2-h*Math.cos(a-.4),y2-h*Math.sin(a-.4));g.lineTo(x2-h*Math.cos(a+.4),y2-h*Math.sin(a+.4));g.closePath();g.fill()}
function niceStep(range,n){var raw=range/n,p=Math.pow(10,Math.floor(Math.log10(raw))),m=raw/p;return(m<1.5?1:m<3.5?2:m<7.5?5:10)*p}
function bgGrid(){g.strokeStyle=COL.soft;g.lineWidth=1;g.beginPath();for(var x=0;x<W;x+=32){g.moveTo(x+.5,0);g.lineTo(x+.5,H)}for(var y=0;y<H;y+=32){g.moveTo(0,y+.5);g.lineTo(W,y+.5)}g.stroke()}
function rbox(cx,cy,w,h,label,sub){g.fillStyle=COL.surface;g.strokeStyle=COL.ink;g.lineWidth=2;g.beginPath();
  if(g.roundRect)g.roundRect(cx-w/2,cy-h/2,w,h,6);else g.rect(cx-w/2,cy-h/2,w,h);g.fill();g.stroke();
  txt(label,cx,cy-1,{c:COL.ink,a:"center",font:"500 12px "+MONO});txt(sub,cx,cy+13,{c:COL.muted,a:"center",font:"11px "+MONO})}
function gauss(){var u=0;while(!u)u=Math.random();return Math.sqrt(-2*Math.log(u))*Math.cos(TAU*Math.random())}
function fmtYr(y){if(!isFinite(y))return"∞";if(y>=1e6)return f(y/1e6,2)+" million yr";if(y>=1000)return Math.round(y).toLocaleString("en-US")+" yr";if(y>=1)return f(y,2)+" yr";return f(y*365.25,0)+" days"}
function wl2rgb(w){var r=0,gg=0,b=0;
  if(w<380||w>750)return null;
  if(w<440){r=-(w-440)/60;b=1}else if(w<490){gg=(w-440)/50;b=1}else if(w<510){gg=1;b=-(w-510)/20}else if(w<580){r=(w-510)/70;gg=1}else if(w<645){r=1;gg=-(w-645)/65}else{r=1}
  return[Math.round(r*255),Math.round(gg*255),Math.round(b*255)]}

var outs={};
function out(k,v){var e=outs[k];if(e&&e._v!==v){e._v=v;e.innerHTML=v}}

var LABS=[];

/* ---- Projectile ---- */
function pj(){var a=P.ang*DEG,vx=P.spd*Math.cos(a),vy=P.spd*Math.sin(a);return{vx:vx,vy:vy,T:2*vy/P.g,R:2*vx*vy/P.g,Hp:vy*vy/(2*P.g)}}
function ptol(){return Math.max(1,.03*P.spd*P.spd/P.g)}
function newTarget(){ST.tx=Math.round((.35+.55*Math.random())*P.spd*P.spd/P.g*2)/2;ST.fly=false;ST.t=0;ST.trail=[]}
LABS.push({id:"projectile",title:"Projectile Launcher",field:"Mechanics",level:1,formula:"R = v² sin 2θ / g",
 blurb:"Launch a ball and compare the dashed prediction with the real flight. Horizontal and vertical motion are independent, so the path is a parabola.",
 tryit:"Hit the flag. Then switch to the Moon and see how far the same shot goes.",
 controls:[{k:"ang",l:"Launch angle",min:5,max:85,step:1,v:45,u:"°"},{k:"spd",l:"Launch speed",min:5,max:40,step:.5,v:22,u:" m/s"},{k:"g",l:"World",type:"select",opts:PLANETS,v:9.81}],
 buttons:[{t:"Launch",primary:1,fn:function(){ST.t=0;ST.fly=true;ST.trail=[]}},{t:"New target",fn:function(){newTarget()}}],
 readouts:[["range","Range"],["peak","Peak height"],["time","Flight time"],["res","Last shot"]],
 init:function(){ST={t:0,fly:false,trail:[],tx:0,hits:0,shots:0,msg:"—"};newTarget()},
 change:function(k){if(k==="g")newTarget();else{ST.fly=false;ST.t=0;ST.trail=[]}},
 frame:function(dt){
  var s=pj(),tl=ptol(),o={x:36,y:H-34},vw=Math.max(s.R,ST.tx+tl,5)*1.08,vh=Math.max(s.Hp,2)*1.3;
  var sc=Math.min((W-o.x-18)/vw,(o.y-26)/vh);
  var X=function(x){return o.x+x*sc},Y=function(y){return o.y-y*sc};
  g.strokeStyle=COL.ink;g.lineWidth=2;g.beginPath();g.moveTo(o.x-10,o.y);g.lineTo(W-8,o.y);g.stroke();
  var st=niceStep(vw,6);g.lineWidth=1;
  for(var x=0;x<=vw;x+=st){g.beginPath();g.moveTo(X(x),o.y);g.lineTo(X(x),o.y+5);g.stroke();txt(f(x,st<1?1:0)+(x===0?" m":""),X(x),o.y+19,{a:"center"})}
  g.fillStyle=COL.wave;g.fillRect(X(ST.tx-tl),o.y-4,Math.max(3,2*tl*sc),8);
  g.strokeStyle=COL.wave;g.lineWidth=2;g.beginPath();g.moveTo(X(ST.tx),o.y);g.lineTo(X(ST.tx),o.y-30);g.stroke();
  g.fillStyle=COL.wave;g.beginPath();g.moveTo(X(ST.tx),o.y-30);g.lineTo(X(ST.tx)+14,o.y-25);g.lineTo(X(ST.tx),o.y-20);g.closePath();g.fill();
  txt("target "+f(ST.tx,1)+" m",X(ST.tx),o.y-36,{a:"center",c:COL.wave});
  g.setLineDash([6,6]);g.strokeStyle=COL.muted;g.lineWidth=1.5;g.beginPath();
  for(var i=0;i<=80;i++){var t=s.T*i/80,px=s.vx*t,py=s.vy*t-.5*P.g*t*t;if(i)g.lineTo(X(px),Y(py));else g.moveTo(X(px),Y(py))}
  g.stroke();g.setLineDash([]);
  if(ST.fly){var ts=s.T>3?s.T/3:1;ST.t+=dt*ts;
    if(ST.t>=s.T){ST.t=s.T;ST.fly=false;var miss=Math.abs(s.R-ST.tx),hit=miss<=tl;ST.shots++;if(hit)ST.hits++;ST.msg=(hit?"Hit":"Miss by "+f(miss,1)+" m")+" ("+ST.hits+"/"+ST.shots+")"}}
  var bx=s.vx*ST.t,by=Math.max(0,s.vy*ST.t-.5*P.g*ST.t*ST.t);
  if(ST.fly)ST.trail.push([bx,by]);
  if(ST.trail.length>1){g.strokeStyle=COL.vec;g.lineWidth=2.5;g.beginPath();ST.trail.forEach(function(q,j){if(j)g.lineTo(X(q[0]),Y(q[1]));else g.moveTo(X(q[0]),Y(q[1]))});g.stroke()}
  g.save();g.translate(o.x,o.y);g.rotate(-P.ang*DEG);g.fillStyle=COL.ink;g.fillRect(0,-4,28,8);g.restore();
  g.fillStyle=COL.ink;g.beginPath();g.arc(o.x,o.y,7,0,TAU);g.fill();
  var qx=X(bx),qy=Y(by);
  g.fillStyle=COL.vec;g.strokeStyle=COL.surface;g.lineWidth=2;g.beginPath();g.arc(qx,qy,6,0,TAU);g.fill();g.stroke();
  if(ST.fly){arrow(qx,qy,qx+s.vx*2.2,qy-(s.vy-P.g*ST.t)*2.2,COL.ink,2);arrow(qx,qy,qx,qy+24,COL.wave,2)}
  out("range",f(s.R,1)+" m");out("peak",f(s.Hp,1)+" m");out("time",f(s.T,2)+" s");out("res",ST.msg);
 }});

/* ---- Circuit ---- */
LABS.push({id:"circuit",title:"Circuit Bench",field:"Electricity & Magnetism",level:1,formula:"V = I R",
 blurb:"A battery pushes current through two resistors. Moving dots show conventional current: faster dots mean more amps.",
 tryit:"Switch to parallel and set R2 very low. Total resistance falls below both resistors.",
 controls:[{k:"V",l:"Battery",min:1,max:24,step:.5,v:12,u:" V"},{k:"r1",l:"Resistor R1",min:1,max:100,step:1,v:20,u:" Ω"},{k:"r2",l:"Resistor R2",min:1,max:100,step:1,v:30,u:" Ω"},{k:"mode",l:"Wiring",type:"select",opts:[["Series","s"],["Parallel","p"]],v:"s"}],
 buttons:[],
 readouts:[["rt","Total resistance"],["i","Battery current"],["p","Power"],["sp","R1 · R2 share"]],
 init:function(){ST={ph:{}}},
 frame:function(dt){
  var V=P.V,a=P.r1,b=P.r2,ser=P.mode==="s",Rt,I,I1,I2;
  if(ser){Rt=a+b;I=V/Rt;I1=I2=I}else{Rt=a*b/(a+b);I1=V/a;I2=V/b;I=I1+I2}
  var x0=W*.13,x1=W*.88,yT=H*.24,yB=H*.8,yM=(yT+yB)/2,xa=W*.46,xb=W*.76,segs;
  if(ser)segs=[{id:"a",I:I,p:[[x0,yB],[x0,yT]]},{id:"b",I:I,p:[[x0,yT],[x1,yT]]},{id:"c",I:I,p:[[x1,yT],[x1,yB]]},{id:"d",I:I,p:[[x1,yB],[x0,yB]]}];
  else segs=[{id:"a",I:I,p:[[x0,yB],[x0,yT]]},{id:"b",I:I,p:[[x0,yT],[xa,yT]]},{id:"c",I:I2,p:[[xa,yT],[xb,yT]]},{id:"e",I:I1,p:[[xa,yT],[xa,yB]]},{id:"f",I:I2,p:[[xb,yT],[xb,yB]]},{id:"h",I:I2,p:[[xb,yB],[xa,yB]]},{id:"i",I:I,p:[[xa,yB],[x0,yB]]}];
  g.strokeStyle=COL.ink;g.lineWidth=3;g.lineCap="round";
  segs.forEach(function(s){g.beginPath();g.moveTo(s.p[0][0],s.p[0][1]);g.lineTo(s.p[1][0],s.p[1][1]);g.stroke()});
  g.lineCap="butt";
  g.fillStyle=COL.vec;
  segs.forEach(function(s){
    var dx=s.p[1][0]-s.p[0][0],dy=s.p[1][1]-s.p[0][1],len=Math.hypot(dx,dy),gap=20;
    ST.ph[s.id]=(ST.ph[s.id]||0)+(10+28*Math.sqrt(s.I))*dt;
    for(var d=ST.ph[s.id]%gap;d<len;d+=gap){g.beginPath();g.arc(s.p[0][0]+dx/len*d,s.p[0][1]+dy/len*d,3.2,0,TAU);g.fill()}});
  if(ser){rbox(W*.3,yT,92,38,"R1 "+a+" Ω",f(I*a,2)+" V");rbox(W*.6,yT,92,38,"R2 "+b+" Ω",f(I*b,2)+" V")}
  else{rbox(xa,yM,86,38,"R1 "+a+" Ω",f(I1,2)+" A");rbox(xb,yM,86,38,"R2 "+b+" Ω",f(I2,2)+" A")}
  g.fillStyle=COL.surface;g.fillRect(x0-20,yM-14,40,28);
  g.strokeStyle=COL.ink;g.lineWidth=3;g.beginPath();g.moveTo(x0-16,yM-5);g.lineTo(x0+16,yM-5);g.stroke();
  g.lineWidth=6;g.beginPath();g.moveTo(x0-8,yM+6);g.lineTo(x0+8,yM+6);g.stroke();
  txt("+",x0+22,yM-3,{c:COL.vec,font:"600 14px "+MONO});txt(V+" V",x0+22,yM+16,{c:COL.ink,font:"500 12px "+MONO});
  if(ser){out("sp",f(I*a,1)+" V · "+f(I*b,1)+" V")}else{out("sp",f(I1,2)+" A · "+f(I2,2)+" A")}
  out("rt",f(Rt,1)+" Ω");out("i",f(I,2)+" A");out("p",f(V*I,1)+" W");
 }});

/* ---- Gas ---- */
function gvr(){return 90*Math.sqrt(P.T/300)}
function gbox(){var bx=24,by=34,bw=(W-bx-34)*P.V/100,bh=H-by-24;return{bx:bx,by:by,bw:bw,bh:bh,area:bw*bh,per:2*(bw+bh)}}
function gspawn(){var b=gbox(),s=gvr()/Math.SQRT2;return{x:b.bx+4+Math.random()*(b.bw-8),y:b.by+4+Math.random()*(b.bh-8),vx:gauss()*s,vy:gauss()*s}}
LABS.push({id:"gas",title:"Gas in a Box",field:"Thermodynamics",level:1,formula:"P V = N k T",
 blurb:"Particles bounce around a box. Each wall hit pushes on the wall, and the total push per length is the pressure.",
 tryit:"Halve the volume and pressure doubles. Double the temperature and it doubles again.",
 controls:[{k:"n",l:"Particles",min:10,max:200,step:1,v:80},{k:"T",l:"Temperature",min:100,max:1000,step:10,v:300,u:" K"},{k:"V",l:"Volume (piston)",min:30,max:100,step:1,v:100,u:" %"}],
 buttons:[],
 readouts:[["pm","Pressure measured"],["pp","Pressure from PV = NkT"],["sp","Mean speed"],["hit","Match"]],
 init:function(){ST={ps:[],imp:0,el:0,pm:0,pT:P.T};for(var i=0;i<P.n;i++)ST.ps.push(gspawn())},
 change:function(k){
  if(k==="n"){while(ST.ps.length<P.n)ST.ps.push(gspawn());ST.ps.length=P.n}
  if(k==="T"){var r=Math.sqrt(P.T/ST.pT);ST.ps.forEach(function(p){p.vx*=r;p.vy*=r});ST.pT=P.T}
  ST.imp=0;ST.el=0;ST.pm=0},
 frame:function(dt){
  var b=gbox(),sub=3,step=Math.min(dt,.04)/sub,i,p;
  for(var s=0;s<sub;s++)for(i=0;i<ST.ps.length;i++){p=ST.ps[i];p.x+=p.vx*step;p.y+=p.vy*step;
    if(p.x<b.bx){p.x=b.bx;p.vx=Math.abs(p.vx);ST.imp+=2*p.vx}else if(p.x>b.bx+b.bw){p.x=b.bx+b.bw;p.vx=-Math.abs(p.vx);ST.imp-=2*p.vx}
    if(p.y<b.by){p.y=b.by;p.vy=Math.abs(p.vy);ST.imp+=2*p.vy}else if(p.y>b.by+b.bh){p.y=b.by+b.bh;p.vy=-Math.abs(p.vy);ST.imp-=2*p.vy}}
  ST.el+=Math.min(dt,.04);
  if(ST.el>.6){var m=ST.imp/ST.el/b.per;ST.pm=ST.pm?ST.pm*.6+m*.4:m;ST.imp=0;ST.el=0}
  var vr=gvr(),sum=0;
  g.fillStyle=COL.wave;g.beginPath();
  for(i=0;i<ST.ps.length;i++){p=ST.ps[i];var sp=Math.hypot(p.vx,p.vy);sum+=sp;if(sp<=vr){g.moveTo(p.x+3.2,p.y);g.arc(p.x,p.y,3.2,0,TAU)}}
  g.fill();g.fillStyle=COL.vec;g.beginPath();
  for(i=0;i<ST.ps.length;i++){p=ST.ps[i];if(Math.hypot(p.vx,p.vy)>vr){g.moveTo(p.x+3.2,p.y);g.arc(p.x,p.y,3.2,0,TAU)}}
  g.fill();
  g.strokeStyle=COL.ink;g.lineWidth=3;g.strokeRect(b.bx,b.by,b.bw,b.bh);
  g.fillStyle=COL.ink;g.fillRect(b.bx+b.bw,b.by-5,10,b.bh+10);
  txt("T = "+P.T+" K   V = "+P.V+" %   N = "+P.n,b.bx,22,{c:COL.ink});
  var pp=P.n*vr*vr/(2*b.area)*1000,pm=ST.pm*1000;
  out("pm",ST.pm?f(pm,2):"measuring…");out("pp",f(pp,2));out("sp",f(sum/Math.max(1,ST.ps.length),0)+" px/s");
  out("hit",ST.pm?f(pm/pp*100,0)+" %":"—");
 }});

/* ---- Pendulum ---- */
function pfn(th,w){var k=P.g/P.len;return[w,-k*Math.sin(th)-P.damp*w]}
function prk(h){var a=pfn(ST.th,ST.w),b=pfn(ST.th+h/2*a[0],ST.w+h/2*a[1]),c=pfn(ST.th+h/2*b[0],ST.w+h/2*b[1]),d=pfn(ST.th+h*c[0],ST.w+h*c[1]);
  ST.th+=h/6*(a[0]+2*b[0]+2*c[0]+d[0]);ST.w+=h/6*(a[1]+2*b[1]+2*c[1]+d[1])}
function pghost(t){var k=P.g/P.len,wd=Math.sqrt(Math.max(k-P.damp*P.damp/4,0));return ST.th0*Math.exp(-P.damp*t/2)*Math.cos(wd*t)}
LABS.push({id:"pendulum",title:"Pendulum",field:"Mechanics",level:2,formula:"T = 2π √(L/g)",
 blurb:"The swing is solved numerically with no small-angle shortcut. The hollow ghost bob follows the textbook formula.",
 tryit:"Set the angle to 170° and watch the ghost fall out of step with the real pendulum.",
 controls:[{k:"len",l:"String length",min:.2,max:3,step:.05,v:1,u:" m"},{k:"th0",l:"Release angle",min:5,max:175,step:1,v:70,u:"°"},{k:"g",l:"World",type:"select",opts:PLANETS,v:9.81},{k:"damp",l:"Friction",min:0,max:1,step:.01,v:0,u:" /s"}],
 buttons:[{t:"Release again",primary:1,fn:function(){lab.init()}}],
 readouts:[["t0","Small-angle period"],["tm","Measured period"],["dv","Difference"],["an","Angle now"]],
 init:function(){var t0=P.th0*DEG;ST={th:t0,w:0,t:0,th0:t0,tr:[],per:null,lc:null}},
 change:function(){this.init()},
 frame:function(dt){
  var rem=dt;
  while(rem>0){var h=Math.min(rem,.002),p=ST.th;prk(h);ST.t+=h;rem-=h;
    if(p>0&&ST.th<=0&&ST.w<0){var tc=ST.t-h+h*p/(p-ST.th);if(ST.lc!=null)ST.per=tc-ST.lc;ST.lc=tc}}
  var topH=H*.62,px=W/2,py=30,pl=P.len/3*(topH-70);
  var bx=px+pl*Math.sin(ST.th),by=py+pl*Math.cos(ST.th),gt=pghost(ST.t),gx=px+pl*Math.sin(gt),gy=py+pl*Math.cos(gt);
  g.strokeStyle=COL.line;g.lineWidth=1.5;g.setLineDash([4,5]);g.beginPath();g.arc(px,py,pl,Math.PI/2-ST.th0,Math.PI/2+ST.th0);g.stroke();g.setLineDash([]);
  g.strokeStyle=COL.muted;g.lineWidth=1.5;g.beginPath();g.moveTo(px,py);g.lineTo(gx,gy);g.stroke();
  g.beginPath();g.arc(gx,gy,13,0,TAU);g.stroke();
  g.strokeStyle=COL.ink;g.lineWidth=2.5;g.beginPath();g.moveTo(px,py);g.lineTo(bx,by);g.stroke();
  g.fillStyle=COL.ink;g.fillRect(px-30,py-6,60,6);
  g.fillStyle=COL.vec;g.strokeStyle=COL.surface;g.lineWidth=2;g.beginPath();g.arc(bx,by,13,0,TAU);g.fill();g.stroke();
  var sx0=36,sx1=W-14,sy0=H*.70,sy1=H-20,sm=(sy0+sy1)/2,ws=Math.max(0,ST.t-6),amp=(sy1-sy0)/2*.9;
  g.strokeStyle=COL.line;g.lineWidth=1;g.beginPath();g.moveTo(sx0,sm);g.lineTo(sx1,sm);g.stroke();
  txt("θ(t)",6,sm+4,{c:COL.muted});txt("orange: real   grey: small-angle formula",sx0,sy0-6);
  var TX=function(t){return sx0+(t-ws)/6*(sx1-sx0)},TY=function(a){return sm-a/ST.th0*amp};
  var steps=120,i,tt;
  g.strokeStyle=COL.muted;g.lineWidth=1.5;g.setLineDash([3,4]);g.beginPath();
  for(i=0;i<=steps;i++){tt=ws+6*i/steps;if(tt>ST.t)break;if(i)g.lineTo(TX(tt),TY(pghost(tt)));else g.moveTo(TX(tt),TY(pghost(tt)))}
  g.stroke();g.setLineDash([]);
  ST.tr.push([ST.t,ST.th]);while(ST.tr.length&&ST.tr[0][0]<ST.t-6)ST.tr.shift();
  g.strokeStyle=COL.vec;g.lineWidth=2;g.beginPath();ST.tr.forEach(function(q,j){if(j)g.lineTo(TX(q[0]),TY(q[1]));else g.moveTo(TX(q[0]),TY(q[1]))});g.stroke();
  var T0=TAU*Math.sqrt(P.len/P.g);
  out("t0",f(T0,3)+" s");out("tm",ST.per?f(ST.per,3)+" s":"measuring…");out("dv",ST.per?f((ST.per/T0-1)*100,1)+" %":"—");out("an",f(ST.th/DEG,0)+"°");
 }});

/* ---- Waves ---- */
LABS.push({id:"waves",title:"Wave Interference",field:"Waves & Sound",level:2,formula:"Δ = r₂ − r₁ = mλ",
 blurb:"Two sources send out identical ripples. Where crest meets crest the water piles up. Where crest meets trough it stays flat.",
 tryit:"Raise the separation and count how many bright lines fan out.",
 controls:[{k:"lam",l:"Wavelength",min:1,max:4,step:.1,v:2,u:" m"},{k:"sep",l:"Source separation",min:1,max:9,step:.1,v:4,u:" m"},{k:"ph",l:"Phase offset of source 2",min:0,max:180,step:1,v:0,u:"°"}],
 buttons:[],
 readouts:[["f","Frequency (speed 3 m/s)"],["n","Bright lines"],["ang","First bright line angle"],["sp","Source gap"]],
 init:function(){ST={t:0,img:null,cols:0,rows:0}},
 frame:function(dt){
  ST.t+=dt;
  var cell=W>600?4:3,cols=Math.ceil(W/cell),rows=Math.ceil(H/cell);
  if(!ST.img||ST.cols!==cols||ST.rows!==rows){ST.cols=cols;ST.rows=rows;ST.cv=document.createElement("canvas");ST.cv.width=cols;ST.cv.height=rows;ST.cx=ST.cv.getContext("2d");ST.img=ST.cx.createImageData(cols,rows)}
  var ppm=W/20,k=TAU/P.lam,om=k*3,ph=P.ph*DEG,x0=W/2,ya=H/2-P.sep/2*ppm,yb=H/2+P.sep/2*ppm;
  var s=rgb(COL.surface),a=rgb(COL.wave),b=rgb(COL.vec),d=ST.img.data,idx=0;
  for(var j=0;j<rows;j++){var cy=(j+.5)*cell;
    for(var i=0;i<cols;i++){var cx=(i+.5)*cell;
      var r1=Math.hypot(cx-x0,cy-ya)/ppm,r2=Math.hypot(cx-x0,cy-yb)/ppm;
      var v=(Math.sin(k*r1-om*ST.t)/Math.sqrt(r1+1.2)+Math.sin(k*r2-om*ST.t+ph)/Math.sqrt(r2+1.2))*.95;
      var m=Math.pow(clamp(Math.abs(v),0,1),.8),c=v>=0?a:b;
      d[idx]=s[0]+(c[0]-s[0])*m;d[idx+1]=s[1]+(c[1]-s[1])*m;d[idx+2]=s[2]+(c[2]-s[2])*m;d[idx+3]=255;idx+=4}}
  ST.cx.putImageData(ST.img,0,0);g.imageSmoothingEnabled=true;g.drawImage(ST.cv,0,0,W,H);
  g.strokeStyle=COL.ink;g.lineWidth=1;g.setLineDash([3,4]);g.beginPath();g.moveTo(x0-34,ya);g.lineTo(x0-34,yb);g.stroke();g.setLineDash([]);
  txt("d = "+f(P.sep,1)+" m",x0-40,H/2+4,{a:"right",c:COL.ink});
  [ya,yb].forEach(function(y){g.fillStyle=COL.ink;g.strokeStyle=COL.surface;g.lineWidth=2;g.beginPath();g.arc(x0,y,6,0,TAU);g.fill();g.stroke()});
  var n=0;for(var m2=-40;m2<=40;m2++){if(Math.abs((m2-ph/TAU)*P.lam)<=P.sep)n++}
  out("f",f(3/P.lam,2)+" Hz");out("n",String(n));
  out("ang",P.lam<P.sep&&P.ph===0?f(Math.asin(P.lam/P.sep)/DEG,1)+"°":"—");out("sp",f(P.sep/P.lam,1)+" λ");
 }});

/* ---- Orbit ---- */
LABS.push({id:"orbit",title:"Orbit Maker",field:"Mechanics",level:2,formula:"E = ½v² − GM/r",
 blurb:"A planet starts one unit from its star and moves sideways. Gravity alone decides if it circles, loops or leaves.",
 tryit:"Set speed to 1.00 for a circle and 1.41 to escape. Turn on wedges: equal areas in equal times.",
 controls:[{k:"f",l:"Launch speed ÷ circular speed",min:.35,max:1.6,step:.01,v:.85},{k:"wedge",l:"Equal-time wedges",type:"select",opts:[["Off","0"],["On","1"]],v:"0"}],
 buttons:[{t:"Relaunch",primary:1,fn:function(){lab.init()}}],
 readouts:[["type","Orbit type"],["e","Eccentricity"],["per","Period (sim units)"],["now","Right now"]],
 init:function(){ST={x:1,y:0,vx:0,vy:P.f,t:0,tr:[],esc:false,escT:0}},
 change:function(){this.init()},
 frame:function(dt){
  var bud=dt*1.6;
  while(bud>0&&!ST.esc){
    var r=Math.hypot(ST.x,ST.y),h=Math.min(bud,.004*Math.pow(Math.max(.04,r),1.5)),a1=-1/(r*r*r);
    ST.vx+=ST.x*a1*h/2;ST.vy+=ST.y*a1*h/2;ST.x+=ST.vx*h;ST.y+=ST.vy*h;
    var r2=Math.hypot(ST.x,ST.y),b1=-1/(r2*r2*r2);
    ST.vx+=ST.x*b1*h/2;ST.vy+=ST.y*b1*h/2;ST.t+=h;bud-=h;if(r2>9)ST.esc=true}
  if(ST.esc){ST.escT+=dt;if(ST.escT>1.6){lab.init();return}}
  ST.tr.push([ST.x,ST.y,ST.t]);if(ST.tr.length>2500)ST.tr.shift();
  var fz=P.f,bound=fz<Math.SQRT2-1e-9,ext;
  if(bound)ext=fz>=1?fz*fz/(2-fz*fz):1;else ext=3.2;
  ext=Math.min(Math.max(ext,1),5)*1.12;
  var cx=W/2,cy=H/2,sc=.44*Math.min(W,H)/ext;
  var Xp=function(x){return cx+x*sc},Yp=function(y){return cy-y*sc};
  g.strokeStyle=COL.line;g.lineWidth=1.5;g.setLineDash([4,5]);g.beginPath();g.arc(cx,cy,sc,0,TAU);g.stroke();g.setLineDash([]);
  var Tp=bound?TAU*Math.pow(1/(2-fz*fz),1.5):NaN;
  if(P.wedge==="1"&&bound){
    var dl=Tp/12,cur=-1,poly=[],prev=null;
    var flush=function(){if(poly.length>1){g.beginPath();g.moveTo(cx,cy);poly.forEach(function(q){g.lineTo(Xp(q[0]),Yp(q[1]))});g.closePath();g.fillStyle=cur%2?COL.vec:COL.wave;g.globalAlpha=.3;g.fill();g.globalAlpha=1}};
    ST.tr.forEach(function(q){if(q[2]<ST.t-Tp)return;var kk=Math.floor(q[2]/dl);if(kk!==cur){flush();cur=kk;poly=prev?[prev]:[]}poly.push(q);prev=q});
    flush()}
  g.strokeStyle=COL.wave;g.lineWidth=2;g.beginPath();ST.tr.forEach(function(q,j){if(j)g.lineTo(Xp(q[0]),Yp(q[1]));else g.moveTo(Xp(q[0]),Yp(q[1]))});g.stroke();
  g.fillStyle=COL.vec;g.beginPath();g.arc(cx,cy,10,0,TAU);g.fill();
  var qx=Xp(ST.x),qy=Yp(ST.y),rr=Math.hypot(ST.x,ST.y),sp=Math.hypot(ST.vx,ST.vy);
  if(!ST.esc){arrow(qx,qy,qx+ST.vx*38,qy-ST.vy*38,COL.ink,2);
    var gl=Math.min(60,24/(rr*rr));arrow(qx,qy,qx-ST.x/rr*gl,qy+ST.y/rr*gl,COL.vec,2)}
  g.fillStyle=COL.ink;g.strokeStyle=COL.surface;g.lineWidth=2;g.beginPath();g.arc(qx,qy,6,0,TAU);g.fill();g.stroke();
  txt("dark arrow: velocity   red arrow: gravity   dashed: circular orbit",10,H-10);
  if(ST.esc)txt("Escaped. Relaunching…",W/2,26,{a:"center",c:COL.vec,font:"500 14px "+MONO});
  var type=Math.abs(fz-1)<.005?"Circle":fz<Math.SQRT2-.005?"Ellipse":Math.abs(fz-Math.SQRT2)<.005?"Parabola (escape)":"Hyperbola (escape)";
  out("type",type);out("e",f(Math.abs(fz*fz-1),2));out("per",bound?f(Tp,1):"never repeats");out("now","r "+f(rr,2)+" · v "+f(sp,2));
 }});

/* ---- Relativity ---- */
LABS.push({id:"relativity",title:"Light Clock",field:"Relativity",level:3,formula:"γ = 1 / √(1 − v²/c²)",
 blurb:"Light bounces between two mirrors. On a moving clock the photon must travel a longer diagonal, so each tick takes longer.",
 tryit:"Push speed past 0.9 c and compare the trip time on Earth with the time on the ship.",
 controls:[{k:"beta",l:"Speed as a fraction of c",min:0,max:.999,step:.001,v:.8,u:" c"},{k:"d",l:"Destination",type:"select",opts:[["Alpha Centauri · 4.37 ly",4.37],["Sirius · 8.6 ly",8.6],["Vega · 25 ly",25],["Andromeda · 2.5 million ly",2500000]],v:4.37}],
 buttons:[],
 readouts:[["gm","Lorentz factor γ"],["te","Trip time on Earth"],["ts","Trip time on the ship"],["len","100 m ship seen from Earth"]],
 init:function(){ST={t:0,tr:[],px:0}},
 frame:function(dt){
  var b=P.beta,gm=1/Math.sqrt(1-b*b);ST.t+=dt;
  var topH=H*.56,hh=Math.min(topH*.6,110),yb=topH*.84,yt=yb-hh,T0=2;
  var tri=function(t,T){var u=(((t%T)+T)%T)/T;return u<.5?u*2:2-u*2};
  var mirrors=function(x){g.fillStyle=COL.ink;g.fillRect(x-36,yt-6,72,6);g.fillRect(x-36,yb,72,6);g.strokeStyle=COL.line;g.lineWidth=1;g.setLineDash([3,4]);g.beginPath();g.moveTo(x,yt);g.lineTo(x,yb);g.stroke();g.setLineDash([])};
  var c1=W*.2;mirrors(c1);
  g.fillStyle=COL.vec;g.beginPath();g.arc(c1,yb-tri(ST.t,T0)*hh,5,0,TAU);g.fill();
  txt("Clock at rest",c1,yb+26,{a:"center",c:COL.ink});txt("ticks: "+Math.floor(ST.t/T0),c1,yb+42,{a:"center"});
  var span=W*.5,xs=W*.38,x2=xs+((b*190*ST.t)%span);
  if(dt>0){if(ST.px>x2)ST.tr=[];ST.px=x2;ST.tr.push([x2,yb-tri(ST.t,gm*T0)*hh]);if(ST.tr.length>500)ST.tr.shift()}
  mirrors(x2);
  if(ST.tr.length>1){g.strokeStyle=COL.vec;g.globalAlpha=.55;g.lineWidth=1.5;g.beginPath();ST.tr.forEach(function(q,j){if(j)g.lineTo(q[0],q[1]);else g.moveTo(q[0],q[1])});g.stroke();g.globalAlpha=1}
  g.fillStyle=COL.vec;g.beginPath();g.arc(x2,yb-tri(ST.t,gm*T0)*hh,5,0,TAU);g.fill();
  txt("Same clock moving at "+f(b,3)+" c",xs+span/2,yb+26,{a:"center",c:COL.ink});txt("ticks: "+Math.floor(ST.t/(gm*T0)),xs+span/2,yb+42,{a:"center"});
  if(b>0)arrow(x2-26,yt-22,x2+26,yt-22,COL.ink,2);
  var px=W*.1,pw=W*.84,py0=H*.7,py1=H*.93,gmax=10;
  var X=function(v){return px+v*pw},Y=function(v){return py1-(Math.min(v,gmax)-1)/(gmax-1)*(py1-py0)};
  g.strokeStyle=COL.line;g.lineWidth=1;g.beginPath();g.moveTo(px,py0);g.lineTo(px,py1);g.lineTo(px+pw,py1);g.stroke();
  [0,.5,1].forEach(function(v){txt(f(v,1),X(v),py1+14,{a:"center"})});[1,5,10].forEach(function(v){txt(String(v),px-6,Y(v)+4,{a:"right"})});
  txt("v / c",px+pw,py1+14,{a:"right"});txt("γ",px-6,py0-6,{a:"right"});
  g.strokeStyle=COL.wave;g.lineWidth=2.5;g.beginPath();
  for(var i=0;i<=240;i++){var v=i/240*.9949;var gg=1/Math.sqrt(1-v*v);if(i)g.lineTo(X(v),Y(gg));else g.moveTo(X(v),Y(gg))}g.stroke();
  g.fillStyle=COL.vec;g.strokeStyle=COL.surface;g.lineWidth=2;g.beginPath();g.arc(X(b),Y(gm),6,0,TAU);g.fill();g.stroke();
  txt("γ = "+f(gm,2),clamp(X(b)-12,px+60,px+pw-4),Y(gm)-12>py0-14?Y(gm)-12:Y(gm)+22,{a:"right",c:COL.vec,font:"500 12px "+MONO});
  var te=b>.0005?P.d/b:Infinity;
  out("gm",f(gm,3));out("te",b>.0005?fmtYr(te):"—");out("ts",b>.0005?fmtYr(te/gm):"—");out("len",f(100/gm,1)+" m");
 }});

/* ---- Quantum ---- */
LABS.push({id:"quantum",title:"Particle in a Box",field:"Quantum Mechanics",level:3,formula:"Eₙ = n² h² / 8 m L²",
 blurb:"An electron trapped between two walls can only have certain energies. Each allowed state is a standing wave.",
 tryit:"Squeeze the box to 0.2 nm and watch the energies climb. Then compare the n → 1 photon colours.",
 controls:[{k:"n",l:"Energy level n",min:1,max:8,step:1,v:3},{k:"L",l:"Box width L",min:.2,max:2,step:.01,v:.5,u:" nm"},{k:"view",l:"Show",type:"select",opts:[["Wave ψ and probability |ψ|²","b"],["Wave ψ only","w"],["Probability |ψ|² only","p"]],v:"b"}],
 buttons:[],
 readouts:[["en","Energy Eₙ"],["lam","de Broglie wavelength"],["nodes","Nodes"],["ph","Photon for n → 1"]],
 init:function(){ST={t:0}},
 frame:function(dt){
  ST.t+=dt;var n=P.n,L=P.L,E1=.376/(L*L),En=n*n*E1;
  var lx0=12,lx1=W*.3,top=34,bot=H-30,ey=function(m){return bot-(m*m)/64*(bot-top)};
  txt("Energy levels",lx0,20,{c:COL.ink});
  for(var m=1;m<=8;m++){var y=ey(m),sel=m===n;g.strokeStyle=sel?COL.vec:COL.line;g.lineWidth=sel?3:1.5;g.beginPath();g.moveTo(lx0+34,y);g.lineTo(lx1,y);g.stroke();txt("n="+m,lx0,y+4,{c:sel?COL.vec:COL.muted})}
  var wx0=W*.42,wx1=W*.95,ww=wx1-wx0,y0=H*.3,a1=H*.16,fl=H*.86,a2=H*.3,i,u,N=160;
  g.strokeStyle=COL.ink;g.lineWidth=3;g.beginPath();g.moveTo(wx0,H*.08);g.lineTo(wx0,fl);g.lineTo(wx1,fl);g.lineTo(wx1,H*.08);g.stroke();
  g.strokeStyle=COL.line;g.lineWidth=1;g.setLineDash([4,5]);g.beginPath();g.moveTo(wx0,y0);g.lineTo(wx1,y0);g.stroke();g.setLineDash([]);
  if(P.view!=="p"){var ph=Math.cos(1.4*n*ST.t);g.strokeStyle=COL.vec;g.lineWidth=2.5;g.beginPath();
    for(i=0;i<=N;i++){u=i/N;var yy=y0-a1*Math.sin(n*Math.PI*u)*ph;if(i)g.lineTo(wx0+u*ww,yy);else g.moveTo(wx0+u*ww,yy)}g.stroke();
    txt("ψ(x), slowed down",wx0+8,H*.08+14,{c:COL.vec})}
  if(P.view!=="w"){g.beginPath();g.moveTo(wx0,fl);for(i=0;i<=N;i++){u=i/N;g.lineTo(wx0+u*ww,fl-a2*Math.pow(Math.sin(n*Math.PI*u),2))}g.lineTo(wx1,fl);g.closePath();
    g.fillStyle=COL.wave;g.globalAlpha=.35;g.fill();g.globalAlpha=1;g.strokeStyle=COL.wave;g.lineWidth=2;g.stroke();
    txt("|ψ|²",wx1-8,fl-a2-6,{a:"right",c:COL.wave})}
  g.fillStyle=COL.ink;for(var k=1;k<n;k++){g.beginPath();g.arc(wx0+k/n*ww,y0,3.2,0,TAU);g.fill()}
  txt("0",wx0,fl+16,{a:"center"});txt("L = "+f(L,2)+" nm",wx1,fl+16,{a:"right"});
  out("en",f(En,2)+" eV");out("lam",f(2*L/n,2)+" nm");out("nodes",String(n-1));
  if(n===1)out("ph","—");else{var dE=En-E1,wl=1239.84/dE,c=wl2rgb(wl);
    out("ph",f(wl,0)+" nm"+(c?'<i class="sw" style="background:rgb('+c.join(",")+')"></i>':" (invisible)"))}
 }});

/* =========================================================
   LAB UI
   ========================================================= */
function el(t,c,h){var e=document.createElement(t);if(c)e.className=c;if(h!=null)e.innerHTML=h;return e}
function pips(l){if(l===0)return '<i class="pip on"></i>';var s="";for(var i=0;i<3;i++)s+='<i class="pip'+(i<l?" on":"")+'"></i>';return s}

var tabsEl=$("#tabs");
LABS.forEach(function(l){
  var b=el("button","tab",null);b.type="button";b.setAttribute("role","tab");b.dataset.id=l.id;
  var t=el("span",null,null);t.textContent=l.title;
  var s=el("small",null,null);s.textContent=l.field+" · "+LVN[l.level];
  b.append(t,s);b.addEventListener("click",function(){openLab(l.id)});tabsEl.append(b);
});

function buildControls(){
  var box=$("#controls");box.innerHTML="";P={};
  lab.controls.forEach(function(c){
    var w=el("div","ctl"),id="c-"+c.k,l=el("label",null,null);l.htmlFor=id;l.textContent=c.l;w.append(l);
    if(c.type==="select"){
      var s=document.createElement("select");s.id=id;
      c.opts.forEach(function(o){var op=document.createElement("option");op.value=String(o[1]);op.textContent=o[0];s.append(op)});
      s.value=String(c.v);P[c.k]=c.v;
      s.addEventListener("input",function(){P[c.k]=typeof c.v==="number"?+s.value:s.value;if(lab.change)lab.change(c.k)});
      w.append(s);
    }else{
      var dec=(String(c.step).split(".")[1]||"").length,o=document.createElement("output");o.setAttribute("for",id);
      var i=document.createElement("input");i.type="range";i.id=id;i.min=c.min;i.max=c.max;i.step=c.step;i.value=c.v;P[c.k]=c.v;
      var show=function(){o.textContent=f(i.value,dec)+(c.u||"")};show();
      i.addEventListener("input",function(){P[c.k]=+i.value;show();if(lab.change)lab.change(c.k)});
      w.append(o,i);
    }
    box.append(w)});
}
function buildButtons(){
  var box=$("#btns");box.innerHTML="";
  var pb=el("button","btn",null);pb.type="button";pb.textContent=paused?"Play":"Pause";
  lab.buttons.forEach(function(b){
    var e=el("button","btn"+(b.primary?" primary":""),null);e.type="button";e.textContent=b.t;
    e.addEventListener("click",function(){paused=false;pb.textContent="Pause";b.fn.call(lab)});
    box.append(e)});
  pb.addEventListener("click",function(){paused=!paused;pb.textContent=paused?"Play":"Pause"});
  box.append(pb);
}
function buildReadouts(){
  var box=$("#readouts");box.innerHTML="";outs={};
  lab.readouts.forEach(function(r){var d=el("div","ro",null),s=el("span",null,null),b=el("b",null,null);
    s.textContent=r[1];b.textContent="—";d.append(s,b);box.append(d);outs[r[0]]=b});
}
function openLab(id){
  var l=LABS.filter(function(x){return x.id===id})[0];if(!l)return;
  lab=l;
  $$("#tabs .tab").forEach(function(b){b.setAttribute("aria-selected",b.dataset.id===id?"true":"false")});
  $("#ltitle").textContent=l.title;$("#blurb").textContent=l.blurb;$("#ltry").textContent=l.tryit;$("#formula").textContent=l.formula;
  $("#lvl").innerHTML=pips(l.level)+" "+LVN[l.level]+" · "+l.field;
  cv.setAttribute("aria-label",l.title+" simulation. "+l.formula);
  var lid=LAB2LESSON[id],ctx=$("#labctx");
  if(lid){ctx.innerHTML="";var b=el("button",null,null);b.type="button";b.textContent="Lesson: "+byId[lid].t+" →";
    b.addEventListener("click",function(){openLesson(lid)});ctx.append("From ",b)}
  else ctx.textContent="";
  buildControls();buildButtons();buildReadouts();fit();readCols();ST={};l.init();
  requestAnimationFrame(fit);
}

/* =========================================================
   PATH RENDER
   ========================================================= */
var FIELDS=["Foundations","Mechanics","Fluid Dynamics","Waves & Sound","Thermodynamics",
  "Electricity & Magnetism","Optics","Relativity","Quantum Mechanics","Statistical Mechanics",
  "Condensed Matter","Nuclear & Particle","Astrophysics & Cosmology"];
var CHAPDESC=[
  "The tools. Units, graphs, vectors, algebra and calculus — nothing physics-specific yet, but everything below needs them.",
  "The first real ideas. Motion, forces, pressure, waves, heat, charge, light and frames of reference.",
  "The working core. Energy, orbits, interference, entropy, induction, relativity and the atom.",
  "The frontier. Lagrangians, chaos, Navier–Stokes, Maxwell, general relativity, quantum fields and cosmology."
];

var fLevel=-1,fField="all",fSaved=false;
var nodeCb={};

function renderChips(){
  var lc=$("#levelChips");lc.innerHTML="";
  [["All levels",-1],["Foundations",0],["Basic",1],["Intermediate",2],["Advanced",3]].forEach(function(p){
    var b=el("button","chip",null);b.type="button";b.textContent=p[0];
    b.setAttribute("aria-pressed",fLevel===p[1]?"true":"false");
    b.addEventListener("click",function(){fLevel=p[1];renderChips();renderPath()});
    lc.append(b);
  });
  var s=el("button","chip savedchip",null);s.type="button";
  s.innerHTML="★ Saved <b id='savedBadge'>"+(Object.keys(saved).length||"")+"</b>";
  s.setAttribute("aria-pressed",fSaved?"true":"false");
  s.addEventListener("click",function(){fSaved=!fSaved;renderChips();renderPath()});
  lc.append(s);

  var fc=$("#fieldChips");fc.innerHTML="";
  [["All tracks","all"]].concat(FIELDS.map(function(x){return [x,x]})).forEach(function(p){
    var b=el("button","chip",null);b.type="button";b.textContent=p[0];
    b.setAttribute("aria-pressed",fField===p[1]?"true":"false");
    b.addEventListener("click",function(){fField=p[1];renderChips();renderPath()});
    fc.append(b);
  });
}

function nodeEl(x,idx){
  var n=el("article","node"+(done[x.id]?" done":""));
  n.dataset.id=x.id;n.tabIndex=0;
  n.innerHTML=
    '<div class="rail"><span class="dot"></span></div>'+
    '<div class="card">'+
      '<div class="top"><h4>'+esc(x.t)+'</h4>'+
        '<button class="svbtn'+(saved[x.id]?" on":"")+'" type="button" aria-pressed="'+(!!saved[x.id])+'" aria-label="Save lesson" title="Save for later">'+
          '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M6 3h12a1 1 0 0 1 1 1v17l-7-4.2L5 21V4a1 1 0 0 1 1-1z"/></svg>'+
        '</button>'+
      '</div>'+
      '<p class="real">'+esc(x.real)+'</p>'+
      '<div class="foot"><code>'+esc(x.math)+'</code>'+
        (x.need.length?'<span class="needs">needs '+x.need.length+'</span>':'<span class="needs root">start here</span>')+
      '</div>'+
    '</div>';
  var sv=n.querySelector(".svbtn");
  sv.addEventListener("click",function(e){e.stopPropagation();toggleSave(x.id)});
  n.addEventListener("click",function(){openLesson(x.id)});
  n.addEventListener("keydown",function(e){if(e.key==="Enter"||e.key===" "){e.preventDefault();openLesson(x.id)}});
  n.addEventListener("mouseenter",function(){highlight(x.id)});
  n.addEventListener("mouseleave",clearHighlight);
  n.addEventListener("focus",function(){highlight(x.id)});
  n.addEventListener("blur",clearHighlight);
  nodeCb[x.id]=n;
  return n;
}

function renderPath(){
  var root=$("#chapters");root.innerHTML="";nodeCb={};
  var shown=LESSONS.filter(function(x){
    if(fSaved&&!saved[x.id])return false;
    if(fField!=="all"&&x.f!==fField)return false;
    if(fLevel>=0&&x.l!==fLevel)return false;
    return true;
  });
  if(!shown.length){
    root.innerHTML='<p class="empty">'+(fSaved?"Nothing saved yet. Tap the bookmark on any lesson to keep it here.":"No lessons match that filter. Try widening it.")+'</p>';
    return;
  }
  var counter=0;
  [0,1,2,3].forEach(function(L){
    var ls=shown.filter(function(x){return x.l===L});
    if(!ls.length)return;
    var chap=el("section","chapter");
    var head=el("div","chap-head");
    head.innerHTML='<span class="chap-num">'+String(L).padStart(2,"0")+'</span>'+
      '<div><h3>'+LVN[L]+'</h3><p>'+CHAPDESC[L]+'</p></div>';
    chap.append(head);
    var flds=[];ls.forEach(function(x){if(flds.indexOf(x.f)<0)flds.push(x.f)});
    flds.forEach(function(fn){
      var grp=el("div","fgroup");
      grp.append(el("div","fgroup-h",esc(fn)));
      var list=el("div","nodelist");
      ls.filter(function(x){return x.f===fn}).forEach(function(x){counter++;list.append(nodeEl(x,counter))});
      grp.append(list);chap.append(grp);
    });
    root.append(chap);
  });
  updateProgress();
}

function highlight(id){
  var A=ANC[id],D=DES[id];
  root_hover(true);
  $$("#chapters .node").forEach(function(n){
    var i=n.dataset.id;
    n.classList.toggle("hl-self",i===id);
    n.classList.toggle("hl-anc",!!A[i]);
    n.classList.toggle("hl-desc",!!D[i]);
  });
}
function root_hover(on){$("#chapters").classList.toggle("hovering",on)}
function clearHighlight(){
  root_hover(false);
  $$("#chapters .node").forEach(function(n){n.classList.remove("hl-self","hl-anc","hl-desc")});
}

/* ---------- progress ---------- */
function updateProgress(){
  var tot=LESSONS.length,dn=0;
  LESSONS.forEach(function(l){if(done[l.id])dn++});
  var pct=Math.round(dn/tot*100);
  $("#progCount").textContent=dn+" of "+tot;
  $("#ringPct").textContent=pct+"%";
  var C=2*Math.PI*27;
  $("#ringFill").setAttribute("stroke-dashoffset",String(C-(C*dn/tot)));
  $("#progSub").textContent=dn===0?"Tick a foundation to begin":dn===tot?"Every lesson ticked. Now go and break something.":"Keep climbing — the next rung is always ready.";
  var sc=Object.keys(saved).length;
  $("#savedCount").textContent=sc?sc:"";
  var badge=$("#savedBadge");if(badge)badge.textContent=sc||"";
  renderNext();
}

function nextLesson(){
  for(var i=0;i<LESSONS.length;i++){
    var l=LESSONS[i];
    if(done[l.id])continue;
    var ok=true;
    for(var j=0;j<l.need.length;j++)if(!done[l.need[j]]){ok=false;break}
    if(ok)return l;
  }
  return null;
}
function renderNext(){
  var box=$("#nextup");
  var l=nextLesson();
  if(!l){
    var all=LESSONS.every(function(x){return done[x.id]});
    box.innerHTML='<div><span class="nlabel">'+(all?"Course complete":"Nothing unlocked")+'</span>'+
      '<h3>'+(all?"Every lesson ticked.":"Waiting on prerequisites")+'</h3>'+
      '<p>'+(all?"You have covered the whole map. Go and break something in the lab bench."
        :"Some lessons are waiting on earlier ones. Tick the ones marked “start here” first.")+'</p></div>';
    return;
  }
  box.innerHTML=
    '<div><span class="nlabel">Next up · you have everything it needs</span>'+
    '<h3>'+esc(l.t)+'</h3>'+
    '<p>'+esc(l.idea.slice(0,140))+(l.idea.length>140?"…":"")+'</p></div>'+
    '<button class="btn primary" type="button" id="nextOpen">Open lesson</button>';
  $("#nextOpen").addEventListener("click",function(){openLesson(l.id)});
}

/* =========================================================
   SAVE / LEARN
   ========================================================= */
function toggleSave(id){
  if(saved[id])delete saved[id];else saved[id]=1;
  saveSaved();
  var n=nodeCb[id];
  if(n){var b=n.querySelector(".svbtn");if(b){b.classList.toggle("on",!!saved[id]);b.setAttribute("aria-pressed",String(!!saved[id]))}}
  if(fSaved)renderPath();
  updateProgress();
  if(curId===id)syncFooter();
}
function toggleDone(id){
  if(done[id])delete done[id];else done[id]=1;
  saveDone();
  var n=nodeCb[id];
  if(n)n.classList.toggle("done",!!done[id]);
  updateProgress();
  if(curId===id)syncFooter();
}

/* =========================================================
   DRAWER
   ========================================================= */
var drawer=$("#drawer"),scrim=$("#scrim"),curId=null,lastFocus=null,deepLoaded={};

function syncFooter(){
  var sv=$("#drSave"),dn=$("#drDone");
  sv.textContent=saved[curId]?"★ Saved":"Save for later";
  sv.classList.toggle("onred",!!saved[curId]);
  dn.textContent=done[curId]?"Learned ✓":"Mark as learned";
  dn.classList.toggle("onok",!!done[curId]);
}
function setTab(name){
  $$(".dtab").forEach(function(b){b.setAttribute("aria-selected",b.dataset.tab===name?"true":"false")});
  $$(".panel-tab").forEach(function(p){p.classList.toggle("on",p.id==="tp-"+name)});
  if(name==="deep")loadDeep(curId);
}

function openLesson(id){
  var L=byId[id];if(!L)return;
  lastFocus=document.activeElement;
  curId=id;
  $("#drLvl").innerHTML=pips(L.l)+" "+LVN[L.l];
  $("#drTitle").textContent=L.t;
  $("#drField").textContent=L.f;
  $("#dIdea").textContent=L.idea;
  $("#dEq").textContent=L.math;
  $("#dNote").textContent=L.note;
  $("#dReal").textContent=L.real;
  $("#dDeepHint").textContent=L.l>=2
    ? "Intermediate / advanced topic — pull a longer explanation, written by people who went further."
    : "A longer explanation pulled live from Wikipedia when you need more depth.";
  $("#dDeep").innerHTML="";
  delete deepLoaded[id];

  var labBtn=$("#dLabBtn");
  if(L.lab){labBtn.style.display="";labBtn.onclick=function(){closeDrawer();openLab(L.lab);
    document.getElementById("labsec").scrollIntoView({behavior:RM?"auto":"smooth",block:"start"})}}
  else labBtn.style.display="none";

  var nd=$("#dNeed");nd.innerHTML="";
  if(!L.need.length)nd.innerHTML='<span class="none">Nothing — this is a starting point.</span>';
  L.need.forEach(function(k){
    if(!byId[k])return;
    var b=el("button","cbtn"+(done[k]?" done":""),null);b.type="button";b.textContent=byId[k].t;
    b.addEventListener("click",function(){openLesson(k)});nd.append(b);
  });

  var un=$("#dUnlock");un.innerHTML="";
  var uk=UNL[id]||[];
  if(!uk.length)un.innerHTML='<span class="none">Nothing in this course yet — it is a leaf.</span>';
  uk.forEach(function(k){
    var b=el("button","cbtn"+(done[k]?" done":""),null);b.type="button";b.textContent=byId[k].t;
    b.addEventListener("click",function(){openLesson(k)});un.append(b);
  });

  syncFooter();
  setTab("idea");

  drawer.classList.add("on");drawer.setAttribute("aria-hidden","false");
  scrim.classList.add("on");document.body.classList.add("locked");
  requestAnimationFrame(function(){$("#drClose").focus()});
}
function closeDrawer(){
  drawer.classList.remove("on");drawer.setAttribute("aria-hidden","true");
  scrim.classList.remove("on");document.body.classList.remove("locked");
  if(lastFocus&&lastFocus.focus)try{lastFocus.focus()}catch(e){}
  curId=null;
}
$("#drClose").addEventListener("click",closeDrawer);
scrim.addEventListener("click",closeDrawer);
document.addEventListener("keydown",function(e){if(e.key==="Escape"&&drawer.classList.contains("on"))closeDrawer()});
$$(".dtab").forEach(function(b){b.addEventListener("click",function(){setTab(b.dataset.tab)})});
$("#drSave").addEventListener("click",function(){if(curId)toggleSave(curId)});
$("#drDone").addEventListener("click",function(){if(curId)toggleDone(curId)});

/* =========================================================
   WIKIPEDIA DEEP DIVE
   ========================================================= */
function loadDeep(id){
  if(!id)return;
  var L=byId[id],box=$("#dDeep");
  if(deepLoaded[id])return;
  deepLoaded[id]=1;
  box.innerHTML='<div class="skel"><div></div><div></div><div></div><div></div></div>';

  var wtitle=L.wiki||L.t;
  var url="https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&redirects=1"+
          "&prop=extracts|pageimages&exintro=1&explaintext=1&piprop=thumbnail&pithumbsize=720"+
          "&titles="+encodeURIComponent(wtitle);

  fetch(url).then(function(r){
    if(!r.ok)throw new Error("HTTP "+r.status);
    return r.json();
  }).then(function(j){
    var pages=(j.query&&j.query.pages)||{};
    var key=Object.keys(pages)[0];
    var p=pages[key];
    if(!p||p.missing!==undefined||!p.extract){
      throw new Error("missing");
    }
    var html="";
    if(p.thumbnail&&p.thumbnail.source){
      html+='<img class="wikiimg" src="'+esc(p.thumbnail.source)+'" alt="" loading="lazy">';
    }
    html+=p.extract.split(/\n\n+/).filter(Boolean).slice(0,6)
      .map(function(par){return '<p class="wikip">'+esc(par)+'</p>'}).join("");
    html+='<a class="wikilink" target="_blank" rel="noopener" href="https://en.wikipedia.org/wiki/'+
      encodeURIComponent(wtitle)+'">Read the full article on Wikipedia ↗</a>';
    if(curId===id)box.innerHTML=html;
  }).catch(function(){
    if(curId!==id)return;
    box.innerHTML='<p class="note" style="margin-bottom:14px">Could not load the article right now — the connection may be blocked. '+
      'You can still open it directly.</p>'+
      '<a class="wikilink" target="_blank" rel="noopener" href="https://en.wikipedia.org/wiki/'+
      encodeURIComponent(wtitle)+'">Open on Wikipedia ↗</a>';
  });
}

/* =========================================================
   CHROME: nav, theme, parallax, reveal, counters
   ========================================================= */
$$("[data-go]").forEach(function(b){
  b.addEventListener("click",function(){
    var t=document.getElementById(b.dataset.go);
    if(t)t.scrollIntoView({behavior:RM?"auto":"smooth",block:"start"});
  });
});
$("#navSaved").addEventListener("click",function(){
  fSaved=true;fLevel=-1;fField="all";renderChips();renderPath();
  document.getElementById("pathsec").scrollIntoView({behavior:RM?"auto":"smooth",block:"start"});
});
$("#savedBtn").addEventListener("click",function(){
  fSaved=true;fLevel=-1;fField="all";renderChips();renderPath();
  document.getElementById("pathsec").scrollIntoView({behavior:RM?"auto":"smooth",block:"start"});
});
$("#startBtn").addEventListener("click",function(){
  var first=LESSONS[0];
  var l=nextLesson();
  if(l)openLesson(l.id);else openLesson(first.id);
});
$("#labBtn").addEventListener("click",function(){
  document.getElementById("labsec").scrollIntoView({behavior:RM?"auto":"smooth",block:"start"});
});

/* theme */
var root=document.documentElement;
var storedTheme=null;try{storedTheme=localStorage.getItem("rp.theme")}catch(e){}
if(storedTheme)root.setAttribute("data-theme",storedTheme);
$("#themeBtn").addEventListener("click",function(){
  var cur=root.getAttribute("data-theme");
  var next=cur==="light"?"dark":"light";
  root.setAttribute("data-theme",next);
  try{localStorage.setItem("rp.theme",next)}catch(e){}
  readCols();
});

/* scroll progress */
var sb=$("#scrollbar");
function onScroll(){
  var h=document.documentElement.scrollHeight-window.innerHeight;
  sb.style.width=(h>0?(window.scrollY/h)*100:0)+"%";
}
addEventListener("scroll",onScroll,{passive:true});onScroll();

/* parallax */
var pars=$$("[data-par]"),hero=$("#hero"),mx=0,my=0,sy=0;
if(!RM){
  addEventListener("scroll",function(){sy=window.scrollY},{passive:true});
  hero.addEventListener("mousemove",function(e){
    var r=hero.getBoundingClientRect();
    mx=((e.clientX-r.left)/r.width-.5)*2;
    my=((e.clientY-r.top)/r.height-.5)*2;
  });
  hero.addEventListener("mouseleave",function(){mx=0;my=0});
}
var px=0,py=0;
function parallaxLoop(){
  px+=(mx-px)*.06;py+=(my-py)*.06;
  for(var i=0;i<pars.length;i++){
    var e=pars[i],s=parseFloat(e.dataset.par)||0;
    var sx=parseFloat(e.dataset.mx)||0,sy2=parseFloat(e.dataset.my)||0;
    var tx=px*sx,ty=py*sy2+sy*s;
    e.style.transform="translate3d("+tx.toFixed(2)+"px,"+ty.toFixed(2)+"px,0)";
  }
  requestAnimationFrame(parallaxLoop);
}
if(!RM)requestAnimationFrame(parallaxLoop);

/* reveal */
if("IntersectionObserver" in window){
  var io=new IntersectionObserver(function(es){
    es.forEach(function(e){if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target)}})
  },{rootMargin:"0px 0px -8% 0px",threshold:.08});
  $$(".rv").forEach(function(e){io.observe(e)});
}else{
  $$(".rv").forEach(function(e){e.classList.add("in")});
}

/* counters */
(function(){
  var els=$$("[data-count]");
  if(!("IntersectionObserver" in window)||RM){els.forEach(function(e){e.textContent=e.dataset.count});return}
  var co=new IntersectionObserver(function(es){
    es.forEach(function(en){
      if(!en.isIntersecting)return;
      var e=en.target,target=+e.dataset.count,t0=performance.now(),dur=1100;
      function step(t){
        var k=Math.min(1,(t-t0)/dur),v=Math.round(target*(1-Math.pow(1-k,3)));
        e.textContent=v;
        if(k<1)requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
      co.unobserve(e);
    });
  },{threshold:.4});
  els.forEach(function(e){co.observe(e)});
})();

/* =========================================================
   BOOT
   ========================================================= */
renderChips();
renderPath();
openLab("projectile");

var lastT=0,tk=0;
function loop(now){
  var dt=Math.min(.05,(now-lastT)/1000||0);lastT=now;
  if(++tk%30===1)readCols();
  g.clearRect(0,0,W,H);bgGrid();
  if(lab)lab.frame(paused?0:dt);
  requestAnimationFrame(loop);
}
requestAnimationFrame(function(t){lastT=t;requestAnimationFrame(loop)});
})();