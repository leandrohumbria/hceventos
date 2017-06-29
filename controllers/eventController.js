var pg = require('pg');
var connect = "postgres://admhc:shc211521159796220@10.121.6.4:5432/hceventos";

module.exports = {  
  CrearEvento: function(req, res) {
    pg.connect(connect, function(err, client, done) {
      if(err) {
        console.log('Problemas de conexion con la Base de Datos', err)
        return res.sendStatus(500)
      }
      client.query('INSERT INTO evento (nombre, detalle, fecha_creacion) VALUES ($1, $2, current_date)', [req.body.nombre, req.body.detalle], function(err, result){
        if(err) {
          console.log('Problemas para realizar la Consulta', err)
          return res.sendStatus(500)
        }
        else{
          console.log('El evento fue creado satisfactoriamente')
          return  res.status(200)
       }
      })  
    })
  },

  BuscarEventos: function(req, res) {
    pg.connect(connect, function(err, client, done) {
      if(err) {
        return console.error('Problemas de conexion con la Base de Datos', err);
      }
      client.query('SELECT * FROM evento ORDER BY id', function(err, result) {
        if(err) {
          return console.error('Problemas para realizar la Consulta', err);
        }  
        return res.send(result.rows) + res.sendStatus(200)
      })
    })
  },

  BuscarEventosporId: function(req, res) {
    pg.connect(connect, function(err, client, done) {
      if(err) {
        return console.error('Problemas de conexion con la Base de Datos', err);
      }
      client.query('SELECT * FROM evento WHERE id=$1', [req.params.id], function(err, result) {
        if(err) {
          return console.error('Problemas para realizar la Consulta', err);
        }  
        return res.send(result.rows) + res.sendStatus(200)
      })
    })
  },
  
  ModificarEventoPorId: function(req, res) {
  pg.connect(connect, function(err, client, done) {
    if(err) {
      return console.error('error fetching client from pool', err);
    }
    client.query("UPDATE evento SET nombre= $1, detalle = $2 WHERE id = $3",
      [req.body.nombre, req.body.detalle, req.params.id]);
 
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
},


  RegistrarenEvento: function(req, res){
  pg.connect(connect, function(err, client, done) {
    if (err) {
      return console.error('Problemas de conexion con la Base de Datos', err)
    }
     client.query('INSERT INTO usuario_evento (id_usuario, id_evento, fecha_registro) VALUES ($1, $2, current_date)',
    [req.params.id, req.body.id_evento], function(err, result){
      if (err) {
        return console.log('No se pudo realizar la insercion de datos', err)
      }
      else{
        return console.log('El registro de datos se realizo datisfactoriamente') + res.sendStatus(200)
      }
    })
  })
}
}

