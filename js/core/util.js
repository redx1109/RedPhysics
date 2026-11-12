"use strict";
var $=function(s,r){return (r||document).querySelector(s)};
var $$=function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))};
var MONO='"IBM Plex Mono",ui-monospace,monospace';
var clamp=function(x,a,b){return Math.min(b,Math.max(a,x))};
var TAU=Math.PI*2,DEG=Math.PI/180;
var f=function(x,d){return Number(x).toFixed(d==null?2:d)};
var esc = function(s) {
  return String(s).replace(/[&<>"']/g, function(c) {
    return {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    }[c];
  });
};
var PLANETS=[["Earth",9.81],["Moon",1.62],["Mars",3.71],["Jupiter",24.79]];
var RM=window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches;

function el(tag, cls, parent){
  var n = document.createElement(tag);
  if (cls) n.className = cls;
  if (parent) parent.appendChild(n);
  return n;
}
