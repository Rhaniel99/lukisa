<?php

namespace Modules\Marvin\Services;

use Illuminate\Database\Eloquent\Collection;
use Modules\Marvin\DTOs\ChatMessageResponse;
use Modules\Marvin\Interfaces\Services\IChatService;
use Modules\Marvin\Interfaces\Services\IContextProviderService;
use Modules\Marvin\Interfaces\Services\IIntentClassifierService;
use Modules\Marvin\Interfaces\Services\IMarvinService;
use Modules\Marvin\Interfaces\Services\IOllamaService;

class MarvinService implements IMarvinService
{
    public function __construct(
        protected IOllamaService $ollamaService,
        protected IChatService $chatService,
        protected IIntentClassifierService $intentClassifier,
        protected IContextProviderService $contextProvider
    ) {}

    public function ask(string $userPrompt, string $userId): ChatMessageResponse
    {
        // 1. Histórico (máx. 6)
        $history = $this->chatService->getHistory($userId);

        // 2. Intenção e contexto
        $intent  = $this->intentClassifier->classify($userPrompt);
        $context = $this->contextProvider->getContext($intent);

        // 3. Construção do prompt
        $systemPrompt = $this->buildSystemPrompt($context);
        $messages = $this->buildMessagesPayload($history, $userPrompt);

        // 4. Chamada ao modelo IA
        $marvinResponse = $this->ollamaService->chat($messages, $systemPrompt);

        // 5. Salvar resposta
        return $this->chatService->saveAssistantMsg($marvinResponse, $userId);
    }

    private function buildSystemPrompt(?string $context): string
    {
        $base = config('marvin.personality');

        if ($context) {
            // O Hermes obedece melhor quando o contexto é marcado explicitamente como dados
            $base .= "\n\n### DADOS DE CONTEXTO (Use seu intelecto superior para analisar isso):\n$context\n\n### FIM DOS DADOS";
        }

        return $base;
    }

    /**
     * Constrói o array de mensagens para enviar à API do Ollama.
     *
     * @param Collection $history Histórico de mensagens.
     * @param string $userPrompt Pergunta atual do usuário.
     * @param string|null $context Contexto obtido via RAG.
     * @return array
     */
    private function buildMessagesPayload(Collection $history, string $userPrompt): array
    {
        $messages = [];

        foreach ($history as $message) {
            $messages[] = [
                'role'    => $message->role,
                'content' => $message->content,
            ];
        }

        $messages[] = [
            'role'    => 'user',
            'content' => $userPrompt
        ];

        return $messages;
    }
}
