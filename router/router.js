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


router.get('/app/event/' , controllers.eventController.BuscarEventos);

//router.get('/app/event/:id' , controllers.eventController.BuscarEventoPorId);

router.post('/app/event/regist/' , controllers.eventController.CrearEvento);

router.post('/app/event/modify/:id' , controllers.eventController.ModificarEventoPorId);

router.delete('/eliminate/:id' , controllers.eventController.EliminarEvento);



// RUTAS DE ACCESO PARA MODIFICACION DE USUARIOS

router.get('/app/user/' , controllers.userController.BuscarUsuarios);

//router.get('/app/event/:id' , controllers.eventController.BuscarEventoPorId);

router.post('/app/user/regist/' , controllers.userController.RegistrarUsuario);

router.post('/app/user/modify/:id' , controllers.userController.ModificarUsuario);

router.delete('/app/eliminate/:id' , controllers.userController.EliminarUsuario);




//router.get('*', function(req, res) {  
    //res.sendfile('./public/index.html');
//});

module.exports = router;