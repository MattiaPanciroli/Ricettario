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

//POST

app.post('/ricette', (req, res) => {
  const { titolo, tempo_preparazione, porzioni, testo, livello } = req.body;

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://hofman.alwaysdata.net/ricette',
        headers: { },
        data:{
          titolo, 
          tempo_preparazione, 
          porzioni, 
          testo, 
          livello
        }
    };
        
    axios.request(config)
    .then((response) => {
        console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
        console.log(error);
    });

});

app.post('/categorie', (req,res) => {
  const {nome} =req.body;

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://hofman.alwaysdata.net/categorie',
        headers: {},
        data:{
          nome
        }
    };

    axios.request(config)
        .then((response) => {
            console.log(JSON.stringify(response.data));
        })
        .catch((error) => {
            console.log(error);
        });
  
});

app.post('/cotture', (req,res) => {
  const {nome} =req.body;

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://hofman.alwaysdata.net/cotture',
        headers: { },
        data:{
          nome
        }
      };
      
      axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  
});

app.post('/paesi', (req,res) => {
  const {nome} =req.body;

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://hofman.alwaysdata.net/paesi',
        headers: { },
        data:{
          nome
        }
      };
      
      axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  
});

app.post('/portate', (req,res) => {
  const {nome} =req.body;

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://hofman.alwaysdata.net/portate',
        headers: { },
        data:{
          nome
        }
      };
      
      axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  
});

//DELETE

app.delete('/eliminaRicetta', (req,res) => {
    const id = req.body.id;
    let config = {
        method: 'delete',
        maxBodyLength: Infinity,
        url: 'https://hofman.alwaysdata.net/ricette/'+ id +'',
        headers: { }
      };
      
      axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  
});

app.delete('/eliminaCategoria', (req,res) => {
    const id = req.body.id;
    let config = {
        method: 'delete',
        maxBodyLength: Infinity,
        url: 'https://hofman.alwaysdata.net/categorie/'+ id +'',
        headers: { }
      };
      
      axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  
});

app.delete('/eliminaCottura', (req,res) => {
    const id = req.body.id;
    let config = {
        method: 'delete',
        maxBodyLength: Infinity,
        url: 'https://hofman.alwaysdata.net/cotture/'+ id +'',
        headers: { }
      };
      
      axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  
});

app.delete('/eliminaPaese', (req,res) => {
    const id = req.body.id;
    let config = {
        method: 'delete',
        maxBodyLength: Infinity,
        url: 'https://hofman.alwaysdata.net/paesi/'+ id +'',
        headers: { }
      };
      
      axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  
});

app.delete('/eliminaPortata', (req,res) => {
    const id = req.body.id;
    let config = {
        method: 'delete',
        maxBodyLength: Infinity,
        url: 'https://hofman.alwaysdata.net/portate/'+ id +'',
        headers: { }
      };
      
      axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  
});

//PATCH
app.patch('/modificaRicetta', async (req, res) => {
    const id = req.body.id;
    const titolo = req.body.titolo;

    let config = {
        method: 'patch',
        maxBodyLength: Infinity,
        url: 'https://hofman.alwaysdata.net/ricette/'+ id +'',
        headers: { },
        data:{
            titolo: ''+ titolo +''
        }
      };
      
      axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
    
});

app.patch('/modificaCategoria', async (req, res) => {
    const id = req.body.id;
    const nome = req.body.nome;

    let config = {
        method: 'patch',
        maxBodyLength: Infinity,
        url: 'https://hofman.alwaysdata.net/categorie/'+ id +'',
        headers: { },
        data:{
            nome: ''+ nome +''
        }
      };
      
      axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
});

app.patch('/modificaCottura', async (req, res) => {
    const id = req.body.id;
    const nome = req.body.nome;

    let config = {
        method: 'patch',
        maxBodyLength: Infinity,
        url: 'https://hofman.alwaysdata.net/cotture/'+ id +'',
        headers: { },
        data:{
            nome: ''+ nome +''
        }
      };
      
      axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
});

app.patch('/modificaPaese', async (req, res) => {
    const id = req.body.id;
    const nome = req.body.nome;

    let config = {
        method: 'patch',
        maxBodyLength: Infinity,
        url: 'https://hofman.alwaysdata.net/paesi/'+ id +'',
        headers: { },
        data:{
            nome: ''+ nome +''
        }
      };
      
      axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
});

app.patch('/modificaPortata', async (req, res) => {
    const id = req.body.id;
    const nome = req.body.nome;

    let config = {
        method: 'patch',
        maxBodyLength: Infinity,
        url: 'https://hofman.alwaysdata.net/portate/'+ id +'',
        headers: { },
        data:{
            nome: ''+ nome +''
        }
      };
      
      axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
});

//Avvio del server su una porta specifica
const server=app.listen(app.get('port'),function(){
    console.log('Server in ascolto');
});