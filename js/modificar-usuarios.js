$(document).ready(function(){
    var contador = 0;

    function getCookie(cname) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for(var i = 0; i <ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
            c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
            }
        }
        return "";
    }
    
    var token = getCookie("token")

    $('#perfilForm').bootstrapValidator();
    $('#perfilForm').on('submit', function(e){
        contador++;
        e.preventDefault();

        if(contador === 2){
            var datos = {
                nombre:document.perfilForm.nombre.value,
                password:document.perfilForm.password.value
            }
            $.ajax({
                type: $(this).attr('method'),
                data: JSON.stringify(datos),
                url: $(this).attr('action'),
                contentType: 'application/json',
                headers: {"Authorization":token},
                success: function(msg) {
                    if(msg) {
                        Swal.fire({
                            title: 'Éxito!',
                            text: "Cambio registrado correctamente",
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
                        text: 'No se pudo realizar el cambio',
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
    });
    
    $('#btnLogout').click(function() {
        $.ajax({
            type:'GET',
            url:'https://webplanner-api.herokuapp.com/auth/logout',
            headers: {"Authorization":token},
            success: function(msg) {
                document.location.href='index.html';
            },
            error: function() {
                alert("Hay un error al salir de la sesion");
            }
        });
    })
})