"use strict";
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
