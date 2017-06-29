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

router.post('/app/event/create/' , controllers.eventController.CrearEvento);

router.get('/app/event/' , controllers.eventController.BuscarEventos);

router.get('/app/event/:id', controllers.eventController.BuscarEventosporId);

router.post('/app/event/modify/:id' , controllers.eventController.ModificarEventoPorId);

router.put('/app/event/eliminate/:id' , controllers.eventController.EliminarEvento);

router.post('/app/event/registuser/:id' , controllers.eventController.RegistrarenEvento);


// RUTAS DE ACCESO PARA MODIFICACION DE USUARIOS

router.get('/app/user/' , controllers.userController.BuscarUsuarios);

router.post('/app/user/regist/' , controllers.userController.RegistrarUsuario);

router.post('/app/user/modify/:id' , controllers.userController.ModificarUsuario);

router.put('/app/user/eliminate/:id' , controllers.userController.EliminarUsuario);



//router.get('*', function(req, res) {  
    //res.sendfile('./public/index.html');
//});

module.exports = router;