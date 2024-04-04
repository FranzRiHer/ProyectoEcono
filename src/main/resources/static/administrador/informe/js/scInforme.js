$(document).ready(function(){
     // Filtración por fecha única o rango de fechas
     $("#btnFiltrar").click(function(){
        var fechaInicio = $("#fechaInicio").val();
        var fechaFin = $("#fechaFin").val() || fechaInicio; // Si no hay fechaFin, usar fechaInicio
        
        if (!fechaInicio) {
            alert("Por favor, seleccione al menos la fecha de inicio.");
            return;
        }

        $("table tbody tr").filter(function(){
            var fechaTexto = $(this).find("td:nth-child(4)").text();
            
            // Comparar las fechas como ISO (YYYY-MM-DD)
            if(fechaTexto >= fechaInicio && fechaTexto <= fechaFin) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    });

     // Función de búsqueda por ID o nombre
    $("#searchInput").on("input", function() {
        var searchValue = $(this).val().toLowerCase();
        
        $("table tbody tr").filter(function() {
            // Verifica si el término de búsqueda está en la columna del ID o del nombre
            var idMatch = $(this).find("td:nth-child(1)").text().toLowerCase().indexOf(searchValue) > -1;
            var nameMatch = $(this).find("td:nth-child(2)").text().toLowerCase().indexOf(searchValue) > -1;
            $(this).toggle(idMatch || nameMatch);
        });
    });
});
