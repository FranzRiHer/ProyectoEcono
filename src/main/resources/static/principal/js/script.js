function redireccionar(elemento) {
    var idElemento = elemento.id;
    sendLink(idElemento, function (nuevoLink) {
        if (nuevoLink) {
            window.location.href = nuevoLink; // Redirige a la nueva URL
        } else {
            console.error("No se pudo obtener el nuevo enlace.");
        }
    });
}

function sendLink(idElemento, callback) {
    $.ajax({
        url: "http://localhost:8080/menu/vista/" + idElemento,
        type: "GET",
        dataType: "text", // Cambiado a "text" porque estamos esperando una ruta como texto

        success: function (result) {
            console.log(result);
            callback(result);
        },
        error: function (error) {
            console.log(error);
            callback(null);
        },
    });
}

document.addEventListener("DOMContentLoaded", function () {
    populateUl();
    getIngresos();
    getIngresos();
});

function getIngresos() {
    return $.ajax({
        url: "",
        type: "GET",
        dataType: "JSON",
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            return result.valorIngresos;
        },
        error: function (error) {
            console.log(error);
        },
    });
}

function getEgresos() {

    return $.ajax({
        url: "",
        type: "GET",
        dataType: "JSON",
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            return result.valorEgresos;
        },
        error: function (error) {
            console.log(error);
        },
    });
}


const chartData = {
    labels: ["Ingresos", "Egresos"],
    data: [],
};

const myChart = document.querySelector(".my-chart");
const ul = document.querySelector(".programming-stats .details ul");

new Chart(myChart, {
    type: "doughnut",
    data: {
        labels: chartData.labels,
        datasets: [
            {
                label: "Valor",
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

const populateUl = () => {
    chartData.labels.forEach((l, i) => {
        let li = document.createElement("li");
        const totalData = chartData.data.reduce((a, b) => a + b, 0);
        let porcentaje = (chartData.data[i] / totalData) * 100;
        li.innerHTML = `${l}: <span class='percentage'>${porcentaje.toFixed(1)}%</span>`;

        ul.appendChild(li);
    });
};