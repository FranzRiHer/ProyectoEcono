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
    return $.ajax({
        url: "http://localhost:8080/usuarios/usuario_get",
        type: "GET",
        dataType: "JSON",
        contentType: "text",
        success: function (result) {
            $('#ingresos').text(result.ingresoTotal);
            console.log(result.ingresoTotal)
            return result.valorIngresos;
        },
        error: function (error) {
            $('#ingresos').text('Error al cargar los ingresos.');
            console.log(error);
        },
    });
}

function getEgresos() {

    return $.ajax({
        url: "http://localhost:8080/usuarios/usuario_get",
        type: "GET",
        dataType: "JSON",
        contentType: "text",
        success: function (result) {
            $('#egresos').text(result.egresoTotal);
            $('#saldoTotal').text(result.saldo);
            console.log(result.egresoTotal)
            return result.valorEgresos;
        },
        error: function (error) {
            $('#egresos').text('Error al cargar los ingresos.');
            console.log(error);
        },
    });
}

function populateUl() {
    const ul = document.querySelector(".programming-stats .details ul");
    
    if (!ul) {
        console.error('The UL element does not exist in the DOM.');
        return; // Do not proceed if ul is not found
    }

    // Calcula el total
    const total = chartData.data.reduce((acc, curr) => acc + curr, 0);

    // Limpia el UL antes de añadir nuevos elementos
    ul.innerHTML = '';

    chartData.labels.forEach((label, index) => {
        // Calcula el porcentaje que representa cada valor
        const percentage = ((chartData.data[index] / total) * 100).toFixed(2); // Redondea a dos decimales

        // Crea y añade el nuevo elemento LI
        let li = document.createElement("li");
        li.innerHTML = `${label}: <span class='percentage'>${percentage}%</span>`;
        ul.appendChild(li);
    });
}
