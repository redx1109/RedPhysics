"use strict";
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
