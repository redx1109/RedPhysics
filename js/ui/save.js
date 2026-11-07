"use strict";
/* =========================================================
   SAVE / LEARN
   ========================================================= */
function toggleSave(id){
  if(saved[id])delete saved[id];else saved[id]=1;
  saveSaved();
  var n=nodeCb[id];
  if(n){var b=n.querySelector(".svbtn");if(b){b.classList.toggle("on",!!saved[id]);b.setAttribute("aria-pressed",String(!!saved[id]))}}
  if(fSaved)renderPath();
  updateProgress();
  if(curId===id)syncFooter();
}
function toggleDone(id){
  if(done[id])delete done[id];else done[id]=1;
  saveDone();
  var n=nodeCb[id];
  if(n)n.classList.toggle("done",!!done[id]);
  updateProgress();
  if(curId===id)syncFooter();
}
