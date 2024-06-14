const responses = {
    greetings: ['¡Hola!', '¡Hola! ¿Cómo estás?', '¿Qué tal?', '¡Saludos!'],
    farewells: ['Adiós', 'Hasta luego', 'Nos vemos', '¡Chao!'],
    help: ['¿En qué puedo ayudarte?', 'Dime cómo puedo ayudarte.', 'Estoy aquí para ayudarte.'],
    mission: ['La misión de la Municipalidad de San Jerónimo es: "La Municipalidad de San Jerónimo, es una entidad moderna y competitiva, de reconocida imagen y referente Regional, que impulsa la descentralización a través de la Red de Municipalidades del Valle Sur; incorporando su planeación y gestión local, la participación activa y fiscalización de los ciudadanos y ciudadanas; se sustenta en un modo de gestión con acciones permanentes de coordinación, control, monitoreo y evaluación del personal, con la implementación de programas innovadores de simplificación de procedimientos, que permita agilizar y mejorar los procesos burocráticos; con autoridades y funcionarios capacitados y honestos, liderando el desarrollo local con profesionalismo, transparencia, vocación de servicio e identidad institucional."'],
    vision: ['La visión de la Municipalidad de San Jerónimo es: "Somos una institución al servicio de la comunidad, responsable de generar políticas adecuadas para el emprendimiento de las capacidades empresariales, sociales y políticas; promotora del desarrollo y bienestar del territorio, mediante la administración eficiente y transparente de los recursos públicos y aprovechamiento las oportunidades de las actividades estratégicas como el comercio, turismo recreativo – gastronómico y la agricultura ecológica; haciendo de San Jerónimo un Municipio Líder y competitivo, en el que se puede vivir con dignidad."'],
    siga: [
        'SIGA-MEF es el Sistema Integrado de Gestión Administrativa del Ministerio de Economía y Finanzas del Perú. Es una herramienta diseñada para apoyar la gestión administrativa y presupuestaria de las entidades del sector público.',
        'Funciones y características principales de SIGA-MEF:',
        'Beneficios de SIGA-MEF:',
        'Uso y Acceso:'
    ],
    siga_details: {
        features: '1. **Funciones y características principales de SIGA-MEF**:\n- **Gestión Presupuestaria**: Permite la formulación, ejecución y seguimiento del presupuesto de las entidades públicas.\n- **Gestión Administrativa**: Automatiza procesos administrativos como la gestión de bienes, servicios, recursos humanos y patrimonio.\n- **Transparencia y Control**: Promueve la transparencia en el uso de los recursos públicos mediante la generación de informes y reportes.',
        benefits: '2. **Beneficios de SIGA-MEF**:\n- **Eficiencia**: Reduce el tiempo y los recursos necesarios para la gestión administrativa y presupuestaria.\n- **Transparencia**: Mejora la transparencia en la gestión de los recursos públicos, facilitando la rendición de cuentas.\n- **Control y Supervisión**: Fortalece los mecanismos de control interno y externo, minimizando el riesgo de irregularidades.',
        access: '3. **Uso y Acceso**:\nEl uso de SIGA-MEF está dirigido a las entidades del sector público en Perú. Los usuarios deben estar debidamente capacitados y autorizados para acceder y utilizar el sistema. El acceso se realiza a través de plataformas habilitadas por el MEF, y suele requerir credenciales de usuario y cumplimiento de protocolos de seguridad.'
    },
    default: ['Lo siento, no entendí eso.', '¿Podrías repetirlo, por favor?', 'No estoy seguro de entenderte.'],
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
    
    // Mensaje inicial del bot
    const botMessage = document.createElement('div');
    botMessage.classList.add('chat-message', 'bot-message');
    botMessage.textContent = "Hola, soy LyonBot. Aquí tienes algunas preguntas frecuentes que puedes hacerme:";
    chatBox.appendChild(botMessage);
    
    // Añadir menú de preguntas frecuentes
    const faqMenu = document.createElement('div');
    faqMenu.classList.add('chat-message', 'bot-message');
    faqMenu.innerHTML = `
        <ul>
            <li>¿Cuál es la misión de la Municipalidad?</li>
            <li>¿Cuál es la visión de la Municipalidad?</li>
            <li>¿Cómo puedo obtener ayuda?</li>
            <li>Saludar</li>
            <li>Despedirse</li>
            <li>¿Qué es SIGA-MEF?</li>
        </ul>
    `;
    chatBox.appendChild(faqMenu);

    // Animación del mensaje inicial
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

    const chatBox = document.getElementById('chat-box');

    // Crear el mensaje del usuario
    const userMessage = document.createElement('div');
    userMessage.classList.add('chat-message', 'user-message');
    userMessage.textContent = message;
    chatBox.appendChild(userMessage);

    // Crear el mensaje del bot
    const botMessage = document.createElement('div');
    botMessage.classList.add('chat-message', 'bot-message');
    const response = getBotResponse(message);
    botMessage.innerHTML = response;
    chatBox.appendChild(botMessage);

    // Desplazar el contenedor del chat hacia abajo para mostrar el nuevo mensaje
    chatBox.scrollTop = chatBox.scrollHeight;

    // Limpiar el campo de entrada de texto
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
    } else if (message.includes('misión') || message.includes('mision')) {
        return responses.mission[Math.floor(Math.random() * responses.mission.length)];
    } else if (message.includes('visión') || message.includes('vision')) {
        return responses.vision[Math.floor(Math.random() * responses.vision.length)];
    } else if (message.includes('siga')) {
        return `
            <p>${responses.siga[0]}</p>
            <ul>
                <li onclick="showSigaDetail('features')">${responses.siga[1]}</li>
                <li onclick="showSigaDetail('benefits')">${responses.siga[2]}</li>
                <li onclick="showSigaDetail('access')">${responses.siga[3]}</li>
            </ul>
        `;
    } else {
        return responses.default[Math.floor(Math.random() * responses.default.length)];
    }
}

// Función para mostrar detalles de SIGA
function showSigaDetail(detailType) {
    const chatBox = document.getElementById('chat-box');
    const detailMessage = document.createElement('div');
    detailMessage.classList.add('chat-message', 'bot-message');
    detailMessage.innerHTML = responses.siga_details[detailType];
    chatBox.appendChild(detailMessage);
    chatBox.scrollTop = chatBox.scrollHeight;
}
