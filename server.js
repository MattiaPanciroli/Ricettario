// Dipendenze del progetto
const express=require('express');//importo il framework Express
const app=express();
const fs = require('fs'); //importo il modulo per la gestione del File System
const morgan=require('morgan');  //importo il modulo per la gestione dei logger
const path = require('path'); //importo il modulo per la gestione dei percorsi delle cartelle e dei file
const helmet=require('helmet'); //importo il modulo per rendere il server web piu sicuro
//const mymodule=require('./moduli/frase_del_giorno');
const cors=require('cors');// Cors (Cross origin resource sharing, protocollo che permette il passaggio di dati tra applicazioni e domini diversi)
const bodyParser = require('body-parser');//Per leggere i parametri POST occorre preventivamente installare il modulo body-parser

const axios = require('axios');

//Sezione impostazione dell’app (app.set)app.set ('port',process.env.PORT || 3000); //imposta la porta in cui è in ascolto il server
app.set ('appName', 'Ricettario'); //imposta il nome dell'applicazione web
app.set ('port',process.env.PORT || 3000); //imposta la porta in cui è in ascolto il server

//Sezione Middleweare
//Middleweare Morgan: per la creazione di un logger: formati predefiniti (short, combined, common, tiny)
//oppure app.use(morgan(':method :url :status - :response-time ms', {stream: accessLogStream}));
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'});
app.use(morgan('short', {stream: accessLogStream}));
//Middleweare sicurezza helmet
app.use(helmet());

app.use(cors());


//La lettura dei parametri della richiesta può poi essere eseguita attraverso le seguenti routes middleware che 
//restituiscono i parametri stessi in formato json all’interno di req.body
//Il primo middleware intercetta i parametri url-encoded.
//Il secondo middleware intercetta i parametri scritti in formato json serializzato, restituendoli nella medesima 
//property request.body
//L’opzione extended:false consente di passare come parametri stringhe, vettori e anche oggetti json 
//semplici codificati come object
//L’opzione extended:true consente anche l’utilizzo di oggetti estesi (json object annidati)
//Il default è true, però se si omette l’opzione extended il compilatore segnala un warning piuttosto fastidioso.

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



//Sezione Route
//La Route che segue viene eseguita quando arriva una richiesta get del 
//client sulla risorsa	
app.get('/ricette', (req, res) => {

  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: 'https://hofman.alwaysdata.net/ricette',
    headers: { }
  };

  axios.request(config)
  .then((response) => {
    console.log(JSON.stringify(response.data));
    res.render('ricette', response.data);
  })
  .catch((error) => {
    console.log(error);
  });

});

app.get('/ricette/{id}', (req,res) => {
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: 'https://hofman.alwaysdata.net/ricette/{id}',
    headers: { }
  };
  
  axios.request(config)
  .then((response) => {
    console.log(JSON.stringify(response.data));
    res.render('ricette', response.data);
  })
  .catch((error) => {
    console.log(error);
  });
  
});

app.get('/ricette/recent/{limit}', (req,res) => {
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: 'https://hofman.alwaysdata.net/ricette/recent/{limit}',
    headers: { }
  };
  
  axios.request(config)
  .then((response) => {
    console.log(JSON.stringify(response.data));
    res.render('ricette', response.data);
  })
  .catch((error) => {
    console.log(error);
  });
  
});

app.get('/categorie/{id}', (req,res) => {
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: 'https://hofman.alwaysdata.net/categorie/{id}',
    headers: { }
  };
  
  axios.request(config)
  .then((response) => {
    console.log(JSON.stringify(response.data));
    res.render('categorie', response.data);
  })
  .catch((error) => {
    console.log(error);
  });
  
});

app.get('/cotture/{id}', (req,res) => {
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: 'https://hofman.alwaysdata.net/cotture/{id}',
    headers: { }
  };
  
  axios.request(config)
  .then((response) => {
    console.log(JSON.stringify(response.data));
    res.render('cotture', response.data);
  })
  .catch((error) => {
    console.log(error);
  });
  
});

app.get('/paesi/{id}', (req,res) => {
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: 'https://hofman.alwaysdata.net/paesi/{id}',
    headers: { }
  };
  
  axios.request(config)
  .then((response) => {
    console.log(JSON.stringify(response.data));
    res.render('paesi', response.data);
  })
  .catch((error) => {
    console.log(error);
  });
  
});

app.get('/portate/{id}', (req,res) => {
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: 'https://hofman.alwaysdata.net/portate/{id}',
    headers: { }
  };
  
  axios.request(config)
  .then((response) => {
    console.log(JSON.stringify(response.data));
    res.render('portate', response.data);
  })
  .catch((error) => {
    console.log(error);
  });
  
});

/*
app.get('/frase_del_giorno',function(req,res){
	console.log("passato");
	res.status(200);
	res.json(mymodule.fraseDelGiorno());
});

app.get('/ricette',function(req,res){
	res.status(200)
	res.json();
});


app.post('/api/utente', function (req, res) {
    let user = req.body;
    users.push(user);
	console.log(users);
	res.status(201);
	res.json({status: 'success'});
});

app.delete('/api/utente', function (req, res) {
    let use = req.body;
    users.splice(use.id,1);
	console.log(users);
	res.json({status: 'success'});
});
*/


//Middleweare che gestisce l’errore nel caso che nessuna route vada a buon fine
app.use("*",function (req,res,next){	
	res.status(404);
	res.send('Url non presente');
});

//Avvio del server su una porta specifica
const server=app.listen(app.get('port'),function(){
    console.log('Server in ascolto');
});