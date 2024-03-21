function getFuentesIngreso() {
    console.log("aaaaaa");
  
    // URL para la peticion
    var url = "https://ejemplo.com/datos";
  
    // Realizar solicitud GET usando Fetch API
    fetch(url)
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
      Object.values(rowData).forEach(value => {
        var cell = row.insertCell();
        cell.textContent = value;
      });
    });
  
    // Fijar encabezados
    thead.style.position = "sticky";
    thead.style.top = "0";
  }