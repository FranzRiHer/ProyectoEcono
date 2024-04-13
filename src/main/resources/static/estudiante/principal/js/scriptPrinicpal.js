document.addEventListener("DOMContentLoaded", function () {

    $.when(getIngresos(), getEgresos()).then(function (valorIngresos, valorEgresos) {
        let valorIngresos2 = valorIngresos[0].ingresoTotal; // Accede al resultado de la solicitud y luego a ingresoTotal
        let valorEgresos2 = valorEgresos[0].egresoTotal;
        chartData.data = [valorIngresos2, valorEgresos2];
        console.log(chartData);

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
