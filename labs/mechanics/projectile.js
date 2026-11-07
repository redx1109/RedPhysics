"use strict";
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
