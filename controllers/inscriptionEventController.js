var pg = require('pg');
var connect = "postgres://admhc:shc211521159796220@10.121.6.4:5432/hceventos";

module.exports = {
	RegistrarenEvento: function(req, res){
		pg.connect(connect, function(err, client, done) {
			if (err) {
				return console.error('Problemas de conexion con la Base de Datos', err)
			}
			 client.query('INSERT INTO usuario_evento (id_usuario, id_evento, fecha_registro) VALUES ($1, $2, current_date)',
			[req.params.id, req.body.id_evento], function(err, result){
				if (err) {
					console.log('No se pudo realizar la insercion de datos', err)
					return res.sendStatus(500)
				}
				else{
					console.log('Fue registrado en el evento de manera exitosa')
          return res.sendStatus(200)
				}
			})
		})
	},

	BuscarInscripciones: function(req, res) {
		pg.connect(connect, function(err, client, done) {
			if (err) {
				console.log('Problemas de conexion con la Base de Datos', err)
        return res.status(500)				
			}
			client.query('SELECT * FROM usuario_evento', function(err, result) {
				if (err) {
					console.log('Problemas para realizar la Consulta', err)
          return res.status(500)
				}
				else {
					console.log('Busqueda de Inscripciones, exitosa')
					return res.status(200).send(result.rows)
				}
			})
		})
	},

	BuscarInscripcionesporUsuario: function(req, res) {
		pg.connect(connect, function(err, client, done) {
			if (err) {
				console.log('Problemas de conexion con la Base de Datos', err)
        return res.status(500)				
			}
			client.query('SELECT e.id, e.nombre, e.detalle evento FROM usuario_evento ue INNER JOIN evento e ON ue.id_evento = e.id WHERE id_usuario=$1', [req.params.id], function(err, result) {
				if (err) {
					console.log('Problemas para realizar la Consulta', err)
          return res.status(500)
				}
				else {
					console.log('Busqueda de Inscripcion, exitosa')
					return res.status(200).send(result.rows)
				}
			})
		})
	},

	EliminarInscripcion: function(req, res) {
		pg.connect(connect, function(err, client, done) {
			if (err) {
				console.log('Problemas de conexion con la Base de Datos', err)
        return res.sendStatus(500)
			}
			client.query("DELETE FROM usuario_evento WHERE id_usuario=$1 AND id_evento=$2",
        [req.params.id, req.body.id_evento], function(err, result) {
				if (err) {
					console.log('No se pudo eliminar el registro de la inscripcion', err)
          return res.sendStatus(500)
				}
				else {
					console.log('El usuario fue eliminado de manera exitosa')
          return res.sendStatus(200)
				}
			})
		})
	}

}
