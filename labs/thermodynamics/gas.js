"use strict";
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
