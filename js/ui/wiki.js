"use strict";
/* =========================================================
   WIKIPEDIA DEEP DIVE
   ========================================================= */
function loadDeep(id){
  if(!id)return;
  var L=byId[id],box=$("#dDeep");
  if(deepLoaded[id])return;
  deepLoaded[id]=1;
  box.innerHTML='<div class="skel"><div></div><div></div><div></div><div></div></div>';

  var wtitle=L.wiki||L.t;
  var url="https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&redirects=1"+
          "&prop=extracts|pageimages&exintro=1&explaintext=1&piprop=thumbnail&pithumbsize=720"+
          "&titles="+encodeURIComponent(wtitle);

  fetch(url).then(function(r){
    if(!r.ok)throw new Error("HTTP "+r.status);
    return r.json();
  }).then(function(j){
    var pages=(j.query&&j.query.pages)||{};
    var key=Object.keys(pages)[0];
    var p=pages[key];
    if(!p||p.missing!==undefined||!p.extract){
      throw new Error("missing");
    }
    var html="";
    if(p.thumbnail&&p.thumbnail.source){
      html+='<img class="wikiimg" src="'+esc(p.thumbnail.source)+'" alt="" loading="lazy">';
    }
    html+=p.extract.split(/\n\n+/).filter(Boolean).slice(0,6)
      .map(function(par){return '<p class="wikip">'+esc(par)+'</p>'}).join("");
    html+='<a class="wikilink" target="_blank" rel="noopener" href="https://en.wikipedia.org/wiki/'+
      encodeURIComponent(wtitle)+'">Read the full article on Wikipedia ↗</a>';
    if(curId===id)box.innerHTML=(L._deepPre||"")+html;
  }).catch(function(){
    if(curId!==id)return;
    box.innerHTML=(L._deepPre||"")+
      '<p class="note" style="margin-bottom:14px">Could not load the article right now…</p>'+
      '<a class="wikilink" ...>Open on Wikipedia ↗</a>';
  });
}
