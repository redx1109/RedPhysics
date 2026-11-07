"use strict";
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
