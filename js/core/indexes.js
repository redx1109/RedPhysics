"use strict";
/* ---------- indices ---------- */
var byId={},UNL={},ANC={},DES={};
LESSONS.forEach(function(l){byId[l.id]=l});
LESSONS.forEach(function(l){l.need.forEach(function(k){(UNL[k]=UNL[k]||[]).push(l.id)})});
function ancSet(id,seen){seen=seen||{};(byId[id].need||[]).forEach(function(k){if(seen[k]||!byId[k])return;seen[k]=1;ancSet(k,seen)});return seen}
function desSet(id,seen){seen=seen||{};(UNL[id]||[]).forEach(function(k){if(seen[k])return;seen[k]=1;desSet(k,seen)});return seen}
LESSONS.forEach(function(l){ANC[l.id]=ancSet(l.id);DES[l.id]=desSet(l.id)});
var LAB2LESSON={};LESSONS.forEach(function(l){if(l.lab)LAB2LESSON[l.lab]=l.id});
var LVN=["Foundations","Basic","Intermediate","Advanced"];
