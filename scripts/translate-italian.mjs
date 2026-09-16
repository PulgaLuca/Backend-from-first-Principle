// Traduce la documentazione preservando codice, URL, attributi e struttura.
// Gli originali e la cache consentono di riprendere un'esecuzione interrotta.
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const backup = path.join(root, '.translation-originals');
fs.mkdirSync(backup, { recursive: true });
const cachePath = path.join(backup, 'cache.json');
const cache = fs.existsSync(cachePath) ? JSON.parse(fs.readFileSync(cachePath, 'utf8')) : {};
const jobs = new Set();
let applying = false;
const decode = s => s.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'").replace(/&nbsp;/g, ' ');
const escape = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
function tr(s) {
  const key = s.trim();
  if (!/[a-zA-Z]{2}/.test(key) || /^(?:https?:\/\/|\/|[\w.-]+\(\))/.test(key) || /^\d/.test(key) && !/[a-zA-Z]{3}/.test(key)) return s;
  if (!applying) { jobs.add(key); return s; }
  if (!(key in cache)) throw new Error(`Traduzione mancante: ${key.slice(0, 100)}`);
  return s.replace(key, cache[key]);
}
function html(source) {
  const protectedParts = [];
  let s = source.replace(/<(pre|code|script|style)\b[^>]*>[\s\S]*?<\/\1\s*>|<!--[\s\S]*?-->/gi, m => `\u0001${protectedParts.push(m)-1}\u0002`);
  s = s.replace(/(<[^>]+>)|([^<]+)/g, (m, tag, text) => {
    if (tag) return tag.replace(/\b(aria-label|title|alt|placeholder)="([^"]*)"/g, (_, a, v) => `${a}="${escape(tr(decode(v)))}"`)
      .replace(/(<meta\b[^>]*name="description"[^>]*content=")([^"]*)/g, (_, p, v) => p + escape(tr(decode(v))));
    return text.split(/(\u0001\d+\u0002)/).map(t => /^\u0001/.test(t) ? t : escape(tr(decode(t)))).join('');
  });
  s = s.replace(/\u0001(\d+)\u0002/g, (_, n) => protectedParts[n]);
  return s.replace(/lang="en"/g, 'lang="it"');
}
function markdown(source) {
  let fenced = false, frontmatter = source.startsWith('---'), first = true;
  return source.split('\n').map(line => {
    if (frontmatter) {
      if (line.trim() === '---') { if (!first) frontmatter = false; first = false; return line; }
      return line.replace(/^(title|navTitle|summary|readingTime):\s*(".*")\s*$/, (_, k, v) => `${k}: ${JSON.stringify(tr(JSON.parse(v)))}`);
    }
    if (/^\s*```/.test(line)) { fenced = !fenced; return line; }
    if (fenced || !line.trim() || /^import\s/.test(line)) return line;
    if (/^\s*<svg\b/.test(line)) return html(line);
    // Translate text between protected Markdown/JSX constructs separately.
    return line.split(/(`+[^`]*`+|<[^>]+>|\]\([^)]*\)|&(?:#\d+|\w+);|\{[^}]*\})/g).map((part, i) => {
      if (i % 2) return part.startsWith('<') ? part.replace(/\b(title|aria-label|alt)="([^"]*)"/g, (_, a, v) => `${a}="${escape(tr(decode(v)))}"`) : part;
      const match = part.match(/^(\s*(?:#{1,6}\s+|[-*+]\s+|\d+\.\s+|>\s*)?)(.*?)(\s*)$/);
      if (!match) return part;
      return match[1] + tr(match[2]).replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\{/g, '&#123;').replace(/\}/g, '&#125;') + match[3];
    }).join('');
  }).join('\n');
}
const files = ['index.html', 'public/offline.html', 'README.md'];
for (const dir of fs.readdirSync(root, {withFileTypes:true})) {
  if (dir.isDirectory() && fs.existsSync(path.join(dir.name, 'html_notes/notes.html'))) files.push(`${dir.name}/html_notes/notes.html`);
}
for (const file of fs.readdirSync('src/content/chapters')) if (file.endsWith('.mdx')) files.push(`src/content/chapters/${file}`);
const sources = new Map();
for (const file of files) {
  const original = path.join(backup, file);
  if (!fs.existsSync(original)) { fs.mkdirSync(path.dirname(original), {recursive:true}); fs.copyFileSync(file, original); }
  const source = fs.readFileSync(original, 'utf8');
  sources.set(file, source);
  (file.endsWith('.html') ? html : markdown)(source);
}
const pending = [...jobs].filter(s => !(s in cache));
console.log(`${files.length} file; ${jobs.size} segmenti; ${pending.length} da tradurre.`);
const batches = [];
let batch = [], size = 0;
for (const s of pending) {
  if (size + s.length > 3500 && batch.length) { batches.push(batch); batch = []; size = 0; }
  batch.push(s); size += s.length + 20;
}
if (batch.length) batches.push(batch);
async function request(q) {
  for (let attempt = 0; attempt < 5; attempt++) {
    try {
      const url = 'https://translate.googleapis.com/translate_a/single?' + new URLSearchParams({client:'gtx',sl:'en',tl:'it',dt:'t',q});
      const r = await fetch(url, {signal: AbortSignal.timeout(45000)});
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      const data = await r.json();
      const result = data[0].map(x => x[0] || '').join('');
      if (!result) throw new Error('Risposta vuota');
      return result;
    } catch (e) { if (attempt === 4) throw e; await new Promise(r => setTimeout(r, 1500 * (attempt+1))); }
  }
}
let cursor = 0, done = 0;
async function worker() {
  while (cursor < batches.length) {
    const list = batches[cursor++];
    const result = await request(list.join('\nZXQBREAKZXQ\n'));
    const parts = result.split(/\s*ZXQBREAKZXQ\s*/);
    if (parts.length === list.length) list.forEach((s, i) => {cache[s] = parts[i].trim();});
    else for (const s of list) cache[s] = await request(s);
    done++;
    fs.writeFileSync(cachePath, JSON.stringify(cache));
    if (done % 10 === 0 || done === batches.length) console.log(`Tradotti ${done}/${batches.length} gruppi.`);
  }
}
await Promise.all(Array.from({length: 4}, worker));
applying = true;
for (const [file, source] of sources) {
  const translated = (file.endsWith('.html') ? html : markdown)(source);
  fs.writeFileSync(file, translated);
}
console.log(`Completati ${files.length} file. Originali in .translation-originals.`);
