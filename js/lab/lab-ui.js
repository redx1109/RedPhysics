"use strict";
/* =========================================================
   LAB UI
   ========================================================= */
function el(t,c,h){var e=document.createElement(t);if(c)e.className=c;if(h!=null)e.innerHTML=h;return e}
function pips(l){if(l===0)return '<i class="pip on"></i>';var s="";for(var i=0;i<3;i++)s+='<i class="pip'+(i<l?" on":"")+'"></i>';return s}

var tabsEl=$("#tabs");
LABS.forEach(function(l){
  var b=el("button","tab",null);b.type="button";b.setAttribute("role","tab");b.dataset.id=l.id;
  var t=el("span",null,null);t.textContent=l.title;
  var s=el("small",null,null);s.textContent=l.field+" · "+LVN[l.level];
  b.append(t,s);b.addEventListener("click",function(){openLab(l.id)});tabsEl.append(b);
});

function buildControls(){
  var box=$("#controls");box.innerHTML="";P={};
  lab.controls.forEach(function(c){
    var w=el("div","ctl"),id="c-"+c.k,l=el("label",null,null);l.htmlFor=id;l.textContent=c.l;w.append(l);
    if(c.type==="select"){
      var s=document.createElement("select");s.id=id;
      c.opts.forEach(function(o){var op=document.createElement("option");op.value=String(o[1]);op.textContent=o[0];s.append(op)});
      s.value=String(c.v);P[c.k]=c.v;
      s.addEventListener("input",function(){P[c.k]=typeof c.v==="number"?+s.value:s.value;if(lab.change)lab.change(c.k)});
      w.append(s);
    }else{
      var dec=(String(c.step).split(".")[1]||"").length,o=document.createElement("output");o.setAttribute("for",id);
      var i=document.createElement("input");i.type="range";i.id=id;i.min=c.min;i.max=c.max;i.step=c.step;i.value=c.v;P[c.k]=c.v;
      var show=function(){o.textContent=f(i.value,dec)+(c.u||"")};show();
      i.addEventListener("input",function(){P[c.k]=+i.value;show();if(lab.change)lab.change(c.k)});
      w.append(o,i);
    }
    box.append(w)});
}
function buildButtons(){
  var box=$("#btns");box.innerHTML="";
  var pb=el("button","btn",null);pb.type="button";pb.textContent=paused?"Play":"Pause";
  lab.buttons.forEach(function(b){
    var e=el("button","btn"+(b.primary?" primary":""),null);e.type="button";e.textContent=b.t;
    e.addEventListener("click",function(){paused=false;pb.textContent="Pause";b.fn.call(lab)});
    box.append(e)});
  pb.addEventListener("click",function(){paused=!paused;pb.textContent=paused?"Play":"Pause"});
  box.append(pb);
}
function buildReadouts(){
  var box=$("#readouts");box.innerHTML="";outs={};
  lab.readouts.forEach(function(r){var d=el("div","ro",null),s=el("span",null,null),b=el("b",null,null);
    s.textContent=r[1];b.textContent="—";d.append(s,b);box.append(d);outs[r[0]]=b});
}
function openLab(id){
  var l=LABS.filter(function(x){return x.id===id})[0];if(!l)return;
  lab=l;
  $$("#tabs .tab").forEach(function(b){b.setAttribute("aria-selected",b.dataset.id===id?"true":"false")});
  $("#ltitle").textContent=l.title;$("#blurb").textContent=l.blurb;$("#ltry").textContent=l.tryit;$("#formula").textContent=l.formula;
  $("#lvl").innerHTML=pips(l.level)+" "+LVN[l.level]+" · "+l.field;
  cv.setAttribute("aria-label",l.title+" simulation. "+l.formula);
  var lid=LAB2LESSON[id],ctx=$("#labctx");
  if(lid){ctx.innerHTML="";var b=el("button",null,null);b.type="button";b.textContent="Lesson: "+byId[lid].t+" →";
    b.addEventListener("click",function(){openLesson(lid)});ctx.append("From ",b)}
  else ctx.textContent="";
  buildControls();buildButtons();buildReadouts();fit();readCols();ST={};l.init();
  requestAnimationFrame(fit);
}
