"use strict";
/* =========================================================
   BRANCHES PAGE
   ========================================================= */
(function(){

var COL={
  "Foundations":"#9CA3AF","Mechanics":"#FF5A4D","Fluid Dynamics":"#2DB7E8","Waves & Sound":"#3FBF8F",
  "Thermodynamics":"#FF9F43","Electricity & Magnetism":"#F2C94C","Optics":"#A78BFA","Relativity":"#6E9BFF",
  "Quantum Mechanics":"#D86BFF","Statistical Mechanics":"#5EEAD4","Condensed Matter":"#C08A5B",
  "Nuclear & Particle":"#FF6FA8","Astrophysics & Cosmology":"#8BE15B"
};
var ORDER=["Foundations","Mechanics","Fluid Dynamics","Waves & Sound","Thermodynamics","Electricity & Magnetism",
  "Optics","Relativity","Quantum Mechanics","Statistical Mechanics","Condensed Matter","Nuclear & Particle","Astrophysics & Cosmology"];

var NW=224,NH=88,GX=44,GY=88,PAD=56;

var view=$("#bview");
var B=[],BY={};
var currentFit = null; // <--- ADDED: holds the fit function for resize events

function slug(s){return s.toLowerCase().replace(/&/g,"and").replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"")}
function h(tag,cls,html){var e=document.createElement(tag);if(cls)e.className=cls;if(html!=null)e.innerHTML=html;return e}

/* ---------- data ---------- */
function build(){
  var names=ORDER.slice();
  LESSONS.forEach(function(l){if(names.indexOf(l.f)<0)names.push(l.f)});
  var fieldOf={};LESSONS.forEach(function(l){fieldOf[l.id]=l.f});
  names.forEach(function(n){
    var ls=LESSONS.filter(function(l){return l.f===n});
    if(!ls.length)return;
    var b={name:n,slug:slug(n),color:COL[n]||"#FF7A6E",lessons:ls,ids:{},draws:{},feeds:{}};
    ls.forEach(function(l){b.ids[l.id]=1});
    B.push(b);BY[b.slug]=b;
  });
  B.forEach(function(b){
    b.lessons.forEach(function(l){
      (l.need||[]).forEach(function(k){
        var f=fieldOf[k];
        if(f&&f!==b.name&&BY[slug(f)]){b.draws[f]=1;BY[slug(f)].feeds[b.name]=1}
      });
    });
  });
}
function prog(b){
  var n=b.lessons.length,d=0;
  b.lessons.forEach(function(l){if(done[l.id])d++});
  return{n:n,d:d,p:n?Math.round(d/n*100):0};
}
function levelSpan(b){
  var lo=9,hi=-1;
  b.lessons.forEach(function(l){lo=Math.min(lo,l.l);hi=Math.max(hi,l.l)});
  return LVN[lo]+(hi>lo?" → "+LVN[hi]:"");
}
function entry(b){
  for(var i=0;i<b.lessons.length;i++){
    var l=b.lessons[i];
    if(!(l.need||[]).some(function(k){return b.ids[k]}))return l;
  }
  return b.lessons[0];
}
function relPills(map,label){
  var names=Object.keys(map);
  if(!names.length)return"";
  names.sort(function(a,c){return ORDER.indexOf(a)-ORDER.indexOf(c)});
  return'<span class="rlab">'+label+'</span>'+names.map(function(n){
    var o=BY[slug(n)];
    return'<a class="rpill" href="#'+o.slug+'" style="--bc:'+o.color+'">'+esc(n)+'</a>';
  }).join("");
}

/* ---------- all branches ---------- */
function renderGrid(){
  document.title="Branches — RedPhysics";
  document.body.classList.remove("treeview");
  var tot=LESSONS.length,dn=0;
  LESSONS.forEach(function(l){if(done[l.id])dn++});
  var cards=B.map(function(b){
    var P=prog(b),e=entry(b);
    var dr=Object.keys(b.draws).length,fe=Object.keys(b.feeds).length;
    return'<a class="bcard" href="#'+b.slug+'" style="--bc:'+b.color+'">'+
      '<div class="bc-top"><span class="bdot"></span><span>'+esc(levelSpan(b))+'</span></div>'+
      '<h3>'+esc(b.name)+'</h3>'+
      '<p class="bc-start">Starts at <b>'+esc(e.t)+'</b></p>'+
      '<div class="bbar"><i style="width:'+P.p+'%"></i></div>'+
      '<div class="bc-foot"><span>'+P.d+' / '+P.n+' learned</span>'+
      '<span>'+(dr?"draws on "+dr:"no outside prereqs")+(fe?" · feeds "+fe:"")+'</span></div>'+
    '</a>';
  }).join("");
  view.innerHTML=
    '<section class="wrap bhero">'+
      '<p class="kicker">'+B.length+' branches · '+tot+' lessons</p>'+
      '<h1>Pick a <em>branch.</em></h1>'+
      '<p class="lede">Physics is a tree, not a list. Each branch below is a lesson tree of its own. Open one to see what leads to what, and which other branches it borrows from.</p>'+
      '<div class="bstats"><span><b>'+dn+'</b> of '+tot+' learned</span><span><b>'+B.length+'</b> branches</span></div>'+
    '</section>'+
    '<section class="wrap"><div class="bgrid">'+cards+'</div></section>';
  window.scrollTo(0,0);
}

/* ---------- layout of one branch ---------- */
function layout(b){
  var layer={};
  function lay(id){
    if(layer[id]!=null)return layer[id];
    layer[id]=0;
    var m=-1;
    (byId[id].need||[]).forEach(function(k){if(b.ids[k])m=Math.max(m,lay(k))});
    return(layer[id]=m+1);
  }
  b.lessons.forEach(function(l){lay(l.id)});

  var rows=[];
  b.lessons.forEach(function(l){(rows[layer[l.id]]=rows[layer[l.id]]||[]).push(l.id)});

  var X={},step=NW+GX;
  function assign(){rows.forEach(function(r){r.forEach(function(id,i){X[id]=(i-(r.length-1)/2)*step})})}
  function kids(id){return(UNL[id]||[]).filter(function(k){return b.ids[k]})}
  function parents(id){return(byId[id].need||[]).filter(function(k){return b.ids[k]})}
  function bary(id,nb){
    if(!nb.length)return X[id];
    return nb.reduce(function(s,k){return s+X[k]},0)/nb.length;
  }
  assign();
  for(var it=0;it<4;it++){
    var r;
    for(r=1;r<rows.length;r++){rows[r].sort(function(a,c){return bary(a,parents(a))-bary(c,parents(c))});assign()}
    for(r=rows.length-2;r>=0;r--){rows[r].sort(function(a,c){return bary(a,kids(a))-bary(c,kids(c))});assign()}
  }

  var maxN=0;rows.forEach(function(r){maxN=Math.max(maxN,r.length)});
  var W=maxN*NW+(maxN-1)*GX+PAD*2;
  var Ht=PAD*2+rows.length*NH+(rows.length-1)*GY;
  var pos={};
  Object.keys(X).forEach(function(id){pos[id]={x:W/2+X[id]-NW/2,y:PAD+layer[id]*(NH+GY)}});
  return{pos:pos,W:W,H:Ht};
}
function edgePath(p,c){
  var x1=p.x+NW/2,y1=p.y+NH,x2=c.x+NW/2,y2=c.y,k=Math.max(30,(y2-y1)*.5);
  return"M"+x1+" "+y1+"C"+x1+" "+(y1+k)+","+x2+" "+(y2-k)+","+x2+" "+y2;
}

/* ---------- one branch ---------- */
function renderBranch(b){
  document.title=b.name+" — Branches — RedPhysics";
  document.body.classList.add("treeview");
  var P=prog(b);
  view.style.setProperty("--bc",b.color);
  view.innerHTML=
    '<section class="wrap bhead">'+
      '<a class="back" href="#">← Back to branches</a>'+
      '<h1><span class="bdot"></span>'+esc(b.name)+'</h1>'+
      '<div class="bmeta">'+
        '<div class="bprogbox"><p class="bprog"><b>'+P.d+'</b> of '+P.n+' learned · '+P.p+'%</p>'+
        '<div class="bbar"><i style="width:'+P.p+'%"></i></div></div>'+
        '<div class="legend"><span><i class="lg learned"></i>learned</span><span><i class="lg ready"></i>ready</span><span><i class="lg locked"></i>locked</span></div>'+
      '</div>'+
      '<div class="brel">'+relPills(b.draws,"Draws on")+relPills(b.feeds,"Feeds into")+'</div>'+
    '</section>'+
    '<div class="treewrap">'+
      '<div class="tree" id="tree" role="region" aria-label="Lesson tree for '+esc(b.name)+'">'+
        '<div class="tsize" id="tsize"><div class="tscale" id="tscale"></div></div>'+
      '</div>'+
      '<div class="zoom" role="group" aria-label="Zoom">'+
        '<button class="zbtn" id="zIn" type="button" aria-label="Zoom in">+</button>'+
        '<button class="zbtn" id="zOut" type="button" aria-label="Zoom out">−</button>'+
        '<button class="zbtn" id="zFit" type="button" aria-label="Fit to screen" title="Fit">⤢</button>'+
      '</div>'+
    '</div>';

  var L=layout(b),tree=$("#tree"),size=$("#tsize"),scale=$("#tscale");
  scale.style.width=L.W+"px";scale.style.height=L.H+"px";

  /* edges */
  var NS="http://www.w3.org/2000/svg";
  var svg=document.createElementNS(NS,"svg");
  svg.setAttribute("class","tedges");svg.setAttribute("width",L.W);svg.setAttribute("height",L.H);
  svg.setAttribute("aria-hidden","true");
  var edges=[];
  b.lessons.forEach(function(l){
    (l.need||[]).forEach(function(k){
      if(!b.ids[k])return;
      var p=document.createElementNS(NS,"path");
      p.setAttribute("d",edgePath(L.pos[k],L.pos[l.id]));
      p.setAttribute("class","tedge"+(done[k]?" on":""));
      p.dataset.p=k;p.dataset.c=l.id;
      svg.appendChild(p);edges.push(p);
    });
  });
  scale.appendChild(svg);

  /* nodes */
  var nodes=[];
  b.lessons.forEach(function(l){
    var unmet=(l.need||[]).filter(function(k){return !done[k]}).length;
    var st=done[l.id]?"done":unmet===0?"ready":"locked";
    var foot=done[l.id]?"Learned ✓":!(l.need||[]).length?"Entry point":unmet?"Needs "+unmet:"Ready";
    var a=h("a","bnode "+st);
    a.href="#lesson="+encodeURIComponent(l.id);
    a.dataset.id=l.id;
    a.style.left=L.pos[l.id].x+"px";a.style.top=L.pos[l.id].y+"px";
    a.setAttribute("aria-label",l.t+" — "+foot);
    a.innerHTML='<span class="bn-top"><span>'+esc(LVN[l.l])+'</span>'+(l.lab?'<span>▶ sim</span>':'')+'</span>'+
      '<b class="bn-t">'+esc(l.t)+'</b><span class="bn-foot">'+foot+'</span>';
    a.addEventListener("mouseenter",function(){hl(l.id)});
    a.addEventListener("mouseleave",clear);
    a.addEventListener("focus",function(){if(a.matches(":focus-visible"))hl(l.id)});
    a.addEventListener("blur",clear);
    scale.appendChild(a);nodes.push(a);
  });

  function hl(id){
    var A=ANC[id]||{},D=DES[id]||{};
    var inA=function(i){return i===id||!!A[i]},inD=function(i){return i===id||!!D[i]};
    tree.classList.add("hovering");
    nodes.forEach(function(n){
      var i=n.dataset.id;
      n.classList.toggle("hl-self",i===id);
      n.classList.toggle("hl-anc",!!A[i]);
      n.classList.toggle("hl-desc",!!D[i]);
    });
    edges.forEach(function(e){
      var p=e.dataset.p,c=e.dataset.c;
      e.classList.toggle("hl",(inA(p)&&inA(c))||(inD(p)&&inD(c)));
    });
  }
  function clear(){
    tree.classList.remove("hovering");
    nodes.forEach(function(n){n.classList.remove("hl-self","hl-anc","hl-desc")});
    edges.forEach(function(e){e.classList.remove("hl")});
  }

  /* zoom, fit, pan */
  var Z=1;
  function apply(){
    scale.style.transform="scale("+Z+")";
    size.style.width=Math.round(L.W*Z)+"px";size.style.height=Math.round(L.H*Z)+"px";
  }
  function setZoom(z){
    z=Math.min(1.6,Math.max(.2,z)); // allow zoom out to 0.2
    var cx=(tree.scrollLeft+tree.clientWidth/2)/Z,cy=(tree.scrollTop+tree.clientHeight/2)/Z;
    Z=z;apply();
    tree.scrollLeft=cx*Z-tree.clientWidth/2;tree.scrollTop=cy*Z-tree.clientHeight/2;
  }
  
  // FIXED: fit function
  function fit(){
    if (!tree.clientWidth || !tree.clientHeight) return;
    Z = Math.min(1, Math.max(.2, (tree.clientWidth - 16) / L.W));
    apply();
    // Center both horizontally and vertically
    tree.scrollLeft = (size.offsetWidth - tree.clientWidth) / 2;
    tree.scrollTop = (size.offsetHeight - tree.clientHeight) / 2;
  }
  currentFit = fit; // expose for resize listener

  $("#zIn").addEventListener("click",function(){setZoom(Z*1.2)});
  $("#zOut").addEventListener("click",function(){setZoom(Z/1.2)});
  $("#zFit").addEventListener("click",fit);
  tree.addEventListener("wheel",function(e){
    if(e.ctrlKey||e.metaKey){e.preventDefault();setZoom(Z*(e.deltaY<0?1.1:.9))}
  },{passive:false});

  var drag=null,moved=false;
  tree.addEventListener("pointerdown",function(e){
    if(e.pointerType!=="mouse"||e.button!==0)return;
    drag={x:e.clientX,y:e.clientY,sl:tree.scrollLeft,st:tree.scrollTop};moved=false;
  });
  tree.addEventListener("pointermove",function(e){
    if(!drag)return;
    var dx=e.clientX-drag.x,dy=e.clientY-drag.y;
    if(!moved){
      if(Math.hypot(dx,dy)<6)return;
      moved=true;tree.classList.add("panning");
      try{tree.setPointerCapture(e.pointerId)}catch(err){}
    }
    tree.scrollLeft=drag.sl-dx;tree.scrollTop=drag.st-dy;
  });
  function end(){drag=null;tree.classList.remove("panning")}
  tree.addEventListener("pointerup",end);
  tree.addEventListener("pointercancel",end);
  tree.addEventListener("click",function(e){if(moved){e.preventDefault();e.stopPropagation();moved=false}},true);

  // FIXED: run fit, then scroll to next lesson
  setTimeout(function() {
    fit();
    var next=nodes.filter(function(n){return n.classList.contains("ready")})[0];
    if(next){
      var ny=(parseFloat(next.style.top)+NH/2)*Z;
      // Only scroll if the next lesson is off-screen
      if(ny > tree.scrollTop + tree.clientHeight - 80 || ny < tree.scrollTop + 80) {
        tree.scrollTop = Math.max(0, ny - tree.clientHeight/2);
      }
    }
  }, 150);
}

/* ---------- routing ---------- */
function route(){
  var k=location.hash.replace(/^#/,"");
  if(BY[k])renderBranch(BY[k]);else renderGrid();
}
function reload(){
  try{done=JSON.parse(localStorage.getItem("rp.done")||"{}")||{}}catch(e){done={}}
  route();
}

build();
route();
addEventListener("hashchange",route);
addEventListener("pageshow",function(e){if(e.persisted)reload()});
addEventListener("storage",function(e){if(e.key==="rp.done")reload()});

/* theme */
$("#themeBtn").addEventListener("click",function(){
  var r=document.documentElement,next=r.getAttribute("data-theme")==="light"?"dark":"light";
  r.setAttribute("data-theme",next);
  try{localStorage.setItem("rp.theme",next)}catch(e){}
});

// FIXED: resize listeners inside the IIFE, using currentFit
window.addEventListener('resize', function() {
  if (currentFit) currentFit();
});
window.addEventListener('orientationchange', function() {
  setTimeout(function() { if (currentFit) currentFit(); }, 250);
});

})();
