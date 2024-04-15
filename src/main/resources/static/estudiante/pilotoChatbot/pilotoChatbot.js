$(document).ready(function () {
    $('#userInput').on('keypress', function (e) {
        if (e.which === 13) {  // Enter key
            sendMessage();
        }
    });
});

// Define una función asincrónica llamada 'query' que toma un objeto 'data' como argumento.
async function query(data) {
    // Realiza una solicitud 'fetch' a la URL proporcionada, que parece ser una API de inferencia.
    const response = await fetch(
        "https://www.stack-inference.com/inference/v0/run/5f88e2a7-998b-4cca-a223-efff3e8e325a/661c4068895f652a7f53219f",
        {
            // Configura los headers de la solicitud con el token de autorización y el tipo de contenido.
            headers: {
                'Authorization': 'Bearer 68ace983-7f02-4dac-aeae-11c568d0f9e2', // Token de API
                'Content-Type': 'application/json'
            },
            method: "POST", // Método HTTP POST
            body: JSON.stringify(data), // Convierte el objeto 'data' a una cadena JSON para el cuerpo de la solicitud
        }
    );
    // Espera a que la solicitud se complete y convierte la respuesta a JSON.
    const result = await response.json();
    // Devuelve el resultado de la conversión de la respuesta.
    return result;
}




function appendMessage(who, text) {
    const messageContainer = $('<div>').addClass(`message ${who}`);
    messageContainer.text(`${who === 'user' ? 'Tú' : 'Chatbot'}: ${text}`);

    $('#chatbox').append(messageContainer);
    $('#chatbox').scrollTop($('#chatbox')[0].scrollHeight);
}

function sendMessage() {
    const userInput = $('#userInput').val().trim();
    console.log('Usuario:', userInput);
    if (!userInput) {
        return;
    }

    appendMessage('user', userInput);

    query({"in-0": userInput, "user_id": "exampleUserId"}).then(response => {
        console.log('Chatbot:', response);
        jsonString = JSON.stringify(response);
        // Parse the JSON string
        const jsonObject = JSON.parse(jsonString);

        // Accede al texto dentro de "outputs" y "out-0"
        const texto = jsonObject.outputs["out-0"];

        console.log(texto);
        appendMessage('bot', texto);
    }).catch(error => {
        console.error('Error en el chatbot:', error);
        appendMessage('bot', 'Lo siento, estoy teniendo problemas para responder en este momento.');
    });

    $('#userInput').val('');
}