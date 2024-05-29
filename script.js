// Función para manejar la lógica del chatbot
function getResponse(message) {
    const responses = {
        "hola": "¡Hola! ¿En qué puedo ayudarte?",
        "¿cómo estás?": "Estoy bien, ¿y tú?",
        "adiós": "¡Hasta luego!",
        "gracias": "De nada. ¿Hay algo más en lo que pueda ayudarte?",
        "¿quién eres?": "Soy un Chat Bot. ¿En qué puedo ayudarte?"
    };

    for (let question in responses) {
        if (message.toLowerCase().includes(question.toLowerCase())) {
            return responses[question];
        }
    }

    return "Lo siento, no entiendo. ¿Puedes ser más específico?";
}

// Función para enviar mensaje
function sendMessage() {
    const message = document.getElementById('message').value;
    const response = getResponse(message);
    document.getElementById('response').innerText = response;
}

// Función para abrir el modal
function openModal() {
    document.getElementById('modal').style.display = 'block';
}

// Función para cerrar el modal
function closeModal() {
    document.getElementById('modal').style.display = 'none';
}

