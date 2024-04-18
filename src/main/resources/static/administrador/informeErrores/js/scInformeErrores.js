
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
    