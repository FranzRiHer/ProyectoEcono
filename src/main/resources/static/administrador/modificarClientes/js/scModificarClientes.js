var id; // Asegúrate de obtener el valor correcto
var datosOriginales = {};

function getCliente() {
  id = $("#idUsuario").val(); 
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
    mostrarDatosLabel(data); // Pasar el objeto directamente
  })
  .catch((error) => {
    console.error("Error al obtener los datos:", error);
  });
}

function mostrarDatosLabel(data) {
  datosOriginales = data;

  $("#nameInput").val(data.nombre);
  $("#emailInput").val(data.email);
  //$("#contrasenaInput").val(data.password);
  $("#contrasenaInput").val("");
  document.getElementById('InformacionColceccion').style.display = 'block';

}

function validarLabels() {
  let nombre = $("#nameInput").val()
  let contrasena = $("#contrasenaInput").val()
  let email = $("#emailInput").val()

  if ((nombre === "" || contrasena === "" || email === "")) {
      window.alert("Por favor, complete todos los campos.");
  } else {
      saveEdit(nombre, contrasena, email)
  }
}

function saveEdit(nombre, contrasena, email) {
  let token = localStorage.getItem('token');
  let data = {
    nombre: nombre,
    email: email,
    password: contrasena
}

  let dataToSend = JSON.stringify(data);

  console.log("dATASASA" + dataToSend)


  $.ajax({
      url: "http://localhost:8080/usuarios/editar/" + id,
      type: "PUT",
      dataType: "JSON",
      contentType: "application/json; charset=utf-8",
      data: dataToSend,
      beforeSend: function(xhr) {
          if (token) {
              xhr.setRequestHeader("Authorization", "Bearer " + token);
              console.log(datosOriginales);
          }
      },
      success: function (result) {
          console.log(result);
          $("#nameInput").val("");
          $("#contrasenaInput").val("");
          $("#emailInput").val();
          console.log(result)
          alert('Datos enviados exitosamente.');
      },
      error: function (error) {
          console.log(error);
          //alert('Error al enviar los datos. Por favor, inténtelo de nuevo.');
          $("#nameInput").val("");
          $("#contrasenaInput").val("");
          $("#emailInput").val("");
          alert('Datos enviados exitosamente.');
      }
  })
}