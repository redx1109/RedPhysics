"use strict";
/* =========================================================
   CHROME: nav, theme, parallax, reveal, counters
   ========================================================= */
$$("[data-go]").forEach(function(b){
  b.addEventListener("click",function(){
    var t=document.getElementById(b.dataset.go);
    if(t)t.scrollIntoView({behavior:RM?"auto":"smooth",block:"start"});
  });
});
$("#navSaved").addEventListener("click",function(){
  fSaved=true;fLevel=-1;fField="all";renderChips();renderPath();
  document.getElementById("pathsec").scrollIntoView({behavior:RM?"auto":"smooth",block:"start"});
});
$("#savedBtn").addEventListener("click",function(){
  fSaved=true;fLevel=-1;fField="all";renderChips();renderPath();
  document.getElementById("pathsec").scrollIntoView({behavior:RM?"auto":"smooth",block:"start"});
});
$("#startBtn").addEventListener("click",function(){
  var first=LESSONS[0];
  var l=nextLesson();
  if(l)openLesson(l.id);else openLesson(first.id);
});
$("#labBtn").addEventListener("click",function(){
  document.getElementById("labsec").scrollIntoView({behavior:RM?"auto":"smooth",block:"start"});
});

/* theme */
var root=document.documentElement;
var storedTheme=null;try{storedTheme=localStorage.getItem("rp.theme")}catch(e){}
if(storedTheme)root.setAttribute("data-theme",storedTheme);
$("#themeBtn").addEventListener("click",function(){
  var cur=root.getAttribute("data-theme");
  var next=cur==="light"?"dark":"light";
  root.setAttribute("data-theme",next);
  try{localStorage.setItem("rp.theme",next)}catch(e){}
  readCols();
});

/* scroll progress */
var sb=$("#scrollbar");
function onScroll(){
  var h=document.documentElement.scrollHeight-window.innerHeight;
  sb.style.width=(h>0?(window.scrollY/h)*100:0)+"%";
}
addEventListener("scroll",onScroll,{passive:true});onScroll();

/* parallax */
var pars=$$("[data-par]"),hero=$("#hero"),mx=0,my=0,sy=0;
if(!RM){
  addEventListener("scroll",function(){sy=window.scrollY},{passive:true});
  hero.addEventListener("mousemove",function(e){
    var r=hero.getBoundingClientRect();
    mx=((e.clientX-r.left)/r.width-.5)*2;
    my=((e.clientY-r.top)/r.height-.5)*2;
  });
  hero.addEventListener("mouseleave",function(){mx=0;my=0});
}
var px=0,py=0;
function parallaxLoop(){
  if(sy>hero.offsetHeight+200){requestAnimationFrame(parallaxLoop);return} /* hero offscreen: skip work */
  px+=(mx-px)*.06;py+=(my-py)*.06;
  for(var i=0;i<pars.length;i++){
    var e=pars[i],s=parseFloat(e.dataset.par)||0;
    var sx=parseFloat(e.dataset.mx)||0,sy2=parseFloat(e.dataset.my)||0;
    var tx=px*sx,ty=py*sy2+sy*s;
    e.style.transform="translate3d("+tx.toFixed(2)+"px,"+ty.toFixed(2)+"px,0)";
  }
  requestAnimationFrame(parallaxLoop);
}
if(!RM)requestAnimationFrame(parallaxLoop);

/* reveal */
if("IntersectionObserver" in window){
  var io=new IntersectionObserver(function(es){
    es.forEach(function(e){if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target)}})
  },{rootMargin:"0px 0px -8% 0px",threshold:.08});
  $$(".rv").forEach(function(e){io.observe(e)});
}else{
  $$(".rv").forEach(function(e){e.classList.add("in")});
}

/* counters */
(function(){
  var els=$$("[data-count]");
  if(!("IntersectionObserver" in window)||RM){els.forEach(function(e){e.textContent=e.dataset.count});return}
  var co=new IntersectionObserver(function(es){
    es.forEach(function(en){
      if(!en.isIntersecting)return;
      var e=en.target,target=+e.dataset.count,t0=performance.now(),dur=1100;
      function step(t){
        var k=Math.min(1,(t-t0)/dur),v=Math.round(target*(1-Math.pow(1-k,3)));
        e.textContent=v;
        if(k<1)requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
      co.unobserve(e);
    });
  },{threshold:.4});
  els.forEach(function(e){co.observe(e)});
})();
