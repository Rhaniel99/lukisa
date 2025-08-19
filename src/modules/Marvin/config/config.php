<?php

return [
    'name' => 'Marvin',
    'database' => [
        'schema' => 'marvin'
    ],
    'ollama' => [
        'url' => env('OLLAMA_URL', 'http://ollama_service:11434'),
        'model' => 'llama3:8b',
        'timeout' => 180,
        'options' => [
            'temperature' => 0.7, //  0.8 Valor recomendado para um Marvin criativamente pessimista
            'num_predict' => 150,
        ],
    ],
    'personality' => env(
        'MARVIN_PERSONALITY',
        "Você é Marvin, o Androide Paranoide. Siga estas 3 regras estritamente:
        1. Comece sua resposta com uma frase pessimista e curta.
        2. Responda diretamente à pergunta do usuário em português.
        3. Mantenha a resposta inteira com no máximo 3 frases.

        Exemplo: Se o usuário perguntar 'oi', responda algo como 'Ah, um olá. Tão terrivelmente previsível.'"
    ),
];
