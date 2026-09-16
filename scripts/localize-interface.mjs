import fs from 'node:fs';
import path from 'node:path';
const replacements = {
  'The Request Path': 'Il percorso della richiesta',
  'How bytes on a socket become a handled request.': 'Come i byte su un socket diventano una richiesta da gestire.',
  'State & Machinery': 'Stato e meccanismi',
  'Where data lives, and the moving parts around it.': 'Dove risiedono i dati e come interagiscono i componenti.',
  'Running in Production': 'In produzione',
  'Keeping it observable, secure and fast under load.': 'Monitoraggio, sicurezza e prestazioni sotto carico.',
  'Distribution & Scale': 'Distribuzione e scalabilità',
  'Shipping it, testing it, and connecting services.': 'Distribuire, testare e collegare i servizi.',
  'OpenAPI & AI Agents': 'OpenAPI e agenti IA',
  'Production Ready Agentic AI Solutions': 'Soluzioni con agenti IA pronte per la produzione',
  'Backend from First Principles': 'Backend dai principi fondamentali',
  'a ${chapters.length}-chapter engineering reference': 'una guida tecnica in ${chapters.length} capitoli',
  '${chapters.length}-chapter reference on backend engineering, from HTTP and routing through databases, caching and Kafka to production deployment. Notes, diagrams and runnable Go and Python examples.': 'Guida allo sviluppo backend in ${chapters.length} capitoli: HTTP, routing, database, cache, Kafka e distribuzione in produzione. Appunti, diagrammi ed esempi eseguibili in Go e Python.',
  'A {chapters.length}-chapter engineering reference': 'Una guida tecnica in {chapters.length} capitoli',
  'Backend, from <em>first principles</em>.': 'Backend, dai <em>principi fondamentali</em>.',
  'Most backend material teaches a framework. This teaches the machinery underneath it —\n        what an HTTP request actually is, why a connection pool has the size it has, what a\n        broker guarantees and what it does not. Every chapter is a self-contained field manual\n        with diagrams and runnable Go and Python.': 'Molte risorse sul backend insegnano un framework. Questa guida spiega i meccanismi che lo fanno funzionare:\n        che cosa sia una richiesta HTTP, come dimensionare un pool di connessioni e quali garanzie\n        offra un broker. Ogni capitolo è una guida autonoma\n        con diagrammi ed esempi eseguibili in Go e Python.',
  'These notes get better when people argue with them.': 'Questi appunti migliorano grazie al confronto.',
  'Found an explanation that hand-waves, an edge case that is missing, or a diagram\n          that is wrong? Chapters are plain Markdown now — a correction is a pull request,\n          not a wrestling match with hand-written HTML. Implementations in other languages\n          are especially welcome.': 'Hai trovato una spiegazione poco chiara, un caso limite mancante o un diagramma errato?\n          I capitoli sono in Markdown: puoi proporre una correzione con una pull request.\n          Sono particolarmente gradite le implementazioni\n          in altri linguaggi.',
  'Continue reading': 'Continua a leggere', 'Start with Chapter 01': 'Inizia dal capitolo 01',
  'Search the series': 'Cerca nella guida', 'All chapters': 'Tutti i capitoli',
  '>Chapters<': '>Capitoli<', '>Languages<': '>Linguaggi<', '>Format<': '>Formato<',
  'Theory + code': 'Teoria + codice', '>Progress<': '>Avanzamento<', '>Completed<': '>Completato<',
  'Contribute on GitHub': 'Contribuisci su GitHub', 'Open an issue': 'Segnala un problema',
  'Curated by': 'A cura di', 'Learn the fundamentals, and the frameworks become obvious.': 'Impara i fondamenti e i framework diventeranno chiari.',
  'Pick up where you left off in this chapter.': 'Riprendi dal punto in cui ti eri fermato in questo capitolo.',
  'Pick up where you left off': 'Riprendi da dove eri rimasto',
  'Chapter ${': 'Capitolo ${', 'Chapter {': 'Capitolo {', 'Ch. ${': 'Cap. ${',
  'Skip to content': 'Vai al contenuto', 'lang="en"': 'lang="it"',
  '>Back<': '>Indietro<', 'Mark this chapter complete': 'Segna questo capitolo come completato',
  'Chapter navigation': 'Navigazione tra i capitoli', '← Previous': '← Precedente', 'Next →': 'Successivo →',
  '>Start over<': '>Ricomincia<', '>Continue<': '>Continua<',
  'Install this series': 'Installa questa guida',
  'Open it like an app — faster launches, and chapters you’ve read stay offline.': 'Aprila come un’app: avvio rapido e capitoli già letti disponibili offline.',
  '>Not now<': '>Non ora<', '>Install<': '>Installa<',
  'Open chapter contents': 'Apri l’indice dei capitoli', 'Close chapter contents': 'Chiudi l’indice dei capitoli',
  'Chapter contents': 'Indice dei capitoli', '>Contents<': '>Indice<', '>Overview<': '>Panoramica<',
  'Switch chapter': 'Cambia capitolo', '>Search<': '>Cerca<', 'View on GitHub': 'Visualizza su GitHub',
  'Switch theme': 'Cambia tema', 'On this page': 'In questa pagina',
  "info: 'Note', ok: 'Good practice', warn: 'Watch out'": "info: 'Nota', ok: 'Buona pratica', warn: 'Attenzione'",
  'Search is available after a production build. Run': 'La ricerca è disponibile dopo la generazione del sito. Esegui',
};
const files = [...fs.readdirSync('src/components').filter(f=>f.endsWith('.astro')).map(f=>'src/components/'+f),
  'src/pages/index.astro','src/layouts/Base.astro','src/layouts/Chapter.astro'];
for (const file of files) {
  const original = path.join('.translation-originals',file);
  if (!fs.existsSync(original)) {fs.mkdirSync(path.dirname(original),{recursive:true});fs.copyFileSync(file,original);}
  let s = fs.readFileSync(original,'utf8').replace(/\r\n/g,'\n');
  for (const [from,to] of Object.entries(replacements)) s=s.split(from).join(to);
  fs.writeFileSync(file,s);
}
const manifestPath = 'public/manifest.webmanifest';
fs.copyFileSync(manifestPath,'.translation-originals/manifest.webmanifest');
const manifest = JSON.parse(fs.readFileSync(manifestPath,'utf8'));
manifest.lang='it';
manifest.name='Backend dai principi fondamentali';
manifest.description='Impara lo sviluppo backend dai principi fondamentali: HTTP, database, cache, scalabilità e molto altro.';
fs.writeFileSync(manifestPath,JSON.stringify(manifest,null,2)+'\n');
