function validarLabels() {
    let egreso = $("#egresoInput").val();
    let descripcion = $("#descripcionEgreso").val();

    if ((egreso !== "" && !isNaN(egreso)) && (descripcion !== "")) {
        saveEgreso(egreso, descripcion);
    } else {
        window.alert("Los campos deben estar llenos y el valor debe ser numérico."); // El contenido no es un número o está vacío
    }
}

function saveEgreso(egreso, descripcion) {
    let data = {
        cantidadEgreso: egreso,
        descripcion: descripcion
    };

    let dataToSend = JSON.stringify(data);
    console.log(dataToSend);

    // Obtener el token de autenticación del almacenamiento local
    let token = localStorage.getItem('token');

    $.ajax({
        url: "http://localhost:8080/gastos/add",
        type: "POST",
        dataType: "JSON",
        contentType: "application/json; charset=utf-8",
        data: dataToSend,
        // Incluir el token de autenticación en el encabezado de la solicitud
        beforeSend: function(xhr) {
            if (token) {
                xhr.setRequestHeader("Authorization", "Bearer " + token);
            }
        },
        success: function (result) {
            console.log(result);
            $("#egresoInput").val("");
            $("#descripcionEgreso").val("");
            console.log(result);
            alert('Datos enviados exitosamente.');
        },
        error: function (error) {
            console.log(error);
            alert('Error al enviar los datos. Por favor, inténtelo de nuevo.');
        }
    });
}
