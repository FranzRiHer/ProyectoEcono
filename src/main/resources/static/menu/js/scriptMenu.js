function redireccionar(elemento) {
    var idElemento = elemento.id;  
    sendLink(idElemento, function (nuevoLink) {
        if (nuevoLink) {
            window.location.href = nuevoLink; // Redirige a la nueva URL
        } else {
            console.error("No se pudo obtener el nuevo enlace.");
        }
    });
}

function sendLink(idElemento, callback) {
    let token = localStorage.getItem('token');
    $.ajax({
        url: "http://localhost:8080/menu/vista/" + idElemento,
        type: "GET",
        dataType: "text", // Cambiado a "text" porque estamos esperando una ruta como texto
        beforeSend: function (xhr) {
            if (token) {
                xhr.setRequestHeader("Authorization", "Bearer " + token);
            }
        },

        success: function (result) {
            console.log(result);
            callback(result);
        },
        error: function (xhr,error) {
            if (xhr.status === 401) {
                // Token expirado o inválido, manejar la redirección
                manejarExpiracionToken();
            }else{
                alert('Error con el servidor');
            }
        },
    });
}

function manejarExpiracionToken() {
    alert("Su sesión ha expirado. Por favor, inicie sesión de nuevo.");
    window.location.href = '/src/main/resources/static/acceso/login/login.html'; // Redirige al usuario a la página de inicio de sesión
}

function cerrarSesion() {
    localStorage.removeItem('token'); // Elimina el token de localStorage
    window.location.href = '/src/main/resources/static/acceso/login/login.html'; // Redirige al login
}