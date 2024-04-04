document.addEventListener('DOMContentLoaded', function() {
  getEgresos();
});

function getEgresos() {
  let token = localStorage.getItem('token');
  let userId = localStorage.getItem('userId'); // Obtener el ID del usuario logueado
  var url = "http://localhost:8080/gastos/egresos";

  fetch(url, {
          method: 'GET',
          headers: {
              'Authorization': `Bearer ${token}`,
          },
      })
      .then(response => response.json())
      .then(data => {
          let datosUsuario = data.filter(egreso => egreso.usuario.id == userId); // Filtrar por usuario logueado
          mostrarDatosEnTabla(datosUsuario);
          llenarCategorias(datosUsuario); // Llenar el menú desplegable con las categorías disponibles
      })
      .catch(error => {
          console.error("Error al obtener los datos:", error);
      });
}

function mostrarDatosEnTabla(data) {
  var tabla = document.getElementById("tablaDatos");
  tabla.innerHTML = "<thead><tr><th>Cantidad</th><th>Descripción</th><th>Categoria</th></tr></thead>";
  var tbody = document.createElement("tbody");

  data.forEach(rowData => {
      var row = tbody.insertRow();

      var cellCantidad = row.insertCell();
      cellCantidad.textContent = rowData.cantidadEgreso;

      var cellDescripcion = row.insertCell();
      cellDescripcion.textContent = rowData.descripcion;

      var cellCategoria = row.insertCell();
      cellCategoria.textContent = rowData.categoriaEgreso.descripcion;
  });

  tabla.appendChild(tbody);
}

function llenarCategorias(data) {
  var categorias = new Set(data.map(rowData => rowData.categoriaEgreso.descripcion));
  var select = document.getElementById("categoriaSelect");
  select.innerHTML = '<option value="Todas">Todas</option>'; // Limpiar opciones anteriores y añadir "Todas"

  categorias.forEach(categoria => {
      var option = document.createElement("option");
      option.value = categoria;
      option.textContent = categoria;
      select.appendChild(option);
  });
}

function filtrarPorCategoria() {
  var categoriaSeleccionada = document.getElementById("categoriaSelect").value;
  var todasFilas = document.querySelectorAll("#tablaDatos tbody tr");

  todasFilas.forEach(fila => {
      var categoriaFila = fila.cells[2].textContent; // Índice 2 para la columna de categoría
      if (categoriaSeleccionada === "Todas" || categoriaFila === categoriaSeleccionada) {
          fila.style.display = "";
      } else {
          fila.style.display = "none";
      }
  });
}
