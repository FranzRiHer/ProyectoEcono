function validarLabels() {
    let nombre = $("#nombreInput").val()
    let contraseña = $("#contraseñaInput").val()
    let email = $("#emailInput").val()

    if ((nombre === "" || contraseña === "" || email === "")) {
        window.alert("Por favor, complete todos los campos.");
    } else {
        saveEdit(nombre, contraseña, email)
    }
}

function saveEdit(nombre, contraseña, email) {
    let data = {
        name: nombre,
        password: contraseña,
        correo: email
    }

    let dataToSend = JSON.stringify(data);
    console.log(dataToSend)


    $.ajax({
        url: "http://localhost:8080/usuarios/editar/{id}",
        type: "POST",
        dataType: "JSON",
        contentType: "application/json; charset=utf-8",
        data: dataToSend,
        success: function (result) {
            console.log(result);
            $("#nombreInput").val("");
            $("#contraseñaInput").val("")
            $("#emailInput").val()
            console.log(result)
            alert('Datos enviados exitosamente.');
        },
        error: function (error) {
            console.log(error);
            alert('Error al enviar los datos. Por favor, inténtelo de nuevo.');
        }
    })
}