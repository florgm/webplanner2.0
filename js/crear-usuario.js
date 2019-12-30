$(document).ready(function() {
    var contador = 0;
    var forms = document.getElementsByClassName('needs-validation');

    $('#registrationForm').bootstrapValidator();

    var validation = Array.prototype.filter.call(forms, function(form) {
        $('#registrationForm').on('submit', function(e) {
            contador++;
            if (form.checkValidity() === false) {
                event.preventDefault();
                event.stopPropagation();
            } else {
                e.preventDefault();
            
                if(contador === 2) {
                    var datos = {
                        nombre:document.registrationForm.nombre.value,
                        usuario:document.registrationForm.usuario.value,
                        password:document.registrationForm.password.value
                    }
                    
                    $.ajax({
                        type: $(this).attr('method'),
                        data: JSON.stringify(datos),
                        url: $(this).attr('action'),
                        contentType: 'application/json',
                        success: function(msg) {
                            if(msg) {
                                Swal.fire({
                                    title: 'Éxito!',
                                    text: "Usuario registrado correctamente",
                                    type: 'success',
                                    showCloseButton: false,
                                    showCancelButton: false,
                                    confirmButtonColor: '#3085d6',
                                    confirmButtonText: 'Ingresa'
                                }).then((result) => {
                                    if (result.value) {
                                      document.location.href='index.html';
                                    }
                                })
                            }
                        },
                        error: function() {
                            Swal.fire({
                                title: '<strong>Error</strong>',
                                type: 'error',
                                text: 'El usuario ya está registrado',
                                showCloseButton: false,
                                showCancelButton: true,
                                focusConfirm: false,
                                confirmButtonText: 'Login',
                                confirmButtonAriaLabel: 'Login',
                                cancelButtonText: 'Reintentar',
                                cancelButtonAriaLabel: 'Reintentar',
                            }).then((result) => {
                                if (result.value) {
                                    document.location.href='index.html';
                                } else if (result.dismiss === Swal.DismissReason.cancel) {
                                    $('#nombre').val('');
                                    $('#usuario').val('');
                                    $('#password').val('');
                                    $('#repassword').val('');
                                }
                            })
                        }
                    })
                    contador = 0;
                }
            }
            form.classList.add('was-validated');
        })
    })
});