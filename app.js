var express = require('express'),
  path = require('path'),  
  bodyParser = require('body-parser'),
  cons = require('consolidate'),
  dust = require('dustjs-helpers'),
  router = require('./router/router'),
  app = express();


// Agregar ingenieria para archivos de formato dust
app.engine('dust', cons.dust);

// Agregar extension por defecto
app.set('view engine', 'dust');
app.set('views', __dirname + '/views');

//Agregar carpeta publica
app.use(express.static(path.join(__dirname, 'public')));

//Agregamos el Middleware Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


app.use('/', router);


  // Server
app.listen(3000, function() {
  console.log('Server escuchando');
});