from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf

app = Flask(__name__)
CORS(app)

# Definir datos de entrenamiento: preguntas y etiquetas de intención correspondientes
preguntas = ["hola", "¿cómo estás?", "adiós", "gracias", "¿quién eres?"]
etiquetas = ["saludo", "estado", "despedida", "agradecimiento", "identidad"]

# Crear un tokenizador y ajustarlo a las preguntas
tokenizer = tf.keras.preprocessing.text.Tokenizer()
tokenizer.fit_on_texts(preguntas)

# Convertir preguntas a secuencias de índices
secuencias_preguntas = tokenizer.texts_to_sequences(preguntas)

# Obtener el número total de palabras (tokens)
num_palabras = len(tokenizer.word_index) + 1

# Rellenar secuencias para que tengan la misma longitud
secuencias_preguntas = tf.keras.preprocessing.sequence.pad_sequences(secuencias_preguntas)

# Convertir etiquetas a números
etiquetas_numericas = [etiquetas.index(etiqueta) for etiqueta in etiquetas]

# Crear un conjunto de datos TensorFlow a partir de las secuencias de preguntas y las etiquetas
dataset = tf.data.Dataset.from_tensor_slices((secuencias_preguntas, etiquetas_numericas))

# Mezclar y agrupar el conjunto de datos
dataset = dataset.shuffle(len(secuencias_preguntas)).batch(32)

# Crear un modelo simple de clasificación de intención utilizando una capa densa
modelo = tf.keras.Sequential([
    tf.keras.layers.Embedding(input_dim=num_palabras, output_dim=64),
    tf.keras.layers.GlobalAveragePooling1D(),
    tf.keras.layers.Dense(64, activation='relu'),
    tf.keras.layers.Dense(len(etiquetas), activation='softmax')
])

# Compilar el modelo
modelo.compile(optimizer='adam',
               loss='sparse_categorical_crossentropy',
               metrics=['accuracy'])

# Entrenar el modelo
modelo.fit(dataset, epochs=10)  # Reducido a 10 epochs para pruebas

# Definir respuestas para las intenciones predichas
respuestas = {
    0: "¡Hola! ¿En qué puedo ayudarte?",
    1: "Estoy bien, ¿y tú?",
    2: "¡Hasta luego!",
    3: "De nada. ¿Hay algo más en lo que pueda ayudarte?",
    4: "Soy un Chat Bot. ¿En qué puedo ayudarte?"
}

# Función para predecir la intención del usuario
def predecir_intencion(mensaje):
    secuencia_mensaje = tokenizer.texts_to_sequences([mensaje])
    secuencia_mensaje = tf.keras.preprocessing.sequence.pad_sequences(secuencia_mensaje, maxlen=secuencias_preguntas.shape[1])
    prediction = modelo.predict(secuencia_mensaje)
    predicted_label_index = tf.argmax(prediction, axis=1).numpy()[0]
    return predicted_label_index

@app.route('/chat', methods=['POST'])
def chat():
    data = request.json
    mensaje_usuario = data['mensaje']
    intencion = predecir_intencion(mensaje_usuario)
    respuesta = respuestas.get(intencion, "Lo siento, no entiendo. ¿Puedes ser más específico?")
    return jsonify({'respuesta': respuesta})

if __name__ == '__main__':
    app.run(debug=True)
