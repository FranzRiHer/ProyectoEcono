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
      setFuentesIngresos(data); // Pasar el objeto directamente
    })
    .catch((error) => {
      console.error("Error al obtener los datos:", error);
    });
  }

function setFuentesIngresos(data) {
    var cifraDinero = document.getElementById("cifraDinero").value;
    var comentario = document.getElementById("descripcion").value;

    // Validar si la cifra de dinero es un número
    if (!isNaN(cifraDinero)) {
        let token = localStorage.getItem('token');
        let id = localStorage.getItem('userId')
        // Crear objeto JSON con los datos
        var datos = {
            cantidad: cifraDinero,
            descripcion: comentario,
            usuario: data
        };
        console.log(datos)
        // Configurar opciones para la solicitud fetch
        var opciones = {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datos)

        };
        console.log(JSON.stringify(datos))

        // URL a la que se enviarán los datos
        var url = 'http://localhost:8080/ingreso/add';
        console.log(url)
        // Realizar solicitud fetch
        fetch(url, opciones)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al enviar los datos.');
            }
            return response.json();
        })
        .then(data => {
            // Manejar la respuesta si es necesario
            console.log('Respuesta del servidor:', data);
            alert('Datos enviados exitosamente.');
            $("#cifraDinero").val("");
            $("#descripcion").val("")
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error al enviar los datos. Por favor, inténtelo de nuevo.');
        });
    } else {
        // Mostrar alerta si la cifra de dinero no es un número
        alert("La cifra de dinero debe ser un número.");
    }
}