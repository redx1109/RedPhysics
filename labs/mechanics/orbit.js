"use strict";
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
