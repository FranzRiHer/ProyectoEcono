function getCliente() {
    let id = localStorage.getItem('userId') // Asegúrate de obtener el valor correcto
    console.log("ID del usuario: ", id); // Verificar el ID obtenido
    let token = localStorage.getItem("token");
    var url = "http://localhost:8080/usuarios/usuario_get/" + id;
  
    fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response.json())
    .then((data) => {
        console.log(data)
        validarLabels(data); // Pasar el objeto directamente
    })
    .catch((error) => {
      console.error("Error al obtener los datos:", error);
    });
  }

function validarLabels(data) {
    let datos = data
    let egreso = $("#egresoInput").val();
    let descripcion = $("#descripcionEgreso").val();

    if ((egreso !== "" && !isNaN(egreso)) && (descripcion !== "")) {
        saveEgreso(egreso, descripcion, data);
    } else {
        window.alert("Los campos deben estar llenos y el valor debe ser numérico."); // El contenido no es un número o está vacío
    }
}

function saveEgreso(egreso, descripcion, data) {
    var datos = {
        cantidadEgreso: egreso,
        descripcion: descripcion,
        usuario: data
    };

    let dataToSend = JSON.stringify(datos);
    console.log("Data To dend"  + dataToSend);

    // Obtener el token de autenticación del almacenamiento local
    let token = localStorage.getItem('token');
    let id = localStorage.getItem('userId')

    $.ajax({
        url: "http://localhost:8080/gastos/add/" + id,
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
