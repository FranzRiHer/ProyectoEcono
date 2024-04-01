function setFuentesIngresos() {
    var cifraDinero = document.getElementById("cifraDinero").value;
    var comentario = document.getElementById("descripcion").value;

    // Validar si la cifra de dinero es un número
    if (!isNaN(cifraDinero)) {
        // Crear objeto JSON con los datos
        var datos = {
            cantidad: cifraDinero,
            descripcion: comentario
        };

        // Configurar opciones para la solicitud fetch
        var opciones = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datos)
        };

        // URL a la que se enviarán los datos
        var url = 'http://localhost:8080/ingreso/add';

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