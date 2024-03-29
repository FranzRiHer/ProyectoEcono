$(document).ready(function () {
    $('#registerBtn').click(function (e) {
        e.preventDefault();

        var name = $('#name').val().trim();
        var email = $('#email').val().trim();
        var username = $('#username').val().trim();
        var password = $('#password').val().trim();
        var role = $('#role').val().trim();

        // Verificar que todos los campos estén llenos
        if (name === "" || email === "" || username === "" || password === "" || role === "") {
            alert("Por favor, rellena todos los campos.");
            return;
        }

        var data = {
            nombre: name,
            email: email,
            username: username,
            password: password,
            rol: role
        };

        $.ajax({
            type: "POST",
            url: "http://localhost:8080/auth/register",
            data: JSON.stringify(data),
            contentType: "application/json",
            success: function (response) {
                // Aquí podrías almacenar el token si el registro también inicia sesión automáticamente
                // localStorage.setItem('token', response.token);
                alert("Registro exitoso. Por favor, inicie sesión.");
                // Redireccionar al usuario a la página de inicio de sesión
                window.location.href = '/src/main/resources/static/principal/index.html';
            },
            error: function (xhr, status, error) {
                // Manejar errores específicos del registro (por ejemplo, usuario ya existe)
                alert("Error en el registro: " + xhr.responseText);
            }
        });
    });

    // Si necesitas un botón para redireccionar al registro o al login puedes añadirlo aquí
});
