#!/usr/bin/env node
// Sanity check, no dependencies:  node tools/check.mjs
//  - every .js under js/, lessons/, labs/ is loaded by index.html (and vice versa)
//  - lesson ids are unique, prerequisites exist, each lesson sits in exactly one chapter
//  - every lesson.lab points at a real lab
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const tags = [...html.matchAll(/<script src="([^"]+)"><\/script>/g)].map((m) => m[1]);
const walk = (d) => fs.readdirSync(d, { withFileTypes: true })
  .flatMap((e) => (e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]));
const files = ['js', 'lessons', 'labs']
  .flatMap((d) => walk(path.join(root, d)))
  .filter((f) => f.endsWith('.js'))
  .map((f) => path.relative(root, f).split(path.sep).join('/'));

let bad = 0;
const fail = (m) => { console.error('✗', m); bad++; };

files.filter((f) => !tags.includes(f)).forEach((f) => fail(`not loaded by index.html: ${f}`));
tags.filter((t) => !files.includes(t)).forEach((t) => fail(`index.html loads a missing file: ${t}`));

// Run the data files the way the browser does: registries + helpers first, then lessons and labs, in tag order.
const ctx = { window: {} };
vm.createContext(ctx);
const dataTags = tags.filter((t) => t === 'js/core/registry.js' || t === 'js/core/util.js'
  || t.startsWith('lessons/') || t.startsWith('labs/'));
for (const t of dataTags) {
  try { vm.runInContext(fs.readFileSync(path.join(root, t), 'utf8'), ctx, { filename: t }); }
  catch (e) { fail(`${t} threw: ${e.message}`); }
}

const { LESSONS = [], CHAPTERS = [], LABS = [] } = ctx;
const ids = new Set();
for (const l of LESSONS) {
  if (ids.has(l.id)) fail(`duplicate lesson id: ${l.id}`);
  ids.add(l.id);
}
const labIds = new Set(LABS.map((l) => l.id));
for (const l of LESSONS) {
  for (const k of l.need || []) if (!ids.has(k)) fail(`${l.id} needs unknown lesson "${k}"`);
  if (l.lab && !labIds.has(l.lab)) fail(`${l.id} points at unknown lab "${l.lab}"`);
  if (![0, 1, 2, 3].includes(l.l)) fail(`${l.id} has a bad level: ${l.l}`);
  const hits = CHAPTERS.filter((c) => c.match(l)).length;
  if (hits !== 1) fail(`${l.id} (${l.f}, level ${l.l}) matches ${hits} chapters, expected 1`);
}

console.log(`${LESSONS.length} lessons · ${CHAPTERS.length} chapters · ${LABS.length} labs · ${tags.length} scripts`);
if (bad) { console.error(`${bad} problem(s)`); process.exit(1); }
console.log('all good ✓');
