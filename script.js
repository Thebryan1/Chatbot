// Función para abrir el modal
function openModal() {
    document.getElementById('modal').style.display = 'block';
}

// Función para cerrar el modal
function closeModal() {
    document.getElementById('modal').style.display = 'none';
}

// Función para manejar la lógica del chatbot
async function sendMessage() {
    const message = document.getElementById('message').value;
    if (!message) return;

    const userMessage = document.createElement('div');
    userMessage.classList.add('chat-message', 'user-message');
    userMessage.textContent = message;
    document.getElementById('chat-box').appendChild(userMessage);

    const response = await fetch('https://dialogflow.googleapis.com/v2/projects/YOUR_PROJECT_ID/agent/sessions/12345:detectIntent', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer YOUR_ACCESS_TOKEN',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            queryInput: {
                text: {
                    text: message,
                    languageCode: 'es'
                }
            }
        })
    });

    const data = await response.json();
    const result = data.queryResult.fulfillmentText;

    const botMessage = document.createElement('div');
    botMessage.classList.add('chat-message', 'bot-message');
    botMessage.textContent = result;
    document.getElementById('chat-box').appendChild(botMessage);

    document.getElementById('message').value = '';
}
