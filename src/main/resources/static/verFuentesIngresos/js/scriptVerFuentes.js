function getFuentesIngreso() {
  console.log("aaaaaa");
  let token = localStorage.getItem('token');
  // URL para la peticion
  var url = "http://localhost:8080/ingreso/ingreso";

  // Realizar solicitud GET usando Fetch API
  fetch(url, {
    method: 'GET', // o 'POST', 'PUT', 'DELETE', etc., según sea necesario
    headers: {
      'Authorization': `Bearer ${token}`,
      // Agrega cualquier otro encabezado requerido aquí
    },
  }
  )
    .then(response => response.json()) // Convertir respuesta a JSON
    .then(data => {
      // Manipular los datos recibidos
      mostrarDatosEnTabla(data);
    })
    .catch(error => {
      console.error("Error al obtener los datos:", error);
    });
}

function mostrarDatosEnTabla(data) {
  var tabla = document.getElementById("tablaDatos");
  tabla.innerHTML = ""; // Limpiar tabla antes de agregar nuevos datos

  // Agregar encabezados
  var thead = document.createElement("thead");
  var filaEncabezado = document.createElement("tr");
  var thSaldo = document.createElement("th");
  var thDescripcion = document.createElement("th");

  thSaldo.textContent = "Saldo";
  thDescripcion.textContent = "Descripción";

  filaEncabezado.appendChild(thSaldo);
  filaEncabezado.appendChild(thDescripcion);
  thead.appendChild(filaEncabezado);

  tabla.appendChild(thead);

  // Iterar sobre los datos y crear filas de tabla
  data.forEach(rowData => {
    var row = tabla.insertRow();

    // Accede directamente a las propiedades 'cantidad' y 'descripcion'
    var cellCantidad = row.insertCell();
    cellCantidad.textContent = rowData.cantidad; // Primero 'cantidad'

    var cellDescripcion = row.insertCell();
    cellDescripcion.textContent = rowData.descripcion; // Luego 'descripcion'
  });
  // Fijar encabezados
  thead.style.position = "sticky";
  thead.style.top = "0";
}