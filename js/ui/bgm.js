"use strict";
/* Ambient background music, synthesised with Web Audio (no audio file, no copyright).
   Phones block autoplay, so it only starts when the ♪ button is tapped. */
(function(){
  var btn=document.getElementById("bgmBtn");
  if(!btn)return;
  var AC=window.AudioContext||window.webkitAudioContext;
  if(!AC){btn.style.display="none";return}
  var ctx,master,timer,on=false,ci=0;
  var chords=[[110,164.81,220,277.18],[98,146.83,196,246.94],[87.31,130.81,174.61,220],[98,146.83,196,293.66]];
  function pad(fr,t,d){
    var o=ctx.createOscillator(),g=ctx.createGain(),f=ctx.createBiquadFilter();
    o.type="sine";o.frequency.value=fr;o.detune.value=(Math.random()-.5)*12;
    f.type="lowpass";f.frequency.value=900;
    g.gain.setValueAtTime(0,t);
    g.gain.linearRampToValueAtTime(.08,t+d*.4);
    g.gain.linearRampToValueAtTime(0,t+d);
    o.connect(f);f.connect(g);g.connect(master);
    o.start(t);o.stop(t+d+.1);
  }
  function next(){
    var t=ctx.currentTime;
    chords[ci++%chords.length].forEach(function(fr){pad(fr,t,8)});
    timer=setTimeout(next,6000);
  }
  function start(){
    if(!ctx){
      ctx=new AC();
      master=ctx.createGain();master.gain.value=0;master.connect(ctx.destination);
    }
    ctx.resume();
    master.gain.cancelScheduledValues(ctx.currentTime);
    master.gain.linearRampToValueAtTime(.7,ctx.currentTime+2);
    next();
  }
  function stop(){
    clearTimeout(timer);
    master.gain.cancelScheduledValues(ctx.currentTime);
    master.gain.linearRampToValueAtTime(0,ctx.currentTime+1);
    setTimeout(function(){if(!on)ctx.suspend()},1200);
  }
  btn.addEventListener("click",function(){
    on=!on;
    on?start():stop();
    btn.classList.toggle("on",on);
    btn.setAttribute("aria-pressed",on);
  });
  /* pause the music when the tab is hidden */
  document.addEventListener("visibilitychange",function(){
    if(!ctx||!on)return;
    document.hidden?ctx.suspend():ctx.resume();
  });
})();
