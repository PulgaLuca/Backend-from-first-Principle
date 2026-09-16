# Backend dai Primi Principi

<p align="center">
  <a href="assets/growth-chart.svg" title="Fare clic per visualizzare il grafico interattivo a grandezza naturale">
    <img src="assets/growth-chart.svg" alt="Backend dai primi principi: cronologia della crescita di stelle, fork e cloni" width="100%" />
  </a>
</p>

Benvenuti nel repository della documentazione **Backend from First Principles**! 

Questo repository contiene una raccolta completa di note, frammenti di codice e spiegazioni che coprono concetti fondamentali e avanzati nell'ingegneria del backend. L'obiettivo di questa serie è scomporre argomenti complessi di backend in principi comprensibili e fondamentali.

## Sommario

La documentazione è organizzata nei seguenti argomenti:

1. **HTTP e CORS**: comprensione del protocollo fondamentale del Web e della condivisione delle risorse tra origini.
2. **Instradamento nel backend**: come le richieste vengono indirizzate ai gestori appropriati.
3. **Serializzazione e deserializzazione** - Conversione di strutture dati in/da formati come JSON e Protobuf.
4. **Autenticazione e autorizzazione**: protezione delle applicazioni e gestione dell'accesso degli utenti.
5. **Convalide e trasformazioni** - Garantire l'integrità e la sanificazione dei dati.
6. **Controller, servizi, repository e middleware**: esplorazione del modello architetturale a più livelli e del contesto della richiesta.
7. **Progettazione API (API REST)**: best practice per la progettazione di API RESTful intuitive e scalabili.
8. **Database** - Concetti fondamentali dell'integrazione dei database nei sistemi backend.
9. **Caching**: il segreto dietro applicazioni incredibilmente veloci (Redis, Memcached, ecc.).
10. **Code di attività e processi in background**: gestione dei carichi di lavoro asincroni.
11. **Ricerca full-text**: creazione di funzionalità di ricerca rapida utilizzando Elasticsearch.
12. **Sistemi di gestione degli errori e con tolleranza agli errori** - Creazione di applicazioni resilienti in grado di gestire gli errori con garbo.
13. **gRPC e comunicazione interservizi**: protocolli di comunicazione efficienti per microservizi.
14. **Gestione della configurazione di livello produttivo**: gestione sicura delle variabili e delle configurazioni dell'ambiente.
15. **Registrazione, monitoraggio e osservabilità**: monitoraggio dell'integrità del sistema e dei problemi di debug in produzione.
16. **Graceful Shutdown**: chiusura sicura delle applicazioni senza perdita di dati o interruzione delle richieste.
17. **Sicurezza backend**: tutto ciò che devi sapere per proteggere il tuo backend (SQL injection, XSS, CSRF, ecc.).
18. **Scalatura del backend e ingegneria delle prestazioni (Parte 1)** - Strategie per scalare le applicazioni verticalmente e orizzontalmente.
19. **Scalatura del backend e ingegneria delle prestazioni (Parte 2)** - Tecniche di scalabilità avanzate.
20. **Concorrenza e parallelismo**: comprensione delle attività legate all'IO e alla CPU e come ottimizzarle.
21. **Containerizzazione, distribuzione, Docker, Kubernetes e CI/CD** - Imballaggio e spedizione di applicazioni in modo coerente.
22. **Test automatizzati** - Scrittura di test unitari, di integrazione ed end-to-end (E2E) efficaci.
23. **Broker di messaggi e streaming di eventi**: utilizzo di strumenti come Kafka per architetture basate sugli eventi.
24. **WebSocket e comunicazione in tempo reale**: creazione di funzionalità in tempo reale utilizzando WebSocket.

## Come iniziare

Sentiti libero di sfogliare le directory per esplorare argomenti specifici. Ogni directory contiene note dettagliate sui ribassi, esempi di codice e implementazioni pratiche.

## Installa come app (PWA)

Il sito live è un'app Web progressiva. In Chrome, Edge o Safari puoi utilizzare **Installa app** / **Aggiungi alla schermata Home** per aggiungerlo al launcher o al dock. Le pagine visitate rimangono disponibili offline dopo il primo caricamento; l'addetto al servizio aggiorna l'HTML dalla rete quando sei online in modo che gli aggiornamenti dei capitoli vengano comunque visualizzati.

## Leggerlo offline

Preferisci una finestra locale a una scheda del browser? Il sito può anche aprirsi come app propria sul tuo computer: nessuna barra degli indirizzi, nessuna scheda, la propria icona nella barra delle applicazioni.

```bash
npm install
npm run desktop
```

Questo crea il sito, lo pubblica localmente e lo apre in modalità app utilizzando il primo browser Chromium che trova: Chrome, poi Brave e infine Edge. Non c'è niente in più da installare. Il terminale viene restituito subito e la chiusura della finestra è ciò che lo ferma. Per scegliere tu stesso un browser, passalo: `npm run desktop --edge`. Su un computer con solo Firefox o Safari si apre invece in una scheda normale, poiché nessuno dei due ha una modalità app da prendere in prestito.

L'avanzamento del tema e del capitolo viene mantenuto nel profilo dell'app, quindi iniziano da zero anziché essere trasferiti dal sito Web. Questo flusso del desktop locale è separato dall'installazione della PWA ospitata.

## Contributi e comunità

**Backend from First Principles** è creato e gestito da **[@DsThakurRawat](https://github.com/DsThakurRawat)** come riferimento ingegneristico aperto per tutti.

I contributi sono benvenuti! Puoi aiutare:
- Aggiunta di implementazioni di codice in altri linguaggi (Rust, Java, C++, TypeScript, ecc.)
- Migliorare le spiegazioni, aggiungere diagrammi architettonici o chiarire casi limite
- Correzione di errori di battitura, collegamenti interrotti o problemi di sintassi

Sentiti libero di aprire un **[Problema](https://github.com/DsThakurRawat/Backend-from-first-Principle/issues)** o inviare una **[Pull Request](https://github.com/DsThakurRawat/Backend-from-first-Principle/pulls)**!

---

*"Impara i fondamenti e le strutture diventeranno evidenti."*

Curato con dedizione da [@DsThakurRawat](https://github.com/DsThakurRawat)
