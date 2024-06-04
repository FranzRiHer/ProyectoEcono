document.addEventListener('DOMContentLoaded', function() {
  getEgresos();
});

function getEgresos() {
  let token = localStorage.getItem('token');
  let userId = localStorage.getItem('userId'); // Obtener el ID del usuario logueado
  var url = `http://localhost:8080/gastos/get_by_user/${userId}`; // URL actualizada para obtener los gastos de un usuario específico

  $.ajax({
      url: url,
      type: 'GET',
      headers: {
          'Authorization': `Bearer ${token}`
      },
      success: function(data) {
          mostrarDatosEnTabla(data); // Asumiendo que data ya es un array de egresos
          llenarCategorias(data); // Llenar el menú desplegable con las categorías disponibles
      },
      error: function(xhr, status, error) {
          console.error("Error al obtener los datos:", error);
      }
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
      if(rowData.categoriaEgreso) { // Verificar que categoriaEgreso existe antes de acceder a descripcion
          cellCategoria.textContent = rowData.categoriaEgreso.descripcion;
      } else {
          cellCategoria.textContent = 'No especificado'; // Manejar el caso en que no haya información de categoría
      }
  });

  tabla.appendChild(tbody);
}

function llenarCategorias(data) {
  var categorias = new Set(data.map(rowData => rowData.categoriaEgreso ? rowData.categoriaEgreso.descripcion : 'No especificado'));
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
