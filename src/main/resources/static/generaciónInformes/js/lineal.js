document.addEventListener('DOMContentLoaded', function () {
    // Datos para el gráfico de líneas
    var data = [
        { month: 'Enero', value1: 50, value2: 30 },
        { month: 'Febrero', value1: 20, value2: 25 },
        { month: 'Marzo', value1: 15, value2: 40 },
        { month: 'Abril', value1: 50, value2: 20 },
        { month: 'Mayo', value1: 18, value2: 35 },
        { month: 'Junio', value1: 30, value2: 45 }
    ];

    // Configurar márgenes y dimensiones del gráfico de líneas
    var margin = { top: 20, right: 100, bottom: 50, left: 50 }, // Incrementamos el right para dar espacio a la leyenda
        svgWidth = 800,
        svgHeight = 400,
        width = svgWidth - margin.left - margin.right,
        height = svgHeight - margin.top - margin.bottom;

    // Crear el contenedor SVG
    var svg = d3.select('svg')
        .attr('width', svgWidth)
        .attr('height', svgHeight);

    // Crear el contenedor para el gráfico de líneas
    var lineChart = svg.append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    // Escala X para los meses
    var x = d3.scaleBand()
        .range([0, width])
        .domain(data.map(function (d) { return d.month; }))
        .padding(0.1);

    // Escala Y para los valores
    var y = d3.scaleLinear()
        .range([height, 0])
        .domain([0, d3.max(data, function (d) { return Math.max(d.value1, d.value2); })]);

    // Definir la línea para value1
    var line1 = d3.line()
        .x(function (d) { return x(d.month) + x.bandwidth() / 2; })
        .y(function (d) { return y(d.value1); });

    // Definir la línea para value2
    var line2 = d3.line()
        .x(function (d) { return x(d.month) + x.bandwidth() / 2; })
        .y(function (d) { return y(d.value2); });

    // Dibujar la línea para value1
    lineChart.append('path')
        .datum(data)
        .attr('class', 'line')
        .style('stroke', '#9064a1') // Color azul para value1
        .attr('d', line1);

    // Dibujar la línea para value2
    lineChart.append('path')
        .datum(data)
        .attr('class', 'line')
        .style('stroke', '#2391bd') // Color rojo para value2
        .attr('d', line2);

    // Agregar ejes X e Y
    lineChart.append('g')
        .attr('class', 'x-axis')
        .attr('transform', 'translate(0,' + height + ')')
        .call(d3.axisBottom(x));

    lineChart.append('g')
        .attr('class', 'y-axis')
        .call(d3.axisLeft(y));

    // Agregar la leyenda
    var legend = svg.selectAll('.legend')
        .data(['Ingresos', 'Gastos'])
        .enter().append('g')
        .attr('class', 'legend')
        .attr('transform', function (d, i) { return 'translate(' + (margin.left + width + 20) + ',' + (margin.top + i * 20) + ')'; });

    legend.append('rect')
        .attr('width', 18)
        .attr('height', 18)
        .style('fill', function (d) { return d === 'Ingresos' ? '#9064a1' : '#2391bd'; });

    legend.append('text')
        .attr('x', 24)
        .attr('y', 9)
        .attr('dy', '.35em')
        .text(function (d) { return d; });


        const chartData = {
            labels: ["Python", "Java", "JavaScript", "C#", "Others"],
            data: [30, 17, 10, 7, 36],
        };
        
        const myChart = document.querySelector(".my-chart");
        const ul = document.querySelector(".programming-stats .details ul");
        
        new Chart(myChart, {
            type: "doughnut",
            data: {
                labels: chartData.labels,
                datasets: [
                    {
                        label: "Language Popularity",
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
                li.innerHTML = `${l}: <span class='percentage'>${chartData.data[i]}%</span>`;
                ul.appendChild(li);
            });
        };
        
        populateUl();
});
