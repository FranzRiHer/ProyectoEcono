document.addEventListener('DOMContentLoaded', function() {
  getFuentesIngreso();
});


function getFuentesIngreso() {
  let token = localStorage.getItem('token');
  let userId = localStorage.getItem('userId'); // Asumiendo que el ID del usuario se almacena aquí
  var url = "http://localhost:8080/ingreso/ingreso";

  fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  })
  .then(response => response.json())
  .then(data => {
    // Filtrar los ingresos para el usuario logueado
    console.log(data)
    const datosUsuario = data.filter(ingreso => ingreso.usuario.id.toString() === userId);
    mostrarDatosEnTabla(datosUsuario);
  })
  .catch(error => {
    console.error("Error al obtener los datos:", error);
  });
}

function mostrarDatosEnTabla(data) {
  var tabla = document.getElementById("tablaDatos");
  tabla.innerHTML = ""; // Limpiar tabla antes de agregar nuevos datos

  // Crear y agregar encabezados
  var thead = document.createElement("thead");
  var filaEncabezado = document.createElement("tr");
  var thCantidad = document.createElement("th");
  var thDescripcion = document.createElement("th");

  thCantidad.textContent = "Cantidad";
  thDescripcion.textContent = "Descripción";
  filaEncabezado.appendChild(thCantidad);
  filaEncabezado.appendChild(thDescripcion);
  thead.appendChild(filaEncabezado);
  tabla.appendChild(thead);

  var tbody = document.createElement("tbody"); // Asegúrate de crear un tbody para contener las filas de datos

  // Iterar sobre los datos y crear filas de tabla
  data.forEach(rowData => {
    var row = tbody.insertRow();

    var cellCantidad = row.insertCell();
    cellCantidad.textContent = rowData.cantidad; // Usar 'cantidad'

    var cellDescripcion = row.insertCell();
    cellDescripcion.textContent = rowData.descripcion; // Usar 'descripcion'
  });

  tabla.appendChild(tbody); // Agregar el tbody al final, después de llenarlo

  // Estilos para fijar encabezados (opcional, mejora visual)
  thead.style.position = "sticky";
  thead.style.top = "0";
  thead.style.background = "#fff"; // Asegura que el fondo sea sólido para no ver los datos a través de él
}
