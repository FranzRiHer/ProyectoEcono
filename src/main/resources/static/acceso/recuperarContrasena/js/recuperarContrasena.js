$(document).ready(function() {
    // Escuchar el evento 'keypress' en el campo de contraseña
    $("#email").keypress(function(event) {
        // Verificar si la tecla presionada es 'Enter' (código 13)
        if (event.which === 13) {
            // Llamar a la función logIn para iniciar sesión
            validateUser();
        }
    });

    $("#confirmPassword").keypress(function(event){
        if (event.which === 13){
            submitNewPassword();
        }
    });
});

function validateUser() {
    var username = document.getElementById('username').value;
    var email = document.getElementById('email').value;

    // Verifica que ambos campos estén llenos antes de enviar la solicitud
    if (username && email) {
        // Prepara los datos para la solicitud
        var data = {
            username: username,
            email: email
        };

        // Realiza la solicitud POST al servidor
        fetch('http://localhost:8080/auth/validate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (!response.ok) {
                // Si la respuesta no es OK, lanza un error para pasar al bloque catch
                throw new Error('Failed to fetch');
            }
            return response.json();
        })
        .then(data => {
            // Si el usuario es validado con éxito, oculta el formulario actual y muestra el de cambio de contraseña
            document.getElementById('verifyUserForm').style.display = 'none';
            document.getElementById('changePasswordForm').style.display = 'block';
            // Puedes almacenar el ID del usuario si es necesario para una operación posterior
            console.log(data.id);
            localStorage.setItem('userId',data.id);
        })
        .catch(error => {
            // Maneja los errores aquí
            console.error('Error:', error);
            alert('No se encontró el usuario con los datos proporcionados.');
        });
    } else {
        // Si los campos no están llenos, alerta al usuario
        alert('Por favor, ingresa los datos requeridos.');
    }
}
function submitNewPassword() {
    var newPassword = document.getElementById('newPassword').value;
    var confirmPassword = document.getElementById('confirmPassword').value;

    // Verifica si las contraseñas ingresadas son iguales
    if (newPassword === confirmPassword) {
        // Obtiene el ID del usuario, asumiendo que lo has guardado en algún lado después de la validación
        var userId = localStorage.getItem('userId'); 

        // Prepara los datos para enviar al servidor
        var data = {
            id: userId,
            password: newPassword
        };

        // Realiza la solicitud POST al servidor para actualizar la contraseña
        fetch('http://localhost:8080/auth/updatePassword', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (response.ok) {
                // Notifica al usuario que la contraseña ha sido cambiada con éxito
                alert('Contraseña cambiada con éxito.');
                window.location.href = '/src/main/resources/static/acceso/login/login.html';
            } else {
                // Notifica al usuario en caso de error
                response.json().then(json => alert(json.message || 'Error al cambiar la contraseña.'));
            }
        })
        .catch(error => {
            // Maneja errores de la red o de conexión
            console.error('Error:', error);
            alert('Error al procesar la solicitud.');
        });
    } else {
        // Alerta al usuario si las contraseñas no coinciden
        alert('Las contraseñas no coinciden.');
    }
}
