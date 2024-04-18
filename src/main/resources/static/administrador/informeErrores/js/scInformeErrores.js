
/$(document).ready(function() {
    // Función para cargar todos los usuarios al inicializar la vista
    cargarUsuarios();
    var usuariosGlobal = []; // Almacena todos los usuarios aquí

    function cargarUsuarios() {
        //let token = localStorage.getItem('token');
        let token = "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjIsInJvbCI6IlVTRVIiLCJzdWIiOiJFbFRvdGlzIiwiaWF0IjoxNzEyMjU2OTQ0LCJleHAiOjE3MTIyNTgzODR9.yZTstcO8IylIW98X063_nbZi4PEjspdZgisGWbcZAZE"
        $.ajax({
            url: "http://localhost:8080/usuarios/usuarios_get",
            type: "GET",
            dataType: "JSON",
            contentType: "application/json",
                // La propiedad contentType no es necesaria para un GET, pero se deja si es requerido por el backend
            beforeSend: function (xhr) {
                    if (token) {
                        xhr.setRequestHeader("Authorization", "Bearer " + token);
                    }
                },
             success: function(data) {
                usuariosGlobal = data; // Guarda los usuarios en la variable global
                mostrarUsuarios(data); // Muestra inicialmente todos los usuarios
            },
                });
            },
            error: function(xhr, status, error) {
                console.error("Error al cargar los usuarios: ", error);
                // Aquí puedes manejar el error, por ejemplo, mostrando un mensaje al usuario
            }
        });
    }
});

     /* // Función de búsqueda por ID o nombre
    $("#searchInput").on("input", function() {
        var searchValue = $(this).val().toLowerCase();
        
        $("table tbody tr").filter(function() {
            // Verifica si el término de búsqueda está en la columna del ID o del nombre
            var idMatch = $(this).find("td:nth-child(1)").text().toLowerCase().indexOf(searchValue) > -1;
            var nameMatch = $(this).find("td:nth-child(2)").text().toLowerCase().indexOf(searchValue) > -1;
            $(this).toggle(idMatch || nameMatch);
        });
    });

    $(document).ready(function() {
        $("#searchInput").on("input", function() {
            var searchValue = $(this).val().toLowerCase();
            //let token = localStorage.getItem('token');
            let token = "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjIsInJvbCI6IlVTRVIiLCJzdWIiOiJFbFRvdGlzIiwiaWF0IjoxNzEyMjU1MzU5LCJleHAiOjE3MTIyNTY3OTl9.UtaLgZBFbGapatLjA2pSjY9v2hAfBhtW_jC_4LeN9Uc"
    
            if (searchValue.trim() === "") {
                // Opcional: Restablecer la vista de la tabla si el campo de búsqueda está vacío
                // Puedes decidir cómo manejar esta situación, por ejemplo, recargar todos los datos o dejar la tabla vacía
                return; // Sale de la función si la búsqueda está vacía
            }
    
            $.ajax({
                url: "http://localhost:8080/usuarios/usuario_get/"+searchValue, // Asegúrate de que este es el endpoint correcto
                type: "GET", // Ajusta según el parámetro esperado por tu backend
                dataType: "JSON",
                contentType: "application/json",
                // La propiedad contentType no es necesaria para un GET, pero se deja si es requerido por el backend
                beforeSend: function (xhr) {
                    if (token) {
                        xhr.setRequestHeader("Authorization", "Bearer " + token);
                    }
                },
                success: function(data) {
                    // Limpiar el tbody actual
                    $("table tbody").empty();
    
                    // Verificar si el objeto tiene la propiedad 'id', lo que indica que se encontró un resultado
                    if (data.hasOwnProperty('id')) {
                        // Crear una nueva fila con los datos del usuario
                        var newRow = $("<tr>").append(
                            $("<td>").text(data.id),
                            $("<td>").text(data.nombre),
                            $("<td>").text(data.email),
                            $("<td>").text("2024-04-04") // Asegúrate de tener una propiedad 'fecha' o ajusta según tus datos
                        );
                        // Añadir la nueva fila al tbody
                        $("table tbody").append(newRow);
                    } else {
                        // Si no se encontraron resultados, puedes manejarlo mostrando una fila indicando que no hay datos
                        $("table tbody").append('<tr><td colspan="4">No se encontraron resultados.</td></tr>');
                    }
                },
                error: function(xhr, status, error) {
                    console.error("Error en la búsqueda: ", error);
                    // Mostrar un mensaje de error o manejar el error como prefieras
                }
            });
        });
    });
    

    $(document).ready(function() {
        var usuariosGlobal = []; // Almacena todos los usuarios aquí
    
        // Carga inicial de todos los usuarios
        cargarUsuarios();
        $("#btnFiltrar").click(function() {
            var fechaInicio = $("#fechaInicio").val();
            var fechaFin = $("#fechaFin").val();
            filtrarPorFechas(fechaInicio, fechaFin);
        });
    
        // Búsqueda por ID al ingresar algo en el campo de búsqueda
        $("#searchInput").on("input", function() {
            var searchValue = $(this).val().toLowerCase();
    
            if (searchValue.trim() === "") {
                mostrarUsuarios(usuariosGlobal); // Muestra todos los usuarios si el campo de búsqueda está vacío
                return;
            }
    
            buscarUsuarioPorId(searchValue); // Busca y muestra el usuario por ID
        });
    
        // Función para cargar todos los usuarios al inicializar la vista
        function cargarUsuarios() {
            //let token = "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjIsInJvbCI6IlVTRVIiLCJzdWIiOiJFbFRvdGlzIiwiaWF0IjoxNzEyMjc4NjUxLCJleHAiOjE3MTIyODAwOTF9.XGSxr7xYqZxDl3mH_WdCh1v1Ifmkigmez-_6ouRyfR0";
            let token = localStorage.getItem('token');
            $.ajax({
                url: "http://localhost:8080/usuarios/usuarios_get",
                type: "GET",
                dataType: "JSON",
                contentType: "application/json",
                beforeSend: function(xhr) {
                    if (token) {
                        xhr.setRequestHeader("Authorization", "Bearer " + token);
                    }
                },
                success: function(data) {
                    usuariosGlobal = data; // Guarda los usuarios en la variable global
                    mostrarUsuarios(data); // Muestra inicialmente todos los usuarios
                },
                error: function(xhr, status, error) {
                    console.error("Error al cargar los usuarios: ", error);
                }
            });
        }
    
        // Función para buscar y mostrar un usuario por ID
        function buscarUsuarioPorId(id) {
            //let token = "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjIsInJvbCI6IlVTRVIiLCJzdWIiOiJFbFRvdGlzIiwiaWF0IjoxNzEyMjc4NjUxLCJleHAiOjE3MTIyODAwOTF9.XGSxr7xYqZxDl3mH_WdCh1v1Ifmkigmez-_6ouRyfR0";
            let token = localStorage.getItem('token');
            $.ajax({
                url: "http://localhost:8080/usuarios/usuario_get/" + id,
                type: "GET",
                dataType: "JSON",
                contentType: "application/json",
                beforeSend: function(xhr) {
                    if (token) {
                        xhr.setRequestHeader("Authorization", "Bearer " + token);
                    }
                },
                success: function(data) {
                    if (data.hasOwnProperty('id')) {
                        mostrarUsuarios([data]); // Envuelve el objeto de usuario en un array para reutilizar mostrarUsuarios
                    } else {
                        $("table tbody").empty().append('<tr><td colspan="4">No se encontraron resultados.</td></tr>');
                    }
                },
                error: function(error) {
                    console.error("Error en la búsqueda: ", error);
                }
            });
        }
    
        function mostrarUsuarios(usuarios) {
            var tbody = $("table tbody");
            tbody.empty(); // Limpia la tabla antes de añadir nuevos usuarios
        
            usuarios.forEach(function(usuario) {
                // Generar una fecha aleatoria para cada usuario
                var fila = `<tr>
                                <td>${usuario.id}</td>
                                <td>${usuario.nombre}</td>
                                <td>${usuario.email}</td>
                                <td>${"2024-04-04"}</td> <!-- Fecha generada aleatoriamente -->
                            </tr>`;
                tbody.append(fila);
            });
        }

        function filtrarPorFechas(fechaInicio, fechaFin) {
            // Esta es una función de ejemplo que asume que todas las fechas son iguales, dado que son "quemadas"
            // Deberías ajustarla para comparar las fechas reales de tus datos
            var usuariosFiltrados = usuariosGlobal.filter(function(usuario) {
                return true; // Aquí iría la lógica real de comparación de fechas
            });
            mostrarUsuarios(usuariosFiltrados);
        }
    });
    