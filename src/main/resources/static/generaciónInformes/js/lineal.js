document.addEventListener('DOMContentLoaded', function () {
    // Datos para el gráfico de líneas
    const myChart1 = document.getElementById("lineChart");

    const lineData = {
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
        datasets: [
            {
                label: "Valor 1",
                data: [50, 20, 15, 50, 18, 30],
                borderColor: '#9064a1',
                borderWidth: 2,
                fill: false
            },
            {
                label: "Valor 2",
                data: [30, 25, 40, 20, 35, 45],
                borderColor: '#2391bd',
                borderWidth: 2,
                fill: false
            }
        ]
    };

    new Chart(myChart1, {
        type: 'line',
        data: lineData,
        options: {
            scales: {
                x: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Mes'
                    }
                },
                y: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Valor'
                    }
                }
            }
        }
    });

    // Datos para el gráfico de radar
    const radarChart = document.getElementById("radarChart");
    const radarData = {
        labels: ['Label1', 'Label2', 'Label3', 'Label4', 'Label5'],
        datasets: [
            {
                label: "% de ingreso",
                data: [20, 30, 40, 50, 60],
                borderColor: 'rgb(77, 56, 124)', // Color más oscuro y transparente para la línea que muestra los datos
                borderWidth: 5, // Grosor más delgado de la línea que muestra los datos
            },
        ],
    };

    new Chart(radarChart, {
        type: "radar",
        data: radarData,
        options: {
            borderWidth: 10,
            borderRadius: 2,
            hoverBorderWidth: 0,
            plugins: {
                legend: {
                    labels: {
                        color: 'rgba(0, 0, 0, 0.3)' // Color más oscuro para los nombres de las opciones
                    }
                },
            },
            scales: {
                r: {
                    grid: {
                        color: "rgba(0, 0, 0, 1)" // Color más oscuro para las líneas del radar
                    },
                    angleLines: {
                        color: "rgba(0, 0, 0, 1)" // Color más oscuro para las líneas del radar
                    }
                }
            }
        },
    });

});
