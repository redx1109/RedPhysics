"use strict";
/* =========================================================
   PATH RENDER
   ========================================================= */
var FIELDS=["Foundations","Mechanics","Fluid Dynamics","Waves & Sound","Thermodynamics",
  "Electricity & Magnetism","Optics","Relativity","Quantum Mechanics","Statistical Mechanics",
  "Condensed Matter","Nuclear & Particle","Astrophysics & Cosmology"];

var fLevel=-1,fField="all",fSaved=false;
var nodeCb={};

function renderChips(){
  var lc=$("#levelChips");lc.innerHTML="";
  [["All levels",-1],["Foundations",0],["Basic",1],["Intermediate",2],["Advanced",3]].forEach(function(p){
    var b=el("button","chip",null);b.type="button";b.textContent=p[0];
    b.setAttribute("aria-pressed",fLevel===p[1]?"true":"false");
    b.addEventListener("click",function(){fLevel=p[1];renderChips();renderPath()});
    lc.append(b);
  });
  var s=el("button","chip savedchip",null);s.type="button";
  s.innerHTML="★ Saved <b id='savedBadge'>"+(Object.keys(saved).length||"")+"</b>";
  s.setAttribute("aria-pressed",fSaved?"true":"false");
  s.addEventListener("click",function(){fSaved=!fSaved;renderChips();renderPath()});
  lc.append(s);

  var fc=$("#fieldChips");fc.innerHTML="";
  [["All tracks","all"]].concat(FIELDS.map(function(x){return [x,x]})).forEach(function(p){
    var b=el("button","chip",null);b.type="button";b.textContent=p[0];
    b.setAttribute("aria-pressed",fField===p[1]?"true":"false");
    b.addEventListener("click",function(){fField=p[1];renderChips();renderPath()});
    fc.append(b);
  });
}

function nodeEl(x,idx){
  var n=el("article","node"+(done[x.id]?" done":""));
  n.dataset.id=x.id;n.tabIndex=0;
  n.innerHTML=
    '<div class="rail"><span class="dot"></span></div>'+
    '<div class="card">'+
      '<div class="top"><h4>'+esc(x.t)+'</h4>'+
        '<button class="svbtn'+(saved[x.id]?" on":"")+'" type="button" aria-pressed="'+(!!saved[x.id])+'" aria-label="Save lesson" title="Save for later">'+
          '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M6 3h12a1 1 0 0 1 1 1v17l-7-4.2L5 21V4a1 1 0 0 1 1-1z"/></svg>'+
        '</button>'+
      '</div>'+
      '<p class="real">'+esc(x.real)+'</p>'+
      '<div class="foot"><code>'+esc(x.math)+'</code>'+
        (x.need.length?'<span class="needs">needs '+x.need.length+'</span>':'<span class="needs root">start here</span>')+
      '</div>'+
    '</div>';
  var sv=n.querySelector(".svbtn");
  sv.addEventListener("click",function(e){e.stopPropagation();toggleSave(x.id)});
  n.addEventListener("click",function(){openLesson(x.id)});
  n.addEventListener("keydown",function(e){if(e.key==="Enter"||e.key===" "){e.preventDefault();openLesson(x.id)}});
  if(matchMedia("(hover:hover)").matches){ /* touch screens have no hover: skip, or taps leave the path dimmed */
    n.addEventListener("mouseenter",function(){highlight(x.id)});
    n.addEventListener("mouseleave",clearHighlight);
  }
  n.addEventListener("focus",function(){if(n.matches(":focus-visible"))highlight(x.id)}); /* keyboard only */
  n.addEventListener("blur",clearHighlight);
  nodeCb[x.id]=n;
  return n;
}

function renderPath(){
  var root=$("#chapters");root.innerHTML="";nodeCb={};
  var shown=LESSONS.filter(function(x){
    if(fSaved&&!saved[x.id])return false;
    if(fField!=="all"&&x.f!==fField)return false;
    if(fLevel>=0&&x.l!==fLevel)return false;
    return true;
  });
  if(!shown.length){
    root.innerHTML='<p class="empty">'+(fSaved?"Nothing saved yet. Tap the bookmark on any lesson to keep it here.":"No lessons match that filter. Try widening it.")+'</p>';
    return;
  }
  var counter=0;
  CHAPTERS.forEach(function(CH){
    var ls=shown.filter(CH.match);
    if(!ls.length)return;
    var chap=el("section","chapter");
    var head=el("div","chap-head");
    head.innerHTML='<span class="chap-num">'+CH.n+'</span>'+
      '<div><h3>'+esc(CH.name)+'</h3><p>'+esc(CH.desc)+'</p></div>';
    chap.append(head);
    var flds=[];ls.forEach(function(x){if(flds.indexOf(x.f)<0)flds.push(x.f)});
  flds.forEach(function(fn){
    var grp=el("div","fgroup");
    var fLessons=ls.filter(function(x){return x.f===fn});
    var fDone=fLessons.filter(function(x){return done[x.id]}).length;
    grp.append(el("div","fgroup-h",esc(fn)+' <span class="fprog">'+fDone+' / '+fLessons.length+'</span>'));
    var list=el("div","nodelist");
    fLessons.forEach(function(x){counter++;list.append(nodeEl(x,counter))});
    grp.append(list);chap.append(grp);
  });
    root.append(chap);
  });
  updateProgress();
}

function highlight(id){
  var A=ANC[id],D=DES[id];
  root_hover(true);
  $$("#chapters .node").forEach(function(n){
    var i=n.dataset.id;
    n.classList.toggle("hl-self",i===id);
    n.classList.toggle("hl-anc",!!A[i]);
    n.classList.toggle("hl-desc",!!D[i]);
  });
}
function root_hover(on){$("#chapters").classList.toggle("hovering",on)}
function clearHighlight(){
  root_hover(false);
  $$("#chapters .node").forEach(function(n){n.classList.remove("hl-self","hl-anc","hl-desc")});
}

/* ---------- progress ---------- */
function updateProgress(){
  var tot=LESSONS.length,dn=0;
  LESSONS.forEach(function(l){if(done[l.id])dn++});
  var pct=Math.round(dn/tot*100);
  $("#progCount").textContent=dn+" of "+tot;
  $("#ringPct").textContent=pct+"%";
  var C=2*Math.PI*27;
  $("#ringFill").setAttribute("stroke-dashoffset",String(C-(C*dn/tot)));
  $("#progSub").textContent=dn===0?"Tick a foundation to begin":dn===tot?"Every lesson ticked. Now go and break something.":"Keep climbing — the next rung is always ready.";
  var sc=Object.keys(saved).length;
  $("#savedCount").textContent=sc?sc:"";
  var badge=$("#savedBadge");if(badge)badge.textContent=sc||"";
  renderNext();
}

function nextLesson(){
  for(var i=0;i<LESSONS.length;i++){
    var l=LESSONS[i];
    if(done[l.id])continue;
    var ok=true;
    for(var j=0;j<l.need.length;j++)if(!done[l.need[j]]){ok=false;break}
    if(ok)return l;
  }
  return null;
}
function renderNext(){
  var box=$("#nextup");
  var l=nextLesson();
  if(!l){
    var all=LESSONS.every(function(x){return done[x.id]});
    box.innerHTML='<div><span class="nlabel">'+(all?"Course complete":"Nothing unlocked")+'</span>'+
      '<h3>'+(all?"Every lesson ticked.":"Waiting on prerequisites")+'</h3>'+
      '<p>'+(all?"You have covered the whole map. Go and break something in the lab bench."
        :"Some lessons are waiting on earlier ones. Tick the ones marked “start here” first.")+'</p></div>';
    return;
  }
  box.innerHTML=
    '<div><span class="nlabel">Next up · you have everything it needs</span>'+
    '<h3>'+esc(l.t)+'</h3>'+
    '<p>'+esc(l.idea.slice(0,140))+(l.idea.length>140?"…":"")+'</p></div>'+
    '<button class="btn primary" type="button" id="nextOpen">Open lesson</button>';
  $("#nextOpen").addEventListener("click",function(){openLesson(l.id)});
}
