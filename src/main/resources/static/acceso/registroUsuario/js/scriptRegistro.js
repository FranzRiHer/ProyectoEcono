$(document).ready(function() {
    // Escuchar el evento 'keypress' en el campo de contraseña
    $(document).keypress(function(event) {
        // Verificar si la tecla presionada es 'Enter' (código 13)
        if (event.which === 13) {
            // Llamar a la función logIn para iniciar sesión
            registro();
        }
    });
});


function registro() {

    var name = $('#name').val().trim();
    var email = $('#email').val().trim();
    var username = $('#username').val().trim();
    var password = $('#password').val().trim();
    var role = $('#role').val().trim();

    // Verificar que todos los campos estén llenos
    if (name === "" || email === "" || username === "" || password === "" || role === "") {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Por favor, rellena todos los campos."
        });
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
            Swal.fire({
                title: "¡Comienza a gestionar tus finanzas hoy mismo!",
                text: "Registro exitoso. Por favor, inicie sesión.",
                icon: "success"
            });
            // Redireccionar al usuario a la página de inicio de sesión
            setTimeout(1000);
            window.location.href = '/src/main/resources/static/acceso/login/login.html';
        },
        error: function (xhr, status, error) {
            // Manejar errores específicos del registro (por ejemplo, usuario ya existe)
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Error en el inicio de sesión: " + xhr.responseText
            });
        }
    });
};
