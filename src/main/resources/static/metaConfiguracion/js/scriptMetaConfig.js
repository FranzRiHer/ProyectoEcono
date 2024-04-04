function crearMetas (){
    setTimeout(() => actualizarMetas(), 0);
}

function setMetaLujos() {
    var nombre = "lujos";
    var porcentaje_lujos = document.getElementById("lujos").value;
    console.log("Porcentaje de lujos: ", porcentaje_lujos);


    // Validar si la cifra de dinero es un número
    if (!isNaN(porcentaje_lujos)) {
        let token = localStorage.getItem('token');
        let idUser = localStorage.getItem('userId');
        // Crear objeto JSON con los datos
        var datos = {
            nombre: nombre,
            porcentaje: porcentaje_lujos,
            usuario: {"id": idUser}
        };
        console.log(datos)
        // Configurar opciones para la solicitud fetch
        var opciones = {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datos)

        };
        console.log(JSON.stringify(datos))

        // URL a la que se enviarán los datos
        var url = 'http://localhost:8080/metas/add';
        console.log(url)
        // Realizar solicitud fetch
        fetch(url, opciones)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al enviar los datos.');
            }
            return response.json();
        })
        .then(data => {
            // Manejar la respuesta si es necesario
            console.log('Respuesta del servidor:', data);
            alert('Datos enviados exitosamente.');
            $("#lujos").val("");
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error al enviar los datos. Por favor, inténtelo de nuevo.');
        });
    } else {
        // Mostrar alerta si la cifra de dinero no es un número
        alert("La cifra de dinero debe ser un número.");
    }
}

async function getMetas() {
    try {
        const token = localStorage.getItem('token');
        const idUser = parseInt(localStorage.getItem('userId'), 10); // Asegúrate de que es un número
        const url = 'http://localhost:8080/metas/get_metas';

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        });

        if (!response.ok) {
            throw new Error('Error al enviar los datos.');
        }

        const data = await response.json();
        console.log('Respuesta del servidor:', data);

        // Dado que cada elemento ya incluye metas de un usuario específico,
        // podemos directamente buscar el objeto que corresponde al usuario deseado.
        const usuario = data.find(elemento => elemento.usuario.id === idUser);
        
        if (!usuario) {
            console.error('Usuario no encontrado');
            return;
        }

        // Accedemos directamente a las metas del usuario encontrado
        const metasUsuarioEspecifico = usuario.usuario.metas;
        console.log("Las metas del usuario son:", metasUsuarioEspecifico);
        
    } catch (error) {
        console.error('Error:', error);
    }
}

async function actualizarMetaIndividual(nombreMeta, inputId, usuarioId, token) {
    const porcentaje = parseInt(document.getElementById(inputId).value, 10);
    if (isNaN(porcentaje)) {
        console.warn(`Porcentaje para ${nombreMeta} no es un número.`);
        return;
    }

    const urlGetMetas = 'http://localhost:8080/metas/get_metas';
    
    try {
        // Obtener las metas actuales del usuario
        const response = await fetch(urlGetMetas, {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${token}` }
        });

        if (!response.ok) throw new Error('Error al obtener las metas.');
        const metas = await response.json();
        const metaUsuario = metas.find(meta => meta.usuario.id === usuarioId && meta.nombre === nombreMeta);

        if (!metaUsuario) {
            console.error(`Meta ${nombreMeta} no encontrada para el usuario ${usuarioId}`);
            return;
        }

        // Enviar la actualización al servidor con una petición PATCH
        const updateResponse = await fetch(`http://localhost:8080/metas/${metaUsuario.id}/update`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ porcentaje })
        });

        if (!updateResponse.ok) throw new Error(`Error al actualizar la meta ${nombreMeta}`);
        
        console.log(`Meta ${nombreMeta} actualizada:`, await updateResponse.json());

    } catch (error) {
        console.error(`Error al actualizar la meta ${nombreMeta}:`, error);
    }
}

async function actualizarMetas() {
    const token = localStorage.getItem('token');
    const usuarioId = parseInt(localStorage.getItem('userId'), 10); // Asegúrate de que es un número

    // Llamar a actualizarMetaIndividual para cada meta
    await actualizarMetaIndividual('Lujos', 'lujos', usuarioId, token);
    await actualizarMetaIndividual('Gastos Basicos', 'gastos_basicos', usuarioId, token);
    await actualizarMetaIndividual('Ahorro', 'ahorro', usuarioId, token);
    await actualizarMetaIndividual('Inversiones', 'inversiones', usuarioId, token);

    alert('Metas actualizadas exitosamente.');
}
