$(document).ready(function() {
	$('.eliminar-evento').on('click', function() {
		var id = $(this).data('id');
		var url = /eliminate/+id;
		if(confirm('Eliminar Evento?')) {
			$.ajax( {
				url: url,
				type: 'DELETE',
				success: function(result) {
					console.log('Eliminando evento...');
					window.location.href= '/app/event';
				},
				error: function(err) {
					console.log(err);
				}
			});
		}
	});


$(document).ready(function() {
	$('.eliminar-usuario').on('click', function() {
		var id = $(this).data('id');
		var url = /usereliminate/+id;
		if(confirm('Eliminar Usuario?')) {
			$.ajax( {
				url: url,
				type: 'DELETE',
				success: function(result) {
					console.log('Eliminando evento...');
					window.location.href= '/app/user';
				},
				error: function(err) {
					console.log(err);
				}
			});
		}
	});


	$('.editar-evento').on('click', function() {
		$('#edit-form-nombre').val($(this).data('nombre'));
		$('#edit-form-descripcion').val($(this).data('descripcion'));
		$('#edit-form-objetivo').val($(this).data('objetivo'));
		$('#edit-form-id').val($(this).data('id'));
	});
});


	$('.editar-usuario').on('click', function() {
		$('#edit-form-nombre').val($(this).data('nombre'));
		$('#edit-form-email').val($(this).data('email'));
		$('#edit-form-password').val($(this).data('password'));
		$('#edit-form-id').val($(this).data('id'));
	});
});