document.addEventListener("DOMContentLoaded", function () {

    $.when(getIngresos(), getEgresos()).then(function (valorIngresos, valorEgresos) {
        let valorIngresos2 = valorIngresos[0].ingresoTotal; // Accede al resultado de la solicitud y luego a ingresoTotal
        let valorEgresos2 = valorEgresos[0].egresoTotal;
        chartData.data = [valorIngresos2, valorEgresos2];
        console.log(chartData);


        // Verificar si los egresos son mayores que los ingresos
        if (valorEgresos2 > valorIngresos2) {
            // Si los egresos son mayores, enviar una notificación
            console.log("Egresos mayores a ingresos")
            enviarNotificacion("Cuidado con sus gastos. Sus egresos superan sus ingresos.");
        }
        // Verificar si los egresos de alguna meta superan el porcentaje indicado por la meta para el total de los ingresos
        metasUsuario.forEach(meta => {
            let egresosMeta = meta.total;
            let porcentajeMeta = meta.porcentaje;
            if (egresosMeta > (valorIngresos2 * (porcentajeMeta / 100))) {
                enviarNotificacion(`¡Atención! Los egresos de la meta "${meta.nombre}" superan el ${porcentajeMeta}% de los ingresos.`);
            }
        });



        const ctx = document.querySelector(".my-chart");
        new Chart(ctx, {
            type: "doughnut",
            data: {
                labels: chartData.labels,
                datasets: [
                    {
                        label: "Ingresos vs Egresos",
                        data: chartData.data,
                    },
                ],
            },
            options: {
                borderWidth: 10,
                borderRadius: 2,
                hoverBorderWidth: 0,
                plugins: {
                    legend: {
                        display: false,
                    },
                },
            },
        });

        // Update list items with data
        populateUl();
    });
});

// Definition of chartData moved inside DOMContentLoaded event
const chartData = {
    labels: ["Ingresos", "Egresos"],
    data: [], // Start with an empty array that will be filled by the AJAX responses
};

const myChart = document.querySelector(".my-chart"); // Make sure .my-chart is the class of your <canvas>
const ul = document.querySelector(".programming-stats .details ul"); // Adjust if necessary



function getIngresos() {
    let token = localStorage.getItem('token'); // Obtener el token del almacenamiento local
    let id = localStorage.getItem('userId');
    console.log("ID:"+id);
    console.log("Token:"+token);
    return $.ajax({
        url: "http://localhost:8080/usuarios/usuario_get/"+id,
        type: "GET",
        dataType: "JSON",
        contentType: "application/json",
        // La propiedad contentType no es necesaria para un GET, pero se deja si es requerido por el backend
        beforeSend: function (xhr) {
            if (token) {
                xhr.setRequestHeader("Authorization", "Bearer " + token);
            }
        },
        success: function (result) {
            $('#ingresos').text(result.ingresoTotal);
            console.log(result.ingresoTotal);
            return result.valorIngresos; // Asegúrate de que este es el objeto o valor correcto que quieres retornar
        },
        error: function (error) {
            $('#ingresos').text('Error al cargar los ingresos.');
            console.log(error);
        },
    });
}

function getEgresos() {
    let token = localStorage.getItem('token'); // Asegúrate de obtener el token de la misma manera que en getIngresos
    let id = localStorage.getItem('userId');
    return $.ajax({
        url: "http://localhost:8080/usuarios/usuario_get/"+id,
        type: "GET",
        dataType: "JSON",
        contentType: "application/json",
        // La propiedad contentType no es necesaria para un GET, pero se deja si es requerido por el backend
        beforeSend: function (xhr) {
            if (token) {
                xhr.setRequestHeader("Authorization", "Bearer " + token);
            }
        },
        success: function (result) {
            $('#egresos').text(result.egresoTotal);
            $('#saldoTotal').text(result.saldo);
            console.log(result.egresoTotal);
            return result.valorEgresos; // Verifica que este sea el valor correcto que deseas retornar
        },
        error: function (error) {
            $('#egresos').text('Error al cargar los egresos.');
            console.log(error);
        },
    });
}
// Notificaciones --------------------------------------------------------------------------------------

function enviarNotificacion(mensaje) {
    getMetas()
    // Verificar si el navegador soporta notificaciones
    if (!("Notification" in window)) {
        console.log("Este navegador no soporta notificaciones.");
    } else if (Notification.permission === "granted") {
        // Si ya se ha concedido permiso para mostrar notificaciones
        new Notification("¡Atención!", { body: mensaje });
    } else if (Notification.permission !== "denied") {
        // Si aún no se ha pedido permiso, pedirlo
        Notification.requestPermission().then(function(permission) {
            if (permission === 'granted') {
                // Si el permiso se concede, mostrar la notificación
                new Notification("¡Atención!", { body: mensaje });
            }
        });
    }
}

// Función para obtener las metas del usuario
function getMetas() {
    let token = localStorage.getItem('token');
    let id = localStorage.getItem('userId');
    return $.ajax({
        url: `http://localhost:8080/metas/get_metas_by_user/${id}`,
        type: "GET",
        dataType: "JSON",
        contentType: "application/json",
        beforeSend: function (xhr) {
            if (token) {
                xhr.setRequestHeader("Authorization", "Bearer " + token);
            }
        },
        success: function (result) {
            console.log("Metas obtenidas:", result);
            return result; // Retorna las metas
        },
        error: function (error) {
            console.log('Error al cargar las metas:', error);
        },
    });
}