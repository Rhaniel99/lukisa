<?php

namespace Modules\Marvin\Services;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\DB;
use Modules\Marvin\Interfaces\Services\IMarvinService;
use Modules\Marvin\Models\ChatMessage;
use Modules\Marvin\Services\OllamaService;

class MarvinService implements IMarvinService
{
    public function __construct(protected OllamaService $ollamaService)
    {
    }

    /**
     * Processa a pergunta do usuário, utilizando o histórico da conversa e o RAG para buscar contexto.
     *
     * @param string $userPrompt A nova pergunta do usuário.
     * @param string $userId O ID do usuário da conversa.
     * @return string A resposta final da IA.
     */
    public function ask(string $userPrompt, string $userId): string
    {
        // 1. Recupera o histórico da conversa antes de adicionar a nova mensagem.
        $history = ChatMessage::query()
            ->where('user_id', $userId)
            ->orderBy('created_at', 'desc')
            ->limit(10)
            ->get()
            ->reverse();

        // 2. Salva a nova pergunta do usuário no banco de dados.
        ChatMessage::create([
            'user_id' => $userId,
            'role' => 'user',
            'content' => $userPrompt,
        ]);

        // 3. RAG: Detecta a intenção e busca o contexto necessário.
        $intent = $this->getIntent($userPrompt);
        $context = $this->getContextForIntent($intent);

        // 4. Constrói o payload de mensagens para a IA, incluindo histórico e contexto RAG.
        $messages = $this->buildMessagesPayload($history, $userPrompt, $context);

        // 5. Envia para a IA.
        $marvinResponse = $this->ollamaService->chat($messages);

        // 6. Salva a resposta da IA no banco de dados.
        ChatMessage::create([
            'user_id' => $userId,
            'role' => 'assistant',
            'content' => $marvinResponse,
        ]);

        return $marvinResponse;
    }

    /**
     * Constrói o array de mensagens para enviar à API do Ollama.
     *
     * @param Collection $history Histórico de mensagens.
     * @param string $userPrompt Pergunta atual do usuário.
     * @param string|null $context Contexto obtido via RAG.
     * @return array
     */
    private function buildMessagesPayload(Collection $history, string $userPrompt, ?string $context): array
    {
        $messages = [];

        // Adiciona a personalidade como a primeira mensagem do sistema.
        $messages[] = ['role' => 'system', 'content' => config('marvin.personality')];

        // Adiciona o histórico recuperado do banco de dados.
        foreach ($history as $message) {
            $messages[] = ['role' => $message->role, 'content' => $message->content];
        }

        // Adiciona o contexto RAG como uma mensagem de sistema separada, se existir.
        if ($context) {
            $messages[] = ['role' => 'system', 'content' => "Contexto para responder à pergunta a seguir: {$context}"];
        }

        // Adiciona a nova pergunta do usuário ao final do payload.
        $messages[] = ['role' => 'user', 'content' => $userPrompt];

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
        switch ($intent) {
            case 'get_user_count':
                $userCount = DB::table('users')->count();
                return "O número exato de usuários cadastrados no sistema é {$userCount}.";
            default:
                // Se a intenção for 'general_chat' ou outra não mapeada, não há contexto para buscar.
                return null;
        }
    }

    /**
     * Usa a IA para classificar a intenção do prompt do usuário.
     *
     * @param string $userPrompt
     * @return string A intenção classificada (ex: 'get_user_count', 'general_chat')
     */
    private function getIntent(string $userPrompt): string
    {
        $possibleIntents = [
            'get_user_count', // Para perguntas sobre o número de usuários
            'general_chat',   // Para todas as outras conversas
        ];

        $systemPromptForIntent = "Sua única tarefa é classificar a intenção do usuário em uma das seguintes categorias: "
            . implode(', ', $possibleIntents) .
            ". Responda APENAS com o nome da categoria e nada mais.\n\n"
            . "Exemplos:\n"
            . "- Se o usuário perguntar 'quantos usuários temos?', responda 'get_user_count'.\n"
            . "- Se o usuário perguntar 'qual o número de pessoas cadastradas?', responda 'get_user_count'.\n"
            . "- Se o usuário perguntar 'olá, tudo bem?', responda 'general_chat'.";

        $intent = $this->ollamaService->generate(
            prompt: $userPrompt,
            systemPromptOverride: $systemPromptForIntent,
            options: ['temperature' => 0]
        );

        $cleanedIntent = trim($intent);

        if (!in_array($cleanedIntent, $possibleIntents)) {
            return 'general_chat';
        }

        return $cleanedIntent;
    }
}
