var pg = require('pg');
var connect = "postgres://admhc:shc211521159796220@10.121.6.4:5432/hceventos";

module.exports = {
  BuscarUsuarios: function(req, res) {
    pg.connect(connect, function(err, client, done) {
      if(err) {
        console.log('Problemas de conexion con la Base de Datos', err)
        return res.status(500)
      }
      client.query('SELECT * FROM usuario ORDER BY id', function(err, result) {
         if (err) {
          console.log('Problemas para realizar la Consulta', err)
          return res.status(500)
        }
        else{
          console.log('Busqueda de Usuarios, exitosa')
          return res.status(200).send(result.rows)
        }           
      })
    })
  },

  BuscarUsuarioporId: function(req, res) {
    pg.connect(connect, function(err, client, done) {
      if(err) {
        console.log('Problemas de conexion con la Base de Datos', err);
        return res.sendStatus(500)
      }
      client.query('SELECT * FROM usuario WHERE id=$1', [req.params.id], function(err, result) {
        if(err) {
          console.log('Problemas para realizar la Consulta', err);
          return res.sendStatus(500)
        }
        else {
          console.log('Busqueda de Usuario, Exitosa')
          return res.status(200).send(result.rows)
        } 
      })
    })
  },

  RegistrarUsuario: function(req, res) {
    pg.connect(connect, function(err, client, done) {
      if(err) {
        console.log('Problemas de conexion con la Base de Datos', err)
        return res.sendStatus(500)
      }
      else {        
      client.query('SELECT email FROM usuario WHERE email=$1', [req.body.email], function(err, result) {
        //console.log(result.rows.length)
        if(err){
          console.log('Problemas para realizar la Consulta', err)
          return res.sendStatus(500)
        }
        else {
          if(result.rows.length > 0) {
            console.log('Ese correo Electronico ya fue utilizado')     
            return res.sendStatus(400)
          }
          else {
            client.query('SELECT usuario FROM usuario WHERE usuario=$1', [req.body.usuario], function(err, result) {
              if(err){
                console.log('Problemas para realizar la Consulta', err)
                return res.sendStatus(500)
              }
              else {
                if (result.rows.length > 0) {
                  console.log('Ese nombre de usuario ya fue utilizado')
                  return res.sendStatus(400)
                  }
                  else {
                    if(req.body.password != req.body.password2){
                      console.log('Las contraseñas ingresadas no coinciden')
                      return res.sendStatus(400)
                      }               
                      else {
                        client.query('INSERT INTO usuario (nombre, apellido, email, password, fecha_registro, hora_registro) VALUES ($1, $2, $3, $4, current_date, current_time)',
                        [req.body.nombre, req.body.apellido, req.body.email, req.body.password], function(err, result){
                          if (err) {
                            console.log('No se pudo realizar la insercion de datos', err)
                            return res.sendStatus(500)
                          }
                          else{
                            console.log('Registro Insertado con Exito')
                            return res.sendStatus(200)
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
        console.log('Problemas de conexion con la Base de Datos', err)
        return res.sendStatus(500)
      }
      client.query('UPDATE usuario SET nombre= $1, apellido=$2, email=$3 WHERE id = $4', 
        [req.body.nombre, req.body.apellido, req.body.email, req.params.id], function(err, result){
          if (err) {
            console.log('No se pudo actualizar los datos del usuario', err)
            return res.sendStatus(400)          
          }
          else{
            console.log('El registro ha sido actualizado')
            return res.sendStatus(200)
          }
        })
    })
  },

  EliminarUsuario: function(req, res) {
    pg.connect(connect, function(err, client, done) {
      if(err) {
        console.log('Problemas de conexion con la Base de Datos', err)
        return res.sendStatus(500)
      }
      client.query("UPDATE usuario SET eliminado=TRUE WHERE id = $1",
        [req.params.id], function(err, result){
          if(err){
            console.log('No se pudo eliminar el usuario')
            return res.sendStatus(500)
          }
          else{
            console.log('El usuario fue eliminado de manera exitosa')
            return res.sendStatus(200)
          }
        })
      })
    }
  }