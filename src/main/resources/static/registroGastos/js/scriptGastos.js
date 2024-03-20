
function validarLabels() {
    let egreso = $("#egresoInput").val()
    let descripcion = $("#descripcionEgreso").val()

    if ((egreso !== "" && !isNaN(egreso)) && (descripcion !== "")) {
        console.log("Siu")
        saveEgreso(egreso, descripcion)
    } else {
        console.log("El dato ta malito"); // El contenido no es un número o está vacío
    }
}

function saveEgreso(egreso, descripcion) {
    console.log("Hola Imundo");

    let data = {
        egresoInput: egreso,
        descripcionEgreso: descripcion
    }

    let dataToSend = JSON.stringify(data);

    console.log(dataToSend)

    $.ajax({
        url: "",
        type: "POST",
        dataType: "JSON",
        contentType: "",
        data: dataToSend,
        success: function (result) {
            console.log(result);
            $("#egresoInput").val("");
            $("#descripcionEgreso").val("")
        }
    })
}
