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
    var opcion = document.getElementById("categoriaMenu");
    desc = opcion.value
    let egreso = $("#egresoInput").val();
    let descripcion = $("#descripcionEgreso").val();

    if ((egreso !== "" && !isNaN(egreso)) && (descripcion !== "")) {
        saveEgreso(egreso, descripcion);
    } else {
        window.alert("Los campos deben estar llenos y el valor debe ser numérico."); // El contenido no es un número o está vacío
    }
    if(desc === "personalizado"){
        window.alert("Escoja una categoria valida");
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
            setTimeout(() => cargarCategorias(), 500);
        } else {
            alert("La categoría ya existe.");
        }
    } else {
        window.alert("El campo de categoría debe estar lleno.");
    }
    

}

function crearCategoria(desc){
    let data = {
        descripcion: desc
    }

    let dataToSend = JSON.stringify(data);
    console.log(dataToSend);

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
            $("#categoriaPersonalizada").val("");
            alert('Datos enviados exitosamente.');
            location.reload();
        },
        error: function (error) {
            alert('Error al enviar los datos. Por favor, inténtelo de nuevo.');
        }
    });

}

function saveEgreso(egreso, descripcion) {
    var opcion = document.getElementById("categoriaMenu");
    idCategoria = opcion.value;
    let id = localStorage.getItem('userId')
    var datos = {
        cantidadEgreso: egreso,
        descripcion: descripcion,
        usuario: {"id": id},
        categoriaEgreso: {"idCategoriaEgreso": idCategoria}
    };

    let dataToSend = JSON.stringify(datos);
    console.log("Data To dend"  + dataToSend);

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
            $("#egresoInput").val("");
            $("#descripcionEgreso").val("");
            alert('Datos enviados exitosamente.');
            getEgresos();
            filtrarPorCategoria();
        },
        error: function (error) {
            console.log(error);
            alert('Error al enviar los datos. Por favor, inténtelo de nuevo.');
        }
    });
}

function cargarCategorias() {

    let token = localStorage.getItem('token');

    $.ajax({
        url: "http://localhost:8080/categorias_e/get_cat_e",
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
                setTimeout(() => cargarCategorias(), 500);

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