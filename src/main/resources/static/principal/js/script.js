function redireccionar(elemento) {
    var idElemento = elemento.id;
    sendLink(idElemento, function (nuevoLink) {
        elemento.href = nuevoLink;
    });
}

function sendLink(idElemento, callback) {
    $.ajax({
        url: "http://localhost:8080/menu/vista/" + idElemento,
        type: "GET",
        dataType: "JSON",
        contentType: "application/json; charset=utf-8",

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

