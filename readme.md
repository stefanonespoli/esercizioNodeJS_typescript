Progetto backend  Ordinamento Città con Node.js e TypeScript

Istruzioni per la configurazione e avvio  (istruzioni bash,aprendo il command prompt nella cartella di progetto)



1. Installare i pacchetti definiti nel file package.json:

npm install




2. Esecuzione dei Test 
Per lanciare tutti i test automatizzati con Jest:

npm test




3. Avvio del Server
Avviare il server Node.js eseguendo il codice compilato:

npx tsc
node dist/index.js




--------------  Endpoint disponibili  -------------
GET /cities
Restituisce l'elenco delle città ordinate in base alla popolazione

Parametro obbligatorio: sort (valori ammessi: asc, desc)


Esempi di richiesta:

Ordine crescente: http://localhost:3000/cities?sort=asc

Ordine decrescente: http://localhost:3000/cities?sort=DESC