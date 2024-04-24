$(document).ready(function () {
    $('#userInput').on('keypress', function (e) {
        if (e.which === 13) {  // Enter key
            sendMessage();
        }
    });
});

// Define una función asincrónica llamada 'query' que toma un objeto 'data' como argumento.
async function query(data) {
    try {
        const token = localStorage.getItem('token');
        const idUser = parseInt(localStorage.getItem('userId'), 10);
        const url = `http://localhost:8080/chatbot/query/${idUser}`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error('Error al realizar la consulta al chatbot.');
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error en la consulta al chatbot:', error);
        throw error;
    }

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