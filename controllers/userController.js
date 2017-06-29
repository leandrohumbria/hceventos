var pg = require('pg');

var connect = "postgres://admhc:shc211521159796220@10.121.6.4:5432/hceventos";



module.exports = {
  BuscarUsuarios: function(req, res) {
  pg.connect(connect, function(err, client, done) {
    if(err) {
      return console.error('Problemas de conexion con la Base de Datos', err)
    }
    client.query('SELECT * FROM usuario ORDER BY nombre', function(err, result) {
       if(err) {
        return console.error('Problemas para realizar la Consulta', err)
      }     
      return res.send(result.rows) + res.sendStatus(200)
    })
  })
},


  RegistrarUsuario: function(req, res) {
    pg.connect(connect, function(err, client, done) {
      if(err) {
        return console.error('Problemas de conexion con la Base de Datos', err)
      }

      else {        
      client.query('SELECT email FROM usuario WHERE email=$1', [req.body.email], function(err, result) {
        //console.log(result.rows.length)
        if(err){
        return console.error('Problemas para realizar la Consulta', err)
        }

        else {
          if(result.rows.length > 0) {
          return console.error('Ese correo Electronico ya fue utilizado')     
          }

          else {
            client.query('SELECT usuario FROM usuario WHERE usuario=$1', [req.body.usuario], function(err, result) {
              if(err){
              return console.error('Problemas para realizar la Consulta', err)
              }
              else {
                if (result.rows.length > 0) {
                  return console.error('Ese nombre de usuario ya fue utilizado')     
                  }
                  else {
                    if(req.body.password != req.body.password2){
                      return console.error('Las contraseñas ingresadas no coinciden')
                      }               
                      else {
                        client.query('INSERT INTO usuario (nombre, apellido, email, password, fecha_registro, hora_registro) VALUES ($1, $2, $3, $4, current_date, current_time)',
                        [req.body.nombre, req.body.apellido, req.body.email, req.body.password], function(err, result){
                          if (err) {
                            return console.log('No se pudo realizar la insercion de datos', err)
                          }
                          else{
                            return console.log('El registro de datos se realizo datisfactoriamente') + res.sendStatus(200)
                          }
                        })
                      }
                    }
                  }                    
                })
                }
              }
            })
          }
      })
  },

  
  ModificarUsuario: function(req, res) {
  pg.connect(connect, function(err, client, done) {
    if(err) {
      return console.error('error fetching client from pool', err);
    }
    client.query('UPDATE usuario SET nombre= $1, apellido=$2, email=$3, email_lab=$4, cedula=$5, password=$6, tel_mov=$7, tel_hab=$8, fech_nac=$9, genero=$10, dir_hab=$11, lug_trab=$12, tip_rol=$13, eliminado=$falso WHERE id = $15', 
      [req.body.nombre, req.body.apellido, req.body.email, req.body.email_lab, req.body.cedula, req.body.password, req.body.tel_mov, req.body.tel_hab, req.body.fech_nac, req.body.genero,
      req.body.dir_hab, req.body.lug_trab, req.body.tip_rol, req.params.id]);
 
      return res.sendStatus(200);
  })
},


EliminarUsuario: function(req, res) {
  pg.connect(connect, function(err, client, done) {
    if(err) {
      return console.error('Problemas de conexion con la Base de Datos', err);
    }
    client.query("UPDATE usuario SET eliminado=TRUE WHERE id = $1",
      [req.params.id], function(err, result){
        if(err){
          return console.log('No se pudo eliminar el usuario', err)           
        }
        else{
          return console.log('El usuario fue eliminado satisfactoriamente') + res.sendStatus(200)        
        }
      })
  })
}
}