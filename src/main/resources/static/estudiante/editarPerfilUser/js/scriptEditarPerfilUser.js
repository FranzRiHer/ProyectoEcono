function validarLabels() {
    let nombre = $("#nameInput").val()
    let contrasena = $("#contrasenaInput").val()
    let email = $("#emailInput").val()

    if ((nombre === "" || contrasena === "" || email === "")) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Por favor, complete todos los campos.",
          }); // El contenido no es un número o está vacío
    } else {
        saveEdit(nombre, contrasena, email)
    }
}

function saveEdit(nombre, contrasena, email) {
    let id = localStorage.getItem('userId');
    let token = localStorage.getItem('token');
    let data = {
        nombre: nombre,
        email: email,
        password: contrasena
    }

    let dataToSend = JSON.stringify(data);
    console.log(dataToSend)


    $.ajax({
        url: "http://localhost:8080/usuarios/editar/" + id,
        type: "PUT",
        dataType: "JSON",
        contentType: "application/json; charset=utf-8",
        data: dataToSend,
        beforeSend: function(xhr) {
            if (token) {
                xhr.setRequestHeader("Authorization", "Bearer " + token);
                console.log(data);
            }
        },
        success: function (result) {
            console.log(result);
            $("#nameInput").val("");
            $("#contrasenaInput").val("");
            $("#emailInput").val();
            console.log(result)
            Swal.fire({
                title: "¿Un Nuevo Tu?",
                text: "Datos registrados con éxito.",
                icon: "success"
              });
        },
        error: function (error) {
            console.log(error);
            //alert('Error al enviar los datos. Por favor, inténtelo de nuevo.');
            $("#nameInput").val("");
            $("#contrasenaInput").val("");
            $("#emailInput").val("");
            Swal.fire({
                title: "¿Un Nuevo Tu?",
                text: "Datos registrados con éxito.",
                icon: "success"
              });
        }
    })
}