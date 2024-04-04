function crearMetas (){
    setTimeout(() => setMetaLujos(), 0);
   // setTimeout(() => crearCategoria('TRASNPORTE'), 500);
    //setTimeout(() => crearCategoria('SOCIAL'), 1000);

    

}

function setMetaLujos() {
    var nombre = "lujos";
    var porcentaje_lujos = document.getElementById("lujos").value;
    console.log("Porcentaje de lujos: ", porcentaje_lujos);


    // Validar si la cifra de dinero es un número
    if (!isNaN(porcentaje_lujos)) {
        let token = localStorage.getItem('token');
        let idUser = localStorage.getItem('userId')
        // Crear objeto JSON con los datos
        var datos = {
            nombre: nombre,
            porcentaje: porcentaje_lujos,
            usuario: {"id": idUser}
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
        var url = 'http://localhost:8080/metas/add';
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
            $("#lujos").val("");
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