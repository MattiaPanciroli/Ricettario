// Dipendenze del progetto
const express = require('express');//importo il framework Express
const app = express();
const fs = require('fs'); //importo il modulo per la gestione del File System
const morgan = require('morgan');  //importo il modulo per la gestione dei logger
const path = require('path'); //importo il modulo per la gestione dei percorsi delle cartelle e dei file
const helmet = require('helmet'); //importo il modulo per rendere il server web piu sicuro
//const mymodule=require('./moduli/frase_del_giorno');
const cors = require('cors');// Cors (Cross origin resource sharing, protocollo che permette il passaggio di dati tra applicazioni e domini diversi)
const bodyParser = require('body-parser');//Per leggere i parametri POST occorre preventivamente installare il modulo body-parser

const axios = require('axios');

//Sezione impostazione dell’app (app.set)app.set ('port',process.env.PORT || 3000); //imposta la porta in cui è in ascolto il server
app.set('appName', 'Ricettario'); //imposta il nome dell'applicazione web
app.set('port', process.env.PORT || 3000); //imposta la porta in cui è in ascolto il server

//Sezione Middleweare
//Middleweare Morgan: per la creazione di un logger: formati predefiniti (short, combined, common, tiny)
//oppure app.use(morgan(':method :url :status - :response-time ms', {stream: accessLogStream}));
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });
app.use(morgan('short', { stream: accessLogStream }));
//Middleweare sicurezza helmet
app.use(helmet());

//setta la rotta per tutte le risorse statiche
app.use(cors());
app.use("/public", express.static(path.join(__dirname, "public")));

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

// Configura il motore di template Pug
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

//Sezione Route

//GET

app.get('/addRicetta', async (req, res) => {
  let ingredienti = await axios('https://hofman.alwaysdata.net/ingredienti');
  let paesi = await axios('https://hofman.alwaysdata.net/paesi');
  let portate = await axios('https://hofman.alwaysdata.net/portate');
  let categorie = await axios('https://hofman.alwaysdata.net/categorie');
  let cotture = await axios('https://hofman.alwaysdata.net/cotture');
  //console.log(ingredienti.data);
  res.render('addRicetta', { "ingredienti": ingredienti.data, "paesi": paesi.data, "portate": portate.data, "categorie": categorie.data, "cotture": cotture.data });
});
app.get('/addCategoria', (req, res) => {
  res.render('addCategoria');
});
app.get('/addCottura', (req, res) => {
  res.render('addCottura');
});
app.get('/addPaese', (req, res) => {
  res.render('addPaese');
});
app.get('/addPortata', (req, res) => {
  res.render('addPortata');
});
app.get('/addIngrediente', (req, res) => {
  res.render('addIngrediente');
});

app.get('/deleteRicetta', (req, res) => {
  res.render('deleteRicetta');
});
app.get('/deleteCategoria', (req, res) => {
  res.render('deleteCategoria');
});
app.get('/deleteCottura', (req, res) => {
  res.render('deleteCottura');
});
app.get('/deletePaese', (req, res) => {
  res.render('deletePaese');
});
app.get('/deletePortata', (req, res) => {
  res.render('deletePortata');
});
app.get('/deleteIngrediente', (req, res) => {
  res.render('deleteIngrediente');
});

app.get('/editRicetta', (req, res) => {
  res.render('editRicetta');
});
app.get('/editCategoria', (req, res) => {
  res.render('editCategoria');
});
app.get('/editCottura', (req, res) => {
  res.render('editCottura');
});
app.get('/editPaese', (req, res) => {
  res.render('editPaese');
});
app.get('/editPortata', (req, res) => {
  res.render('editPortata');
});
app.get('/editIngrediente', (req, res) => {
  res.render('editIngrediente');
});

//POST

app.post('/ricette', (req, res) => {
  const { titolo, tempo_preparazione, porzioni, testo, livello, ingredienti, paesi, portate, categorie, cotture } = req.body;

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://hofman.alwaysdata.net/ricette',
    headers: {},
    data: {
      "ricetta": {
        titolo,
        tempo_preparazione,
        porzioni,
        testo,
        livello
      },
      "ingredienti":ingredienti,
      "paesi":paesi,
      "portate":portate,
      "categorie":categorie,
      "cotture":cotture
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

app.post('/categorie', (req, res) => {
  const { nome } = req.body;

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://hofman.alwaysdata.net/categorie',
    headers: {},
    data: {
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

app.post('/cotture', (req, res) => {
  const { nome } = req.body;

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://hofman.alwaysdata.net/cotture',
    headers: {},
    data: {
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

app.post('/paesi', (req, res) => {
  const { nome } = req.body;

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://hofman.alwaysdata.net/paesi',
    headers: {},
    data: {
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

app.post('/portate', (req, res) => {
  const { nome } = req.body;

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://hofman.alwaysdata.net/portate',
    headers: {},
    data: {
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

app.post('/ingredienti', (req, res) => {
  const { nome, descrizione } = req.body;

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://hofman.alwaysdata.net/ingredienti',
    headers: {},
    data: {
      nome,
      descrizione
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

app.post('/eliminaRicetta', (req, res) => {
  const id = req.body.id;
  let config = {
    method: 'delete',
    maxBodyLength: Infinity,
    url: 'https://hofman.alwaysdata.net/ricette/' + id + '',
    headers: {},
    data: {
      id
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

app.post('/eliminaCategoria', (req, res) => {
  const id = req.body.id;
  let config = {
    method: 'delete',
    maxBodyLength: Infinity,
    url: 'https://hofman.alwaysdata.net/categorie/' + id + '',
    headers: {},
    data: {
      id
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

app.post('/eliminaCottura', (req, res) => {
  const id = req.body.id;
  let config = {
    method: 'delete',
    maxBodyLength: Infinity,
    url: 'https://hofman.alwaysdata.net/cotture/' + id + '',
    headers: {},
    data: {
      id
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

app.post('/eliminaPaese', (req, res) => {
  const id = req.body.id;
  let config = {
    method: 'delete',
    maxBodyLength: Infinity,
    url: 'https://hofman.alwaysdata.net/paesi/' + id + '',
    headers: {},
    data: {
      id
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

app.post('/eliminaPortata', (req, res) => {
  const id = req.body.id;
  let config = {
    method: 'delete',
    maxBodyLength: Infinity,
    url: 'https://hofman.alwaysdata.net/portate/' + id + '',
    headers: {},
    data: {
      id
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

app.post('/eliminaIngrediente', (req, res) => {
  const id = req.body.id;
  let config = {
    method: 'delete',
    maxBodyLength: Infinity,
    url: 'https://hofman.alwaysdata.net/ingredienti/' + id + '',
    headers: {},
    data: {
      id
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

//PATCH
app.post('/modificaRicetta', async (req, res) => {
  const id = req.body.id;
  const titolo = req.body.titolo;

  let config = {
    method: 'patch',
    maxBodyLength: Infinity,
    url: 'https://hofman.alwaysdata.net/ricette/' + id + '',
    headers: {},
    data: {
      titolo: '' + titolo + ''
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

app.post('/modificaCategoria', async (req, res) => {
  const id = req.body.id;
  const nome = req.body.nome;

  let config = {
    method: 'patch',
    maxBodyLength: Infinity,
    url: 'https://hofman.alwaysdata.net/categorie/' + id + '',
    headers: {},
    data: {
      nome: '' + nome + ''
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

app.post('/modificaCottura', async (req, res) => {
  const id = req.body.id;
  const nome = req.body.nome;

  let config = {
    method: 'patch',
    maxBodyLength: Infinity,
    url: 'https://hofman.alwaysdata.net/cotture/' + id + '',
    headers: {},
    data: {
      nome: '' + nome + ''
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

app.post('/modificaPaese', async (req, res) => {
  const id = req.body.id;
  const nome = req.body.nome;

  let config = {
    method: 'patch',
    maxBodyLength: Infinity,
    url: 'https://hofman.alwaysdata.net/paesi/' + id + '',
    headers: {},
    data: {
      nome: '' + nome + ''
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

app.post('/modificaPortata', async (req, res) => {
  const id = req.body.id;
  const nome = req.body.nome;

  let config = {
    method: 'patch',
    maxBodyLength: Infinity,
    url: 'https://hofman.alwaysdata.net/portate/' + id + '',
    headers: {},
    data: {
      nome: '' + nome + ''
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

app.post('/modificaIngrediente', async (req, res) => {
  const id = req.body.id;
  const nome = req.body.nome;
  const descrizione = req.body.nome;

  let config = {
    method: 'patch',
    maxBodyLength: Infinity,
    url: 'https://hofman.alwaysdata.net/ingredienti/' + id + '',
    headers: {},
    data: {
      nome: '' + nome + '',
      descrizione: '' + descrizione + ''
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
const server = app.listen(app.get('port'), function () {
  console.log('Server in ascolto');
});