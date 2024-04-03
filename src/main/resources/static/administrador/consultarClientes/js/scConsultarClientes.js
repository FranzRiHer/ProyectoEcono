function getCliente() {
  let id = $("#idUsuario").val(); // Asegúrate de obtener el valor correcto
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
    mostrarDatosEnTabla(data); // Pasar el objeto directamente
  })
  .catch((error) => {
    console.error("Error al obtener los datos:", error);
  });
}

function mostrarDatosEnTabla(data) {
  var tabla = document.getElementById("tablaDatos");
  tabla.innerHTML = ""; // Limpiar tabla

  // Agregar encabezados
  var thead = document.createElement("thead");
  var filaEncabezado = document.createElement("tr");
  var thNombre = document.createElement("th");
  var thEmail = document.createElement("th");
  var thUserName = document.createElement("th");
  var thRol = document.createElement("th");

  thNombre.textContent = "Nombre";
  thEmail.textContent = "Email";
  thUserName.textContent = "UserName";
  thRol.textContent = "Rol";

  filaEncabezado.appendChild(thNombre);
  filaEncabezado.appendChild(thEmail);
  filaEncabezado.appendChild(thUserName);
  filaEncabezado.appendChild(thRol);
  thead.appendChild(filaEncabezado);
  tabla.appendChild(thead);

  var tbody = document.createElement("tbody");
  var row = tbody.insertRow();

  // Crea las celdas con los datos
  var cellNombre = row.insertCell();
  cellNombre.textContent = data.nombre;

  var cellEmail = row.insertCell();
  cellEmail.textContent = data.email;

  var cellUserName = row.insertCell();
  cellUserName.textContent = data.username;

  var cellRol = row.insertCell();
  cellRol.textContent = data.rol;

  tabla.appendChild(tbody);

  // Fijar encabezados
  thead.style.position = "sticky";
  thead.style.top = "0";
}
