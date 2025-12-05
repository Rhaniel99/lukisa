<?php

namespace Modules\Marvin\Services;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Modules\Marvin\DTOs\ChatMessageData;
use Modules\Marvin\Interfaces\Services\IMarvinService;
use Modules\Marvin\Models\ChatMessage;
use Modules\Marvin\Services\OllamaService;

class MarvinService implements IMarvinService
{
    public function __construct(protected OllamaService $ollamaService) {}

    /**
     * Processa a pergunta do usuário, utilizando o histórico da conversa e o RAG para buscar contexto.
     *
     * @param string $userPrompt A nova pergunta do usuário.
     * @param string $userId O ID do usuário da conversa.
     * @return ChatMessageData O DTO da mensagem de resposta da IA.
     */
    public function ask(string $userPrompt, string $userId): ChatMessageData
    {
        // HISTÓRICO CURTO (máx. 2 mensagens)
        $history = ChatMessage::query()
            ->where('user_id', $userId)
            ->orderBy('created_at', 'desc')
            ->limit(6)
            ->get()
            ->reverse()
            ->values();

        // Detecta intenção para RAG
        $intent  = $this->getIntent($userPrompt);
        $context = $this->getContextForIntent($intent);

        // Monta system prompt final
        $systemPrompt = $this->buildSystemPrompt($context);

        // Monta mensagens (sem system!)
        $messages = $this->buildMessagesPayload($history, $userPrompt);

        // Chama o modelo
        $marvinResponse = $this->ollamaService->chat($messages, $systemPrompt);

        // Salva resposta no banco
        $assistantMessage = ChatMessage::create([
            'user_id' => $userId,
            'role'    => 'assistant',
            'content' => $marvinResponse,
        ]);

        return ChatMessageData::from($assistantMessage);
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

    /**
     * Busca o contexto relevante com base na intenção classificada.
     *
     * @param string $intent A intenção do usuário.
     * @return string|null O contexto encontrado ou null.
     */
  private function getContextForIntent(string $intent): ?string
    {
        return match ($intent) {
            'get_user_count' => "O sistema possui exatamente " . DB::table('users')->count() . " usuários.",
            default          => null,
        };
    }

    /**
     * Usa a IA para classificar a intenção do prompt do usuário.
     *
     * @param string $userPrompt
     * @return string A intenção classificada (ex: 'get_user_count', 'general_chat')
     */
    private function getIntent(string $userPrompt): string
    {
        $possibleIntents = ['get_user_count', 'general_chat'];

        $systemPromptForIntent =
            "Classifique a intenção do usuário em uma dessas categorias: "
            . implode(', ', $possibleIntents)
            . ". Responda APENAS com o nome da categoria.";

        $intent = $this->ollamaService->generate(
            prompt: $userPrompt,
            systemPromptOverride: $systemPromptForIntent,
            options: ['temperature' => 0]
        );

        $clean = trim($intent);

        return in_array($clean, $possibleIntents)
            ? $clean
            : 'general_chat';
    }
}
