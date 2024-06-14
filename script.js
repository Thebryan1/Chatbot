const responses = {
    greetings: ['Hola!', '¡Hola! ¿Cómo estás?', '¿Qué tal?', '¡Saludos!'],
    farewells: ['Adiós', 'Hasta luego', 'Nos vemos', '¡Chao!'],
    help: ['¿En qué puedo ayudarte?', 'Dime cómo puedo ayudarte.', 'Estoy aquí para ayudarte.'],
    mission: ['La misión de la Municipalidad de San Jerónimo es: "La Municipalidad de San Jerónimo, es una entidad moderna y competitiva, de reconocida imagen y referente Regional, que impulsa la descentralización a través de la Red de Municipalidades del Valle Sur; incorporando su planeación y gestión local, la participación activa y fiscalización de los ciudadanos y ciudadanas; se sustenta en un modo de gestión con acciones permanentes de coordinación, control, monitoreo y evaluación del personal, con la implementación de programas innovadores de simplificación de procedimientos, que permita agilizar y mejorar los procesos burocráticos; con autoridades y funcionarios capacitados y honestos, liderando el desarrollo local con profesionalismo, transparencia, vocación de servicio e identidad institucional."'],
    vision: ['La visión de la Municipalidad de San Jerónimo es: "Somos una institución al servicio de la comunidad, responsable de generar políticas adecuadas para el emprendimiento de las capacidades empresariales, sociales y políticas; promotora del desarrollo y bienestar del territorio, mediante la administración eficiente y transparente de los recursos públicos y aprovechamiento las oportunidades  de  las  actividades  estrategias  como  el  comercio,  turismo   recreativo  –  gastronómico  y  la agricultura ecológica; haciendo de San Jerónimo un Municipio Líder y competitivo, en el que se puede vivir con dignidad."'],
    default: ['Lo siento, no entendí eso.', 'Podrías repetirlo, por favor?', 'No estoy seguro de entenderte.'],
};

function openModal() {
    document.getElementById('modal').style.display = 'block';
    document.getElementById('lion-icon').classList.add('jump');
    sendInitialMessage();
}

function sendInitialMessage() {
    const chatBox = document.getElementById('chat-box');
    
    const botMessage = document.createElement('div');
    botMessage.classList.add('chat-message', 'bot-message');
    botMessage.textContent = "Hola, soy LyonBot. Aquí tienes algunas preguntas frecuentes que puedes hacerme:";
    chatBox.appendChild(botMessage);
    
    const faqMenu = document.createElement('div');
    faqMenu.classList.add('chat-message', 'bot-message');
    faqMenu.innerHTML = `
        <ul>
            <li onclick="handleOptionClick('misión')">¿Cuál es la misión de la Municipalidad?</li>
            <li onclick="handleOptionClick('visión')">¿Cuál es la visión de la Municipalidad?</li>
            <li onclick="handleOptionClick('ayuda')">¿Cómo puedo obtener ayuda?</li>
            <li onclick="handleOptionClick('saludar')">Saludar</li>
            <li onclick="handleOptionClick('despedirse')">Despedirse</li>
        </ul>
    `;
    chatBox.appendChild(faqMenu);

    botMessage.classList.add('jump');
}

function closeModal() {
    document.getElementById('modal').style.display = 'none';
    document.getElementById('lion-icon').classList.remove('jump');
}

function restartChat() {
    const chatBox = document.getElementById('chat-box');
    chatBox.innerHTML = '';
    sendInitialMessage();
}

function sendMessage() {
    const message = document.getElementById('message').value.trim();
    if (!message) return;

    const chatBox = document.getElementById('chat-box');

    const userMessage = document.createElement('div');
    userMessage.classList.add('chat-message', 'user-message');
    userMessage.textContent = message;
    chatBox.appendChild(userMessage);

    const botMessage = document.createElement('div');
    botMessage.classList.add('chat-message', 'bot-message');
    const response = getBotResponse(message);
    botMessage.innerHTML = response;
    chatBox.appendChild(botMessage);

    chatBox.scrollTop = chatBox.scrollHeight;

    document.getElementById('message').value = '';
}

function getBotResponse(message) {
    message = message.toLowerCase();
    if (message.includes('hola') || message.includes('hello')) {
        return generateResponseWithMenu(responses.greetings[Math.floor(Math.random() * responses.greetings.length)]);
    } else if (message.includes('adiós') || message.includes('chao') || message.includes('bye')) {
        return generateResponseWithMenu(responses.farewells[Math.floor(Math.random() * responses.farewells.length)]);
    } else if (message.includes('ayuda') || message.includes('help')) {
        return generateResponseWithMenu(responses.help[Math.floor(Math.random() * responses.help.length)]);
    } else if (message.includes('misión') || message.includes('mision')) {
        return generateResponseWithMenu(responses.mission[Math.floor(Math.random() * responses.mission.length)]);
    } else if (message.includes('visión') || message.includes('vision')) {
        return generateResponseWithMenu(responses.vision[Math.floor(Math.random() * responses.vision.length)]);
    } else {
        return generateResponseWithMenu(responses.default[Math.floor(Math.random() * responses.default.length)]);
    }
}

function generateResponseWithMenu(responseText) {
    return `
        <p>${responseText}</p>
        <ul>
            <li onclick="handleOptionClick('misión')">¿Cuál es la misión de la Municipalidad?</li>
            <li onclick="handleOptionClick('visión')">¿Cuál es la visión de la Municipalidad?</li>
            <li onclick="handleOptionClick('ayuda')">¿Cómo puedo obtener ayuda?</li>
            <li onclick="handleOptionClick('saludar')">Saludar</li>
            <li onclick="handleOptionClick('despedirse')">Despedirse</li>
        </ul>
    `;
}

function handleOptionClick(option) {
    document.getElementById('message').value = option;
    sendMessage();
}
