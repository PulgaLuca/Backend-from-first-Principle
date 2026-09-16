import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
let count=0;
function walk(dir) {
  for (const entry of fs.readdirSync(dir,{withFileTypes:true})) {
    const file=path.join(dir,entry.name);
    if(entry.isDirectory()) {walk(file);continue;}
    const rel=path.relative('.translation-originals',file);
    if(!/\.(html|mdx|md)$/.test(rel) || !fs.existsSync(rel)) continue;
    const before=fs.readFileSync(file,'utf8'), after=fs.readFileSync(rel,'utf8');
    const blocks=/\.html$/.test(rel) ? /<(pre|code|script|style)\b[^>]*>[\s\S]*?<\/\1\s*>/gi : /^```[^\n]*\n[\s\S]*?^```/gm;
    assert.deepEqual(after.match(blocks),before.match(blocks),`Blocchi protetti modificati: ${rel}`);
    if(rel.endsWith('.mdx')) {
      assert.deepEqual(after.match(/`[^`\n]+`/g),before.match(/`[^`\n]+`/g),`Codice inline modificato: ${rel}`);
      assert.equal((after.match(/^#{1,6}\s/gm)||[]).length,(before.match(/^#{1,6}\s/gm)||[]).length,`Titoli mancanti: ${rel}`);
      assert.deepEqual(after.match(/\]\([^)]*\)/g),before.match(/\]\([^)]*\)/g),`Collegamenti modificati: ${rel}`);
    } else if(rel.endsWith('.html')) {
      assert.deepEqual(after.match(/\b(?:id|href|src)="[^"]*"/g),before.match(/\b(?:id|href|src)="[^"]*"/g),`Collegamenti modificati: ${rel}`);
      assert.match(after,/<html lang="it">/i);
    }
    assert.ok(!/ZXQBREAKZXQ|\u0001\d+\u0002/.test(after),`Segnaposto rimasto: ${rel}`);
    count++;
  }
}
walk('.translation-originals');
console.log(`${count} documenti verificati: codice, collegamenti e struttura conservati.`);
