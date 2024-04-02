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
        error: function (error) {
            console.log(error);
            callback(null);
        },
    });
}