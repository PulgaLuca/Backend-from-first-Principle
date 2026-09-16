import fs from 'node:fs';
const cachePath='.translation-originals/cache.json';
const cache=JSON.parse(fs.readFileSync(cachePath,'utf8'));
const terms={GET:['OTTIENI','OTTENERE'],POST:['PUBBLICA'],PUT:['METTERE','METTI'],DELETE:['ELIMINA'],HEAD:['TESTA'],OPTIONS:['OPZIONI','OPZIONE'],INSERT:['INSERISCI'],UPDATE:['AGGIORNA'],SELECT:['SELEZIONA']};
for(const [source,translated] of Object.entries(cache)) {
  let value=translated;
  for(const [term,alternatives] of Object.entries(terms)) if(new RegExp('\\b'+term+'\\b').test(source))
    for(const word of alternatives) value=value.replace(new RegExp('\\b'+word+'\\b','g'),term);
  // Pure protocol lines are examples, not natural-language prose.
  if(/^(GET|POST|PUT|PATCH|DELETE|HEAD|OPTIONS)\s+\/[\w/.:?=&-]+$/.test(source)) value=source;
  value=value.replace(/logica aziendale/g,'logica applicativa').replace(/percorso percorso/g,'percorso della route').replace(/apolidia/gi,'assenza di stato').replace(/apolide/gi,'senza stato').replace(/apolidi/gi,'senza stato');
  cache[source]=value;
}
cache['Build context & `RUN` vs `CMD`']='Contesto di build e confronto tra `RUN` e `CMD`';
cache['Routing, the where of every request.']='Routing: la destinazione di ogni richiesta.';
fs.writeFileSync(cachePath,JSON.stringify(cache));
for(const file of ['tests/pwa.test.js','tests/reading-position.test.js']) {
  const original='.translation-originals/'+file;
  fs.mkdirSync('.translation-originals/tests',{recursive:true});
  if(!fs.existsSync(original))fs.copyFileSync(file,original);
  let s=fs.readFileSync(file,'utf8').replace('/Backend from First Principles/i','/Backend dai principi fondamentali/i').replace('/>Install</','/>Installa</').replace('/Continue reading/','/Continua a leggere/').replace('/Continue/','/Continua/');
  fs.writeFileSync(file,s);
}
