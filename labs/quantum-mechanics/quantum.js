"use strict";
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
