import fs from 'node:fs';
const file='assets/enhancements.js';
fs.mkdirSync('.translation-originals/assets',{recursive:true});
const original='.translation-originals/'+file;
if(!fs.existsSync(original))fs.copyFileSync(file,original);
let s=fs.readFileSync(original,'utf8');
const labels={
 'Run Python':'Esegui Python','Run Go':'Esegui Go','No matching chapters found.':'Nessun capitolo trovato.',
 'Original':'Originale','Dark':'Scuro','Light':'Chiaro','Study Controls and Quick Navigation':'Strumenti di studio e navigazione rapida',
 'Scroll to Top':'Torna in alto','Scroll to top of page':'Torna in cima alla pagina',
 'Highlight Amber':'Evidenzia in ambra','Highlight Emerald':'Evidenzia in verde',
 'Add Note (N)':'Aggiungi nota (N)','Copy selection':'Copia selezione','Study Note':'Nota di studio',
 'Blue':'Blu','Amber':'Ambra','Emerald':'Verde','Cancel':'Annulla','Save Note':'Salva nota',
 'Edit Note':'Modifica nota','Remove Highlight':'Rimuovi evidenziazione','View in Sidebar':'Visualizza nella barra laterale',
 'Edit':'Modifica','Remove':'Rimuovi','Notes':'Appunti','Note':'Nota','Copy':'Copia',
 'All Lessons':'Tutte le lezioni','Architecture Diagram':'Diagramma architetturale','Copy snippet':'Copia frammento',
 'Copy code snippet to clipboard':'Copia il codice negli appunti','Enlarged Note Image':'Immagine ingrandita della nota','Close Preview':'Chiudi anteprima',
 'Click to toggle task checkbox':'Fai clic per cambiare lo stato della casella','All Masterclass Lessons':'Tutte le lezioni',
 'Export Markdown':'Esporta Markdown','Study Notes':'Appunti di studio','Notepad View Modes':'Modalità di visualizzazione degli appunti',
 'Edit Markdown (Ctrl+Shift+E)':'Modifica Markdown (Ctrl+Shift+E)','Edit Markdown':'Modifica Markdown',
 'Rendered Preview (Ctrl+Shift+P)':'Anteprima (Ctrl+Shift+P)','Rendered Obsidian View':'Anteprima in stile Obsidian',
 'Preview':'Anteprima','Close Study Notes':'Chiudi gli appunti','Close':'Chiudi','Markdown formatting toolbar':'Barra di formattazione Markdown',
 'Image':'Immagine','Save':'Salva','Clear':'Svuota','List':'Elenco','Task':'Attività',
 'Import image or paste from clipboard':'Importa immagine o incolla dagli appunti',
 'Import Image (or paste / drop)':'Importa immagine (o incolla / trascina)',
 'Save notes immediately (Ctrl+S)':'Salva subito gli appunti (Ctrl+S)','Save notes now — Ctrl+S':'Salva gli appunti — Ctrl+S',
 'Study notes Markdown editor':'Editor Markdown degli appunti','Rendered Study Notes preview':'Anteprima degli appunti',
 'Clear and reset notes for this lesson':'Cancella e reimposta gli appunti di questa lezione',
 'Clear notes for this lesson':'Cancella gli appunti di questa lezione','Export Study Notes as Markdown file':'Esporta gli appunti in un file Markdown',
 'Save Code Snippet':'Salva frammento di codice','Already saved in notes (click to re-save)':'Già salvato negli appunti (clic per salvare di nuovo)',
 'All languages saved in notes':'Tutti i linguaggi salvati negli appunti','Save all language versions together':'Salva insieme le versioni in tutti i linguaggi',
 'Remove snippets of this block from notes':'Rimuovi dagli appunti i frammenti di questo blocco','Remove from Notes':'Rimuovi dagli appunti',
 'Unlink saved snippets of this block':'Scollega i frammenti salvati di questo blocco','Saved':'Salvato',
 'Bookmark code snippet to Study Notes':'Salva il codice negli appunti','Bookmark diagram to Study Notes':'Salva il diagramma negli appunti',
 'Save diagram to Study Notes':'Salva il diagramma negli appunti',
};
// Only exact string literals, visible HTML text and presentation attributes.
for(const [en,it] of Object.entries(labels)) {
  s=s.split("'"+en+"'").join("'"+it+"'").split('>'+en+'<').join('>'+it+'<');
  for(const attr of ['title','aria-label','placeholder','alt']) s=s.split(attr+'="'+en+'"').join(attr+'="'+it+'"');
}
const titles={};
for(const f of fs.readdirSync('src/content/chapters')) {
 const md=fs.readFileSync('src/content/chapters/'+f,'utf8');
 const n=md.match(/^order: (\d+)/m),title=md.match(/^navTitle: (".*")/m);
 if(n&&title)titles[n[1].padStart(2,'0')]=JSON.parse(title[1]);
}
s=s.replace(/(\{ n: '(\d+)', title: )'[^']*'/g,(_,prefix,n)=>prefix+JSON.stringify(titles[n]));
s=s.replace(/time: '(\d-\d) hours'/g,"time: '$1 ore'");
fs.writeFileSync(file,s);
