function crearMetas (){
    setTimeout(() => actualizarMetas(), 0);
}

//variable global metas del usuario:
var global_metas = [];

$(document).ready(function () {
    global_metas = [];
    getMetas();
    getMetasCsv();
});
  
async function getMetasCsv() {
    try {
        const idUser = parseInt(localStorage.getItem('userId'), 10);
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:8080/metas/get_metas_csv/${idUser}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        });

        if (!response.ok) {
            throw new Error('Error al obtener las metas en formato CSV.');
        }

        const csvData = await response.text();
        console.log(csvData);
    } catch (error) {
        console.error('Error:', error);
    }
}


async function getMetas() {
    try {
        const token = localStorage.getItem('token');
        const idUser = parseInt(localStorage.getItem('userId'), 10); // Asegúrate de que es un número
        const url = `http://localhost:8080/metas/get_metas_by_user/${idUser}`;

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        });

        if (!response.ok) {
            throw new Error('Error al obtener las metas.');
        }

        const metas_usuario = await response.json();        
        if (!metas_usuario) {
            console.error('Usuario no encontrado');
            return;
        }

        console.log("Las metas del usuario son:", metas_usuario);

        const metasContainer = $('#metasContainer');

        metasContainer.empty(); // Limpiar el contenedor de metas existente

        // Crear y añadir las metas al DOM
        metas_usuario.forEach(meta => {
            const metaRow = $('<div>').addClass('form-group');
            metaRow.append($('<label>').attr('for', meta.nombre).text(meta.nombre + ':'));
            const inputGroup = $('<div>').addClass('input-group');
            inputGroup.append(
                $('<input>').addClass('form-control')
                            .attr('type', 'text')
                            .attr('id', meta.nombre.replace(/\s+/g, '_'))
                            .attr('placeholder', meta.porcentaje),
                $('<div>').addClass('input-group-append')
                        .append($('<span>').addClass('input-group-text').text('%'))
            );
            metaRow.append(inputGroup);
            metasContainer.append(metaRow);
        });
        global_metas = metas_usuario;
        console.log("Metas globales: ", global_metas);
    } catch (error) {
        console.error('Error:', error);
    }
}


async function actualizarMetas() {
    const metasContainer = $('#metasContainer');
    const token = localStorage.getItem('token');
    const idUser = parseInt(localStorage.getItem('userId'), 10);

    // Recopilar datos de los inputs
    let sumaPorcentajes = 0;
    const updates = metasContainer.find('input').map(function() {
        const porcentaje = parseInt($(this).val(), 10);
        if (isNaN(porcentaje) || porcentaje < 0 || porcentaje > 100) {
          alert('Todos los porcentajes deben ser números válidos entre 0 y 100.');
          throw 'Porcentaje inválido'; // Esto interrumpe el bucle .map y la función
        }
        sumaPorcentajes += porcentaje;
        return {
            nombre: $(this).attr('id').replace(/_/g, ' '), // Convierte el id del input al nombre de la meta
            porcentaje: $(this).val()
        };
    }).get();

    // Comprobar si la suma de los porcentajes es igual a 100
    if (sumaPorcentajes !== 100) {
        Swal.fire({
            title: "<strong>Verifica</strong>",
            icon: "info",
            html: `
            La suma de los porcentajes debe ser igual a 100%.
            `,
            showCloseButton: true,
            focusConfirm: false
          });
        getMetas();
        return;
    }

    // Actualizar metas en el servidor
    for (let i = 0; i < updates.length; i++) {
        const meta = updates[i];
        console.log(`Actualizando meta ${meta.nombre} con porcentaje ${meta.porcentaje}`);
        
        const meta_valida = global_metas.find(elemento => elemento.nombre === meta.nombre);
        const idMeta = meta_valida ? meta_valida.id : null;
        const url = idMeta ? `http://localhost:8080/metas/update/${idMeta}` : console.error('Meta Invalida');
        try {
            const response = await fetch(url, {
                method: 'PATCH', 
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ porcentaje: meta.porcentaje })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Error al actualizar la meta: ${errorData.message}`);
            }
            console.log(`Meta ${meta.nombre} actualizada con éxito`);
        } catch (error) {
            console.error(`Error al actualizar la meta ${meta.nombre}:`, error);
        }
    }
    Swal.fire({
        title: "¡Vas Por Ella!",
        text: "Tus metas han sido actualizadas.",
        icon: "success"
      });

    // Actualizar metas en el frontend
    getMetas();
}
