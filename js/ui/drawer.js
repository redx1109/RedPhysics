"use strict";
/* =========================================================
   DRAWER
   ========================================================= */
var drawer=$("#drawer"),scrim=$("#scrim"),curId=null,lastFocus=null,deepLoaded={};

function syncFooter(){
  var sv=$("#drSave"),dn=$("#drDone");
  sv.textContent=saved[curId]?"★ Saved":"Save for later";
  sv.classList.toggle("onred",!!saved[curId]);
  dn.textContent=done[curId]?"Learned ✓":"Mark as learned";
  dn.classList.toggle("onok",!!done[curId]);
}
function setTab(name){
  $$(".dtab").forEach(function(b){b.setAttribute("aria-selected",b.dataset.tab===name?"true":"false")});
  $$(".panel-tab").forEach(function(p){p.classList.toggle("on",p.id==="tp-"+name)});
  if(name==="deep")loadDeep(curId);
}

function openLesson(id){
  var L=byId[id];if(!L)return;
  lastFocus=document.activeElement;
  curId=id;
  $("#drLvl").innerHTML=pips(L.l)+" "+LVN[L.l];
  $("#drTitle").textContent=L.t;
  $("#drField").textContent=L.f;
  // Idea tab: idea + setup + pitfall
  var ideaHtml=esc(L.idea);
  if(L.setup)ideaHtml+='<div class="subblock"><h5>Setup</h5><p>'+esc(L.setup)+'</p></div>';
  if(L.pitfall)ideaHtml+='<div class="subblock pitfall"><h5>Common pitfall</h5><p>'+esc(L.pitfall)+'</p></div>';
  $("#dIdea").innerHTML=ideaHtml;

  // Maths tab: formula + note + formalism + derivation
  var eqHtml=esc(L.math);
  if(L.formalism)eqHtml+='<div class="subblock"><h5>Formalism</h5><p>'+esc(L.formalism)+'</p></div>';
  if(L.derivation)eqHtml+='<div class="subblock"><h5>Derivation sketch</h5><p>'+esc(L.derivation)+'</p></div>';
  $("#dEq").innerHTML=eqHtml;
  $("#dNote").textContent=L.note;

  // Real tab unchanged
  $("#dReal").textContent=L.real;
  $("#dDeepHint").textContent=L.l>=2
    ? "Intermediate / advanced topic — pull a longer explanation, written by people who went further."
    : "A longer explanation pulled live from Wikipedia when you need more depth.";

  // Build refs/problems once per open, cache on the lesson object
  var deepPre="";
  if(L.refs&&L.refs.length){
    deepPre+='<div class="subblock"><h5>Where to read it properly</h5><ul class="reflist">'+
      L.refs.map(function(r){return '<li>'+esc(r.a)+' — '+esc(r.c)+'</li>'}).join("")+
      '</ul></div>';
  }
  if(L.problems&&L.problems.length){
    deepPre+='<div class="subblock"><h5>Try these</h5><ol class="problist">'+
      L.problems.map(function(p){return '<li>'+esc(p)+'</li>'}).join("")+
      '</ol></div>';
  }
  L._deepPre=deepPre;

  $("#dDeep").innerHTML=deepPre;
  delete deepLoaded[id];

  var labBtn=$("#dLabBtn");
  if(L.lab){labBtn.style.display="";labBtn.onclick=function(){closeDrawer();openLab(L.lab);
    document.getElementById("labsec").scrollIntoView({behavior:RM?"auto":"smooth",block:"start"})}}
  else labBtn.style.display="none";

  var nd=$("#dNeed");nd.innerHTML="";
  if(!L.need.length)nd.innerHTML='<span class="none">Nothing — this is a starting point.</span>';
  L.need.forEach(function(k){
    if(!byId[k])return;
    var b=el("button","cbtn"+(done[k]?" done":""),null);b.type="button";b.textContent=byId[k].t;
    b.addEventListener("click",function(){openLesson(k)});nd.append(b);
  });

  var un=$("#dUnlock");un.innerHTML="";
  var uk=UNL[id]||[];
  if(!uk.length)un.innerHTML='<span class="none">Nothing in this course yet — it is a leaf.</span>';
  uk.forEach(function(k){
    var b=el("button","cbtn"+(done[k]?" done":""),null);b.type="button";b.textContent=byId[k].t;
    b.addEventListener("click",function(){openLesson(k)});un.append(b);
  });

  syncFooter();
  setTab("idea");

  drawer.classList.add("on");drawer.setAttribute("aria-hidden","false");
  scrim.classList.add("on");document.body.classList.add("locked");
  requestAnimationFrame(function(){$("#drClose").focus()});
}
function closeDrawer(){
  drawer.classList.remove("on");drawer.setAttribute("aria-hidden","true");
  scrim.classList.remove("on");document.body.classList.remove("locked");
  if(lastFocus&&lastFocus.focus)try{lastFocus.focus()}catch(e){}
  curId=null;
}
$("#drClose").addEventListener("click",closeDrawer);
scrim.addEventListener("click",closeDrawer);
document.addEventListener("keydown",function(e){if(e.key==="Escape"&&drawer.classList.contains("on"))closeDrawer()});
$$(".dtab").forEach(function(b){b.addEventListener("click",function(){setTab(b.dataset.tab)})});
$("#drSave").addEventListener("click",function(){if(curId)toggleSave(curId)});
$("#drDone").addEventListener("click",function(){if(curId)toggleDone(curId)});
