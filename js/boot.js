"use strict";
/* =========================================================
   BOOT
   ========================================================= */
renderChips();
renderPath();
openLab("projectile");

/* pause the sim while the lab is scrolled out of view (saves phone battery) */
var labOn=true;
if("IntersectionObserver" in window)new IntersectionObserver(function(e){labOn=e[0].isIntersecting},{rootMargin:"200px"}).observe(cv);

var lastT=0,tk=0;
function loop(now){
  var dt=Math.min(.05,(now-lastT)/1000||0);lastT=now;
  if(!labOn){requestAnimationFrame(loop);return}
  if(++tk%30===1)readCols();
  g.clearRect(0,0,W,H);bgGrid();
  if(lab)lab.frame(paused?0:dt);
  requestAnimationFrame(loop);
}
requestAnimationFrame(function(t){lastT=t;requestAnimationFrame(loop)});
