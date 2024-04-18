let categorias = [];

document.addEventListener('DOMContentLoaded', function () {
    cargarCategorias();
});

function mostrarPersonalizado() {
    var opcion = document.getElementById("categoriaMenu");
    if (opcion.value === "personalizado") {
        document.getElementById('crearCategoriaBTN').style.display = 'block';
    } else {
        document.getElementById('crearCategoriaBTN').style.display = 'none';
    }
}

function validarLabels() {
    var opcion = document.getElementById("categoriaMenu");
    desc = opcion.value
    let ingreso = $("#cifraDinero").val();
    let descripcion = $("#descripcion").val();

    if ((ingreso !== "" && !isNaN(ingreso)) && (descripcion !== "")) {
        setFuentesIngresos(ingreso, descripcion);
    } else {
        window.alert("Los campos deben estar llenos y el valor debe ser numérico."); // El contenido no es un número o está vacío
    }
    if (desc === "personalizado") {
        window.alert("Escoja una categoria valida");
    }
}



function setFuentesIngresos(cifraDinero, comentario) {

    let token = localStorage.getItem('token');
    let idUser = localStorage.getItem('userId')
    // Crear objeto JSON con los datos
    var datos = {
        cantidad: cifraDinero,
        descripcion: comentario,
        usuario: {
            id: idUser
        }
    };
    console.log(datos);

    // URL a la que se enviarán los datos
    var url = 'http://localhost:8080/ingreso/add';
    console.log(url);

    // Realizar solicitud Ajax
    $.ajax({
        url: url,
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(datos),
        headers: {
            'Authorization': `Bearer ${token}`
        },
        success: function (response) {
            console.log('Respuesta del servidor:', response);
            alert('Datos enviados exitosamente.');
            $("#cifraDinero").val("");
            $("#descripcion").val("");
            getFuentesIngreso();
        },
        error: function (xhr, status, error) {
            console.error('Error:', error);
            alert('Error al enviar los datos. Por favor, inténtelo de nuevo.');
        }
    });
}


function crearCategoria(desc) {
    id = localStorage.getItem('userId')
    let data = {
        descripcion: desc,
        usuario: {
            id: id
        }        
    }

    let dataToSend = JSON.stringify(data);
    console.log(dataToSend);

    let token = localStorage.getItem('token');

    $.ajax({
        url: "http://localhost:8080/categorias_i/add_add_i",
        type: "POST",
        dataType: "JSON",
        contentType: "application/json; charset=utf-8",
        data: dataToSend,
        // Incluir el token de autenticación en el encabezado de la solicitud
        beforeSend: function (xhr) {
            if (token) {
                xhr.setRequestHeader("Authorization", "Bearer " + token);
            }
        },
        success: function (result) {
            $("#categoriaPersonalizada").val("");
            alert('Datos enviados exitosamente.');
            location.reload();
        },
        error: function (xhr, error) {
            if (xhr.status === 401) {
                // Token expirado o inválido, manejar la redirección
                manejarExpiracionToken();
            }
            alert('Error al enviar los datos. Por favor, inténtelo de nuevo.');
        }
    });

}

function cargarCategorias() {

    let token = localStorage.getItem('token');
    let id = localStorage.getItem('userId')

    $.ajax({
        url: "http://localhost:8080/categorias_i/get_by_user/" + id,
        type: "GET",
        dataType: "JSON",
        beforeSend: function (xhr) {
            if (token) {
                xhr.setRequestHeader("Authorization", "Bearer " + token);
            }
        },
        success: function (result) {
            const select = $('#categoriaMenu');
            select.empty();
            categorias = [];

            // Cargar categorías del resultado
            $.each(result, function () {
                const option = $('<option>', { value: this.idCategoriaEgreso, text: this.descripcion });
                select.append(option);
                categorias.push(this.descripcion);
            });

            // Añadir opción personalizada al final
            const optionPersonalizado = $('<option>').attr('value', 'personalizado').text('Otro...');
            select.append(optionPersonalizado);
        },
        
        error: function (xhr, status, error) {
            if (xhr.status === 401) {
                // Token expirado o inválido, manejar la redirección
                manejarExpiracionToken();
            } else {
                alert('Error al enviar los datos. Por favor, inténtelo de nuevo.');
            }
        }
    });
}