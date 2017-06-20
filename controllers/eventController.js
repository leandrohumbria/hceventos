var pg = require('pg');

var connect = "postgres://admhc:shc211521159796220@10.121.6.4:5432/hceventos";


module.exports = {
  BuscarEventos: function(req, res) {
  pg.connect(connect, function(err, client, done) {
    if(err) {
      return console.error('error fetching client from pool', err);
    }
    client.query('SELECT * FROM evento ORDER BY nombre', function(err, result) {
      if(err) {
        return console.error('error running query');
      }  
      return res.send(result.rows);
    });
  });
},


  CrearEvento: function(req, res) {
  pg.connect(connect, function(err, client, done) {
    if(err) {
      return console.error('error fetching client from pool', err);
    }
    client.query("INSERT INTO evento (nombre, descripcion, objetivo) VALUES ($1, $2, $3)",
      [req.body.nombre, req.body.descripcion, req.body.objetivo]);

     return res.sendStatus(200);
  });
},


  
  ModificarEventoPorId: function(req, res) {
  pg.connect(connect, function(err, client, done) {
    if(err) {
      return console.error('error fetching client from pool', err);
    }
    client.query("UPDATE evento SET nombre= $1, descripcion = $2, objetivo = $3 WHERE id = $4",
      [req.body.nombre, req.body.descripcion, req.body.objetivo, req.params.id]);
 
    return res.sendStatus(200);                                               
  });
},


EliminarEvento: function(req, res) {
  pg.connect(connect, function(err, client, done) {
    if(err) {
      return console.error('error fetching client from pool', err);
    }
    client.query("DELETE FROM evento WHERE id = $1",
      [req.params.id]);
 
      return res.sendStatus(200);
  });
}
}

