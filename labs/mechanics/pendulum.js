"use strict";
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
