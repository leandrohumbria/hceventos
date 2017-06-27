var pg = require('pg');

var connect = "postgres://admhc:shc211521159796220@10.121.6.4:5432/hceventos";


module.exports = {
  BuscarEventos: function(req, res) {
  pg.connect(connect, function(err, client, done) {
    if(err) {
      return console.error('Problemas de conexion con la Base de Datos', err);
    }
    client.query('SELECT * FROM evento ORDER BY nombre', function(err, result) {
      if(err) {
        return console.error('Problemas para realizar la Consulta', err);
      }  
      return res.send(result.rows) + res.sendStatus(200)
    })
  })
},


  CrearEvento: function(req, res) {
  pg.connect(connect, function(err, client, done) {
    if(err) {
      return console.error('Problemas de conexion con la Base de Datos', err);
    }
    client.query('INSERT INTO evento (nombre, descripcion, objetivo, eliminado) VALUES ($1, $2, $3, FALSE)',
      [req.body.nombre, req.body.descripcion, req.body.objetivo]);

     return console.log ('El evento fue creado satisfactoriamente') + res.sendStatus(200);
  })
},

  
  ModificarEventoPorId: function(req, res) {
  pg.connect(connect, function(err, client, done) {
    if(err) {
      return console.error('error fetching client from pool', err);
    }
    client.query("UPDATE evento SET nombre= $1, descripcion = $2, objetivo = $3 WHERE id = $4",
      [req.body.nombre, req.body.descripcion, req.body.objetivo, req.params.id]);
 
    return res.sendStatus(200);                                               
  })
},


EliminarEvento: function(req, res) {
  pg.connect(connect, function(err, client, done) {
    if(err) {
      return console.error('Problemas de conexion con la Base de Datos', err)
    }
    client.query("UPDATE evento SET eliminado=TRUE WHERE id = $1",
      [req.params.id], function(err, result) {
      if(err){
        return console.log('No se pudo eliminar el evento', err)      
      }
      else{
        return console.log('El evento fue eliminado satisfactoriamente') + res.sendStatus(200)
      }
    })
  })
}
}

