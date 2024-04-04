$(document).ready(function(){
    $("#btnFiltrar").click(function(){
        var fechaInicio = $("#fechaInicio").val();
        var fechaFin = $("#fechaFin").val();
        
        // Convertir las fechas a formato ISO para comparación
        fechaInicio = fechaInicio.split("-").reverse().join("-");
        fechaFin = fechaFin.split("-").reverse().join("-");
        
        if (!fechaInicio || !fechaFin) {
            alert("Por favor, seleccione ambas fechas.");
            return;
        }

        $("table tbody tr").filter(function(){
            var fechaTexto = $(this).find("td:nth-child(4)").text();
            // Asumiendo que la fecha está en el formato DD-MM-YYYY, convertirla a YYYY-MM-DD
            var fecha = fechaTexto.split("-").reverse().join("-");
            
            if(fecha >= fechaInicio && fecha <= fechaFin) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    });
});
