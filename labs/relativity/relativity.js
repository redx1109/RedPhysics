"use strict";
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
