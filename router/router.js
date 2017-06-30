var express = require('express'),
  router = express.Router(),
  controllers = require('.././controllers');


router.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods", "GET, POST","PUT","DELETE");
  next();
});



// RUTAS DE ACCESO PARA MODIFICACION DE EVENTOS

router.post('/app/event/create/' , controllers.eventController.CrearEvento)

router.get('/app/event/' , controllers.eventController.BuscarEventos)

router.get('/app/event/:id', controllers.eventController.BuscarEventosporId)

router.put('/app/event/modify/:id' , controllers.eventController.ModificarEvento)

router.put('/app/event/delete/:id' , controllers.eventController.EliminarEvento)



router.post('/app/inscription/event' , controllers.inscriptionEventController.RegistrarenEvento)

router.get('/app/inscription/event' , controllers.inscriptionEventController.BuscarInscripciones)

router.get('/app/inscription/user/:id' , controllers.inscriptionEventController.BuscarInscripcionesporUsuario)

router.delete('/app/event/inscription/delete/:id' , controllers.inscriptionEventController.EliminarInscripcion)


// RUTAS DE ACCESO PARA MODIFICACION DE USUARIOS

router.post('/app/user/register/' , controllers.userController.RegistrarUsuario)

router.get('/app/user/' , controllers.userController.BuscarUsuarios)

router.get('/app/user/:id' , controllers.userController.BuscarUsuarioporId)

router.put('/app/user/modify/:id' , controllers.userController.ModificarUsuario)

router.put('/app/user/delete/:id' , controllers.userController.EliminarUsuario)



//router.get('*', function(req, res) {  
    //res.sendfile('./public/index.html');
//});

module.exports = router;