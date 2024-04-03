let categorias = [];

document.addEventListener('DOMContentLoaded', function() {
    cargarCategorias();
});

function mostrarPersonalizado(){
    var opcion = document.getElementById("categoriaMenu");
    if(opcion.value === "personalizado") {
        document.getElementById('crearCategoriaBTN').style.display = 'block';
    } else {
        document.getElementById('crearCategoriaBTN').style.display = 'none';
    }
}

function validarLabels() {
    let egreso = $("#egresoInput").val();
    let descripcion = $("#descripcionEgreso").val();

    if ((egreso !== "" && !isNaN(egreso)) && (descripcion !== "")) {
        saveEgreso(egreso, descripcion);
    } else {
        window.alert("Los campos deben estar llenos y el valor debe ser numérico."); // El contenido no es un número o está vacío
    }
}

function validarCategoria() {
    let descripcion = $("#categoriaPersonalizada").val().toUpperCase(); // Convertir a mayúsculas
    document.getElementById('categoriaPersonalizada').value = '';

    if (descripcion !== "") {
        // Verificar si la categoría ya existe en el arreglo local
        let existeCategoria = categorias.some(function(categoria) {
            return categoria.toUpperCase() === descripcion;
        });

        if (!existeCategoria) {
            crearCategoria(descripcion); 
            setTimeout(() =>  cargarCategorias(), 500);

        } else {
            alert("La categoría ya existe.");
        }
    } else {
        window.alert("El campo de categoría debe estar lleno.");
    }
}

function crearCategoria(desc){
    let userid = localStorage.getItem('userId');
    let data = {
        descripcion: desc,
        id_usuario : userid
    }

    let dataToSend = JSON.stringify(data);
    let token = localStorage.getItem('token');

    $.ajax({
        url: "http://localhost:8080/categorias_e/add_cat_e",
        type: "POST",
        dataType: "JSON",
        contentType: "application/json; charset=utf-8",
        data: dataToSend,
        // Incluir el token de autenticación en el encabezado de la solicitud
        beforeSend: function(xhr) {
            if (token) {
                xhr.setRequestHeader("Authorization", "Bearer " + token);
            }
        },
        success: function (result) {
            console.log(result);
            $("#categoriaPersonalizada").val("");
            alert('Datos enviados exitosamente.');
        },
        error: function (error) {
            console.log(error);
            alert('Error al enviar los datos. Por favor, inténtelo de nuevo.');
        }
    });

}

function saveEgreso(egreso, descripcion) {
    let data = {
        cantidadEgreso: egreso,
        descripcion: descripcion
    };

    let dataToSend = JSON.stringify(data);
    console.log(dataToSend);

    // Obtener el token de autenticación del almacenamiento local
    let token = localStorage.getItem('token');

    $.ajax({
        url: "http://localhost:8080/gastos/add",
        type: "POST",
        dataType: "JSON",
        contentType: "application/json; charset=utf-8",
        data: dataToSend,
        // Incluir el token de autenticación en el encabezado de la solicitud
        beforeSend: function(xhr) {
            if (token) {
                xhr.setRequestHeader("Authorization", "Bearer " + token);
            }
        },
        success: function (result) {
            console.log(result);
            $("#categoriaPersonalizada").val("");
            console.log(result);
            alert('Datos enviados exitosamente.');
        },
        error: function (error) {
            console.log(error);
            alert('Error al enviar los datos. Por favor, inténtelo de nuevo.');
        }
    });
}

function cargarCategorias() {
    let userid = localStorage.getItem('userId');
    let token = localStorage.getItem('token');

    $.ajax({
        url: "http://localhost:8080/categorias_e/get_cat_e_user/" + userid,
        type: "GET",
        dataType: "JSON",
        beforeSend: function(xhr) {
            if (token) {
                xhr.setRequestHeader("Authorization", "Bearer " + token);
            }
        },
        success: function (result) {
            const select = $('#categoriaMenu');
            select.empty();
            categorias = [];

            // Verificar si el resultado está vacío
            if (result.length === 0) {

                // Categorías por defecto
                setTimeout(() => crearCategoria('COMIDA'), 0);
                setTimeout(() => crearCategoria('TRASNPORTE'), 500);
                setTimeout(() => crearCategoria('SOCIAL'), 1000);
                categorias.push('COMIDA');
                categorias.push('TRASNPORTE');
                categorias.push('SOCIAL');

            } else {
                // Cargar categorías del resultado
                $.each(result, function() {
                    const option = $('<option>', { value: this.idCategoriaEgreso, text: this.descripcion });
                    select.append(option);
                    categorias.push(this.descripcion); 
                });
            }

            // Añadir opción personalizada al final
            const optionPersonalizado = $('<option>').attr('value', 'personalizado').text('Otro...');
            select.append(optionPersonalizado);
        },
        error: function(xhr, status, error) {
            console.error('Error al cargar las categorías:', error);
        }
    });
}
