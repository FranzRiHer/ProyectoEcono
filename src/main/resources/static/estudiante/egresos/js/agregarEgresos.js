let categorias = [];

document.addEventListener('DOMContentLoaded', function () {
    getMetas()
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
    let egreso = $("#egresoInput").val();
    let descripcion = $("#descripcionEgreso").val();

    if ((egreso !== "" && !isNaN(egreso)) && (descripcion !== "")) {
        saveEgreso(egreso, descripcion);
    } else {
        window.alert("Los campos deben estar llenos y el valor debe ser numérico."); // El contenido no es un número o está vacío
    }
    if (desc === "personalizado") {
        window.alert("Escoja una categoria valida");
    }
}

function validarCategoria() {
    let descripcion = $("#categoriaPersonalizada").val().toUpperCase(); // Convertir a mayúsculas
    document.getElementById('categoriaPersonalizada').value = '';

    if (descripcion !== "") {
        // Verificar si la categoría ya existe en el arreglo local
        let existeCategoria = categorias.some(function (categoria) {
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
        url: "http://localhost:8080/categorias_e/add_cat_e",
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
            alert('Categoria creada exitosamente.');
        },
        error: function (xhr, error) {
            if (xhr.status === 401) {
                // Token expirado o inválido, manejar la redirección
                manejarExpiracionToken();
            }
            alert('Error al crear la categoría. Por favor, inténtelo de nuevo.');
        }
    });

}

function saveEgreso(egreso, descripcion) {
    var opcion = document.getElementById("categoriaMenu");
    var idCategoria = opcion.value;
    var idMeta = document.getElementById("subcategoriaMenu").value;
    let id = localStorage.getItem('userId')
    var datos = {
        cantidadEgreso: egreso,
        descripcion: descripcion,
        usuario: { "id": id },
        categoriaEgreso: { "idCategoriaEgreso": idCategoria },
        meta: {"id": idMeta}
    };

    let dataToSend = JSON.stringify(datos);
    console.log("Data To dend" + dataToSend);

    // Obtener el token de autenticación del almacenamiento local
    let token = localStorage.getItem('token');

    $.ajax({
        url: "http://localhost:8080/gastos/add",
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
            console.log(result);
            $("#egresoInput").val("");
            $("#descripcionEgreso").val("");
            alert('Datos enviados exitosamente.');
            getEgresos();
            filtrarPorCategoria();
        },
        error: function (xhr, error) {
            if (xhr.status === 401) {
                // Token expirado o inválido, manejar la redirección
                manejarExpiracionToken();
            }
            else{
                alert('Error al enviar los datos. Por favor, inténtelo de nuevo.');
            }
        }
    });
}

function cargarCategorias() {

    let token = localStorage.getItem('token');
    let id = localStorage.getItem('userId')

    $.ajax({
        url: "http://localhost:8080/categorias_e/get_by_user/" + id,
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
                alert('Error al traer las categorias. Por favor, inténtelo de nuevo.');
            }
        }
    });
}


async function getMetas() {
    try {
        const token = localStorage.getItem('token');
        const idUser = parseInt(localStorage.getItem('userId'), 10); // Asegúrate de que es un número
        const url = `http://localhost:8080/metas/get_metas_by_user/${idUser}`;

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        });

        if (!response.ok) {
            throw new Error('Error al obtener las metas.');
        }

        const metas_usuario = await response.json();        
        if (!metas_usuario) {
            console.error('Usuario no encontrado');
            return;
        }

        console.log("Las metas del usuario son:", metas_usuario);

        const subcategoriaMenu = $('#subcategoriaMenu');

        subcategoriaMenu.empty(); // Limpiar la lista desplegable existente

        // Añadir las opciones de las metas al DOM
        metas_usuario.forEach(meta => {
            subcategoriaMenu.append($('<option>').text((meta.nombre).toUpperCase()).val(meta.id));
        });
        
        console.log("Metas agregadas a la lista desplegable.");
    } catch (error) {
        console.error('Error:', error);
    }
}
