var pg = require('pg');

var connect = "postgres://admhc:shc211521159796220@10.121.6.4:5432/hceventos";


module.exports = {
  BuscarUsuarios: function(req, res) {
  pg.connect(connect, function(err, client, done) {
    if(err) {
      return console.error('error fetching client from pool', err);
    }
    client.query('SELECT * FROM usuario ORDER BY nombre', function(err, result) {
       if(err) {
        return console.error('error running query');
      }     
      return res.send(result.rows);
    });
  });
},


  RegistrarUsuario: function(req, res) {
  pg.connect(connect, function(err, client, done) {
    if(err) {
      return console.error('error fetching client from pool', err);
    }
    client.query("INSERT INTO usuario (nombre, email, password) VALUES ($1, $2, $3)",
      [req.body.nombre, req.body.email, req.body.password]);
      
      return res.sendStatus(200);
      //return res.Status(200).send({message:"Registro Exitoso"});
  });
},

  
  ModificarUsuario: function(req, res) {
  pg.connect(connect, function(err, client, done) {
    if(err) {
      return console.error('error fetching client from pool', err);
    }
    client.query("UPDATE usuario SET nombre= $1, email = $2, password = $3 WHERE id = $4",
      [req.body.nombre, req.body.email, req.body.password, req.params.id]);
 
      return res.sendStatus(200);
  });
},


EliminarUsuario: function(req, res) {
  pg.connect(connect, function(err, client, done) {
    if(err) {
      return console.error('error fetching client from pool', err);
    }
    client.query("DELETE FROM usuario WHERE id = $1",
      [req.params.id]);
 
      return res.sendStatus(200);
  });
}
}

