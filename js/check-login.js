$(document).ready(function() {
    var contador = 0;
    $('#loginForm').bootstrapValidator();

    $('#loginForm').on('submit', function(e) {
        e.preventDefault();
        contador++;
        if(contador === 2) {
            var datos = {
                usuario:document.loginForm.usuario.value,
                password:document.loginForm.password.value
            }
            $.ajax({
                type: $(this).attr('method'),
                data: JSON.stringify(datos),
                url: $(this).attr('action'),
                contentType: 'application/json',
                success: function(msg) {
                    document.cookie = "token=" + msg + "; path=/"
                    document.location.href='principal.html';
                },
                error: function() {
                    Swal.fire({
                        title: '<strong>Error</strong>',
                        type: 'error',
                        text: 'El usuario ingresado no existe o la contraseña es incorrecta',
                        showCloseButton: false,
                        showCancelButton: false,
                        focusConfirm: false,
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: 'Reintentar',
                        confirmButtonAriaLabel: 'Reintentar',
                    }).then((result) => {
                        if (result.value) {
                            document.location.href='index.html';
                        } 
                    })
                }   
            })
        }
    });
});