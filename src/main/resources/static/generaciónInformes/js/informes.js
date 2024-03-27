document.addEventListener('DOMContentLoaded', function () {
    let Grafica = document.getElementById("Grafica").getContext("2d");

    var chart = new Chart(Grafica, {
        type: "line",
        data: {
            labels: ["vino", "Tequila", "Cerveza", "Ron"],
            datasets: [{
                label: "Análisis por período de tiempo",
                data: [12, 39, 10, 30]
            }]
        }
    });
});
