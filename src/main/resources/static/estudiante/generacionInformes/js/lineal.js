document.addEventListener('DOMContentLoaded', function () {

    const getMonthName = (dateString) => {
        const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
        const date = new Date(dateString);
        const monthIndex = date.getMonth();
        return monthNames[monthIndex];
    };

    // Función para obtener los datos de ingresos
    function getIngresos() {
        let token = localStorage.getItem('token');
        let userId = localStorage.getItem('userId'); // Obtener el ID del usuario logueado
        var url = "http://localhost:8080/ingreso/ingreso";

        fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
            .then(response => response.json())
            .then(data => {
                // Procesar los datos de ingresos obtenidos
                const ingresosPorMes = {};

                // Iterar sobre cada ingreso y acumular por mes
                data.forEach(entry => {
                    const fecha = new Date(entry.fechaCreacion);
                    const mes = fecha.getMonth() + 1; // El mes en JavaScript es base 0, por eso se suma 1
                    const cantidad = entry.cantidad;

                    // Si el mes ya existe en el objeto, sumar la cantidad, de lo contrario, inicializarlo
                    if (ingresosPorMes[mes]) {
                        ingresosPorMes[mes] += cantidad;
                    } else {
                        ingresosPorMes[mes] = cantidad;
                    }
                });

                console.log("Ingresos por mes:", ingresosPorMes);

                // Actualizar el gráfico de líneas con los datos de ingresos por mes
                updateLineChart(ingresosPorMes, {});
            })
            .catch(error => {
                console.error("Error al obtener los datos de ingresos:", error);
            });
    }

    
    // Función para obtener los datos de egresos
    function getEgresos() {
        let token = localStorage.getItem('token');
        let userId = localStorage.getItem('userId'); // Obtener el ID del usuario logueado
        var url = "http://localhost:8080/gastos/egresos";

        fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
            .then(response => response.json())
            .then(data => {
                // Procesar los datos de egresos obtenidos
                const egresosPorMes = {};

                // Iterar sobre cada egreso y acumular por mes
                data.forEach(entry => {
                    const fecha = new Date(entry.fechaCreacion);
                    const mes = fecha.getMonth() + 1; // El mes en JavaScript es base 0, por eso se suma 1
                    const cantidad = entry.cantidadEgreso;

                    // Si el mes ya existe en el objeto, sumar la cantidad, de lo contrario, inicializarlo
                    if (egresosPorMes[mes]) {
                        egresosPorMes[mes] += cantidad;
                    } else {
                        egresosPorMes[mes] = cantidad;
                    }
                });

                console.log("Egresos por mes:", egresosPorMes);

                // Actualizar el gráfico de líneas con los datos de egresos por mes
                updateLineChart({}, egresosPorMes);
            })
            .catch(error => {
                console.error("Error al obtener los datos de egresos:", error);
            });
    }

    // Función para actualizar el gráfico de líneas con los datos de ingresos y egresos
    function updateLineChart(ingresosPorMes, egresosPorMes) {
        const lineChartElement = document.getElementById("lineChart").getContext('2d');

        // Crear el nuevo gráfico con los datos actualizados
        lineChart = new Chart(lineChartElement, {
            type: 'line',
            data: {
                labels: Object.keys(ingresosPorMes).map(month => getMonthName(`${new Date().getFullYear()}-${month}-01`)), // Obtener nombres de los meses
                datasets: [
                    {
                        label: "Ingresos",
                        data: Object.values(ingresosPorMes),
                        borderColor: '#9064a1',
                        borderWidth: 2,
                        fill: false
                    },
                    {
                        label: "Egresos",
                        data: Object.values(egresosPorMes),
                        borderColor: '#2391bd',
                        borderWidth: 2,
                        fill: false
                    }
                ]
            },
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
    }

    // Llamar a las funciones para obtener los datos de ingresos y egresos al cargar el DOM
    getIngresos();
    getEgresos();

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
