document.addEventListener('DOMContentLoaded', function() {
    fetchTotales();
  });
  
  function fetchTotales() {
    // Obtener ingresos totales
    fetch('/ingreso/total')
      .then(response => response.json())
      .then(data => {
        document.getElementById('ingresosTotales').innerText = `$${data.total}`;
      })
      .catch(error => console.error('Error al obtener ingresos totales:', error));
  
    // Obtener gastos totales
    fetch('/gastos/total')
      .then(response => response.json())
      .then(data => {
        document.getElementById('gastosTotales').innerText = `$${data.total}`;
      })
      .catch(error => console.error('Error al obtener gastos totales:', error));
  }
  