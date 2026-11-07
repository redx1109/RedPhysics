"use strict";
/* ---------- persistence ---------- */
var done={},saved={};
try{done=JSON.parse(localStorage.getItem("rp.done")||"{}")||{}}catch(e){done={}}
try{saved=JSON.parse(localStorage.getItem("rp.saved")||"{}")||{}}catch(e){saved={}}
function saveDone(){try{localStorage.setItem("rp.done",JSON.stringify(done))}catch(e){}}
function saveSaved(){try{localStorage.setItem("rp.saved",JSON.stringify(saved))}catch(e){}}
