const responses = {
    greetings: ['Hola!', '¡Hola! ¿Cómo estás?', '¿Qué tal?', '¡Saludos!'],
    farewells: ['Adiós', 'Hasta luego', 'Nos vemos', '¡Chao!'],
    help: ['¿En qué puedo ayudarte?', 'Dime cómo puedo ayudarte.', 'Estoy aquí para ayudarte.'],
    mission: ['mision','La misión de la Municipalidad de San Jerónimo es: "La Municipalidad de San Jerónimo, es una entidad moderna y competitiva, de reconocida imagen y referente Regional, que impulsa la descentralización a través de la Red de Municipalidades del Valle Sur; incorporando su planeación y gestión local, la participación activa y fiscalización de los ciudadanos y ciudadanas; se sustenta en un modo de gestión con acciones permanentes de coordinación, control, monitoreo y evaluación del personal, con la implementación de programas innovadores de simplificación de procedimientos, que permita agilizar y mejorar los procesos burocráticos; con autoridades y funcionarios capacitados y honestos, liderando el desarrollo local con profesionalismo, transparencia, vocación de servicio e identidad institucional."'],
    vision: ['vision','La visión de la Municipalidad de San Jerónimo es: "Somos una institución al servicio de la comunidad, responsable de generar políticas adecuadas para el emprendimiento de las capacidades empresariales, sociales y políticas; promotora del desarrollo y bienestar del territorio, mediante la administración eficiente y transparente de los recursos públicos y aprovechamiento las oportunidades  de  las  actividades  estrategias  como  el  comercio,  turismo   recreativo  –  gastronómico  y  la agricultura ecológica; haciendo de San Jerónimo un Municipio Líder y competitivo, en el que se puede vivir con dignidad."'],
    default: ['Lo siento, no entendí eso.', 'Podrías repetirlo, por favor?', 'No estoy seguro de entenderte.'],
    // Añade más categorías y respuestas según sea necesario
};

// Función para abrir el modal y animar el león
function openModal() {
    document.getElementById('modal').style.display = 'block';
    document.getElementById('lion-icon').classList.add('jump');
    // Enviar mensaje inicial al abrir el modal
    sendInitialMessage();
}

// Función para enviar el mensaje inicial
function sendInitialMessage() {
    const chatBox = document.getElementById('chat-box');
    const botMessage = document.createElement('div');
    botMessage.classList.add('chat-message', 'bot-message');
    botMessage.textContent = "Hola, soy LyonBot";
    chatBox.appendChild(botMessage);
    botMessage.classList.add('jump');
}

// Función para cerrar el modal y detener la animación del león
function closeModal() {
    document.getElementById('modal').style.display = 'none';
    document.getElementById('lion-icon').classList.remove('jump');
}

// Función para reiniciar el chat
function restartChat() {
    const chatBox = document.getElementById('chat-box');
    chatBox.innerHTML = ''; // Eliminar todos los mensajes
    sendInitialMessage(); // Enviar mensaje inicial
}

// Función para manejar la lógica del chatbot
function sendMessage() {
    const message = document.getElementById('message').value.trim();
    if (!message) return;

    const userMessage = document.createElement('div');
    userMessage.classList.add('chat-message', 'user-message');
    userMessage.textContent = message;
    document.getElementById('chat-box').appendChild(userMessage);

    const botMessage = document.createElement('div');
    botMessage.classList.add('chat-message', 'bot-message');
    const response = getBotResponse(message);
    botMessage.textContent = response;
    document.getElementById('chat-box').appendChild(botMessage);

    // Agregar clase de animación al mensaje del bot
    botMessage.classList.add('jump');

    document.getElementById('message').value = '';
}

// Función para obtener la respuesta del bot
function getBotResponse(message) {
    message = message.toLowerCase();

    if (message.includes('hola') || message.includes('hello')) {
        return responses.greetings[Math.floor(Math.random() * responses.greetings.length)];
    } else if (message.includes('adiós') || message.includes('chao') || message.includes('bye')) {
        return responses.farewells[Math.floor(Math.random() * responses.farewells.length)];
    } else if (message.includes('ayuda') || message.includes('help')) {
        return responses.help[Math.floor(Math.random() * responses.help.length)];
    } else if (message.includes('mision') || message.includes('mission')) {
        return responses.mission[Math.floor(Math.random() * responses.mission.length)];
    } else if (message.includes('vision') || message.includes('vision')) {
        return responses.vision[Math.floor(Math.random() * responses.vision.length)];
    } else {
        return responses.default[Math.floor(Math.random() * responses.default.length)];
    }
}
