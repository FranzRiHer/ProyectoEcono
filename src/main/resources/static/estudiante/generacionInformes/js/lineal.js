document.addEventListener('DOMContentLoaded', function () {

    const ingresosPorMes = {};
    const egresosPorMes = {};

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
        var url = "http://localhost:8080/ingreso/get_by_user/"+userId;

        fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
            .then(response => response.json())
            .then(data => {
                // Procesar los datos de ingresos obtenidos


                // Iterar sobre cada ingreso y acumular por mes
                data.forEach(entry => {
                    const fecha = new Date(entry.fechaCreacion);
                    const mes = fecha.getMonth() + 1; // El mes en JavaScript es base 0, por eso se suma 1
                    const cantidad = entry.cantidad;
                
                    // Si el mes ya existe en el objeto de ingresos, sumar la cantidad, de lo contrario, inicializarlo
                    if (ingresosPorMes[mes]) {
                        ingresosPorMes[mes] += cantidad;
                    } else {
                        ingresosPorMes[mes] = cantidad;
                    }
                    
                    // Asegurarse de que también haya una entrada para este mes en los egresos, si no existe, inicializarlo en 0
                    if (!egresosPorMes[mes]) {
                        egresosPorMes[mes] = 0;
                    }
                });

                console.log("Ingresos por mes:", ingresosPorMes);

                // Actualizar el gráfico de líneas con los datos de ingresos por mes

            })
            .catch(error => {
                console.error("Error al obtener los datos de ingresos:", error);
            });
    }


    // Función para obtener los datos de egresos
    function getEgresos() {
        let token = localStorage.getItem('token');
        let userId = localStorage.getItem('userId'); // Obtener el ID del usuario logueado
        var url = "http://localhost:8080/gastos/get_by_user/"+userId;

        fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
            .then(response => response.json())
            .then(data => {

                // Iterar sobre cada egreso y acumular por mes
                data.forEach(entry => {
                    const fecha = new Date(entry.fechaCreacion);
                    const mes = fecha.getMonth() + 1; // El mes en JavaScript es base 0, por eso se suma 1
                    const cantidad = entry.cantidadEgreso;
                
                    // Si el mes ya existe en el objeto de egresos, sumar la cantidad, de lo contrario, inicializarlo
                    if (egresosPorMes[mes]) {
                        egresosPorMes[mes] += cantidad;
                    } else {
                        egresosPorMes[mes] = cantidad;
                    }
                    
                    // Asegurarse de que también haya una entrada para este mes en los ingresos, si no existe, inicializarlo en 0
                    if (!ingresosPorMes[mes]) {
                        ingresosPorMes[mes] = 0;
                    }
                });

                console.log("Egresos por mes:", egresosPorMes);

                // Actualizar el gráfico de líneas con los datos de egresos por mes
                updateLineChart(ingresosPorMes, egresosPorMes);
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
    actualizarGraficaRadar(localStorage.getItem('userId'));
    // Realizar solicitud GET a la URL para obtener los datos JSON
    function actualizarGraficaRadar(userId) {
        // Construir la URL para la solicitud GET
        const url = `http://localhost:8080/categorias_i/get_by_user/${userId}`;
        console.log(url)
        const token=localStorage.getItem('token')

        // Realizar la solicitud GET a la URL
        fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
            .then(response => response.json())
            .then(jsonData => {
                console.log(jsonData)
                // Procesar los datos JSON recibidos para obtener la suma de egresos por categoría
                const sumaEgresosPorCategoria = {};
                jsonData.forEach(entry => {
                    entry.usuario.egresos.forEach(egreso => {
                        const categoria = egreso.categoriaEgreso.descripcion;
                        const cantidadEgreso = egreso.cantidadEgreso;
                
                        // Verificar si la categoría ya existe en el objeto
                        if (sumaEgresosPorCategoria[categoria]) {
                            // Si existe, solo sumar si el valor no es duplicado
                            if (sumaEgresosPorCategoria[categoria] !== cantidadEgreso) {
                                sumaEgresosPorCategoria[categoria] += cantidadEgreso;
                            }
                        } else {
                            // Si la categoría no existe, agregarla al objeto
                            sumaEgresosPorCategoria[categoria] = cantidadEgreso;
                        }
                    });
                });
                

                // Convertir el objeto de suma de egresos por categoría a un array de objetos {label, data}
                const labels = Object.keys(sumaEgresosPorCategoria);
                const data = Object.values(sumaEgresosPorCategoria);

                console.log(labels,data)
                // Crear el objeto de datos para la gráfica de radar
                const radarData = {
                    labels: labels,
                    datasets: [
                        {
                            label: "Anual",
                            data: data,
                            borderColor: 'rgb(77, 56, 124)',
                            borderWidth: 5,
                        },
                    ],
                };

                // Obtener la referencia al elemento de la gráfica de radar
                const radarChart = document.getElementById("radarChart");

                // Verificar si ya hay una instancia de Chart y destruirla antes de crear una nueva para evitar duplicados
                if (radarChart.chart) {
                    radarChart.chart.destroy();
                }

                // Crear la instancia de Chart para la gráfica de radar
                const radarChartInstance = new Chart(radarChart, {
                    type: "radar",
                    data: radarData,
                    options: {
                        borderWidth: 10,
                        borderRadius: 2,
                        hoverBorderWidth: 0,
                        plugins: {
                            legend: {
                                labels: {
                                    color: 'rgba(0, 0, 0, 0.3)'
                                }
                            },
                        },
                        scales: {
                            r: {
                                grid: {
                                    color: "rgba(0, 0, 0, 1)"
                                },
                                angleLines: {
                                    color: "rgba(0, 0, 0, 1)"
                                }
                            }
                        }
                    },
                });
            })
            .catch(error => {
                console.error('Error al obtener los datos:', error);
            });
    }


});
