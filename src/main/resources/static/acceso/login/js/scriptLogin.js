$(document).ready(function () {
    $('#loginBtn').click(function (e) {
        e.preventDefault();

        var username = $('#username').val().trim();
        var password = $('#password').val().trim();

        if (username === "" || password === "") {
            alert("Por favor, rellena todos los campos.");
            return;
        }

        var data = {
            username: username,
            password: password
        };

        $.ajax({
            type: "POST",
            url: "http://localhost:8080/auth/login",
            data: JSON.stringify(data),
            contentType: "application/json",
            success: function (response) {
                localStorage.setItem('token', response.token);
    
                // Decodificar el token JWT
                var tokenParts = response.token.split('.'); // Dividir el token en sus partes
                var tokenPayload = JSON.parse(atob(tokenParts[1])); // Decodificar y analizar la parte codificada del token
                
                // Comprobación adicional para asegurarse de que el campo userId existe
                if (tokenPayload.userId) {
                    var userId = tokenPayload.userId;
                    var rol = tokenPayload.rol;
                    // Guardar el ID del usuario en localStorage
                    localStorage.setItem('userId', userId);
                    localStorage.setItem('rol',rol)
                    // Redireccionar a la página principal
                    if (rol == "USER"){
                        window.location.href = '/src/main/resources/static/estudiante/principal/indexEst.html';
                    } else {
                        window.location.href = '/src/main/resources/static/administrador/principal/indexAdmin.html';
                    }
                    
                } else {
                    // Manejar el caso de que userId no exista o sea null
                    alert("Error al obtener la información del usuario. Por favor, intenta nuevamente.");
                }
            },
            error: function (xhr, status, error) {
                alert("Error en el inicio de sesión: " + xhr.responseText);
            }
        });
    });

    $('#registrarseBtn').click(function () {
        window.location.href = 'http://127.0.0.1:5500/src/main/resources/static/acceso/registroUsuario/regitroUsuario.html'; 
    });
});
function showRecoverPasswordForm() {
    // O redireccionar al usuario a otra página
     window.location.href = '/src/main/resources/static/acceso/recuperarContrasena/recuperarContrasena.html';
}