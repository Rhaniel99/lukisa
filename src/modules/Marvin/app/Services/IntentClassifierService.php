<?php

namespace Modules\Marvin\Services;

use Modules\Marvin\Interfaces\Services\IIntentClassifierService;

class IntentClassifierService implements IIntentClassifierService
{
    public function __construct(
        protected OllamaService $ollamaService
    ) {}

    /**
     * Classifica intenção com auxílio do Ollama.
     */
    public function classify(string $prompt): string
    {
        $possibleIntents = ['get_user_count', 'general_chat'];

        $systemPrompt =
            "Classifique a intenção do usuário em uma dessas categorias: " .
            implode(', ', $possibleIntents) .
            ". Responda APENAS com o nome da categoria.";

        $intent = trim(
            $this->ollamaService->generate(
                prompt: $prompt,
                systemPromptOverride: $systemPrompt,
                options: ['temperature' => 0]
            )
        );

        return in_array($intent, $possibleIntents)
            ? $intent
            : 'general_chat';
    }
}
