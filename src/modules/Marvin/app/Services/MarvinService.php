<?php

namespace Modules\Marvin\Services;

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
     * Processa a pergunta do usuário usando o histórico da conversa.
     *
     * @param string $userPrompt A nova pergunta do usuário.
     * @param string $sessionId O ID da sessão da conversa.
     * @return string A resposta final da IA.
     */
    public function ask_chat(string $userPrompt, string $sessionId): string
    {
        // 1. (Recuperação) Busca as últimas 10 mensagens da conversa atual.
        $history = ChatMessage::query()
            ->where('session_id', $sessionId)
            ->orderBy('created_at', 'desc')
            ->limit(10)
            ->get()
            ->reverse(); // Revertemos para manter a ordem cronológica

        // 2. (Formatação) Monta o payload para a API do Ollama.
        $messages = [];

        // Adiciona a personalidade como a primeira mensagem do sistema
        $messages[] = ['role' => 'system', 'content' => config('marvin.personality')];

        // Adiciona o histórico recuperado
        foreach ($history as $message) {
            $messages[] = ['role' => $message->role, 'content' => $message->content];
        }

        // Adiciona a nova pergunta do usuário
        $messages[] = ['role' => 'user', 'content' => $userPrompt];

        // 3. (Geração) Envia para o OllamaService usando o novo método chat()
        $marvinResponse = $this->ollamaService->chat($messages);

        // 4. (Salvamento) Salva a nova pergunta e a resposta no banco de dados
        DB::table('marvin_chat_messages')->insert([
            ['session_id' => $sessionId, 'role' => 'user', 'content' => $userPrompt, 'created_at' => now(), 'updated_at' => now()],
            ['session_id' => $sessionId, 'role' => 'assistant', 'content' => $marvinResponse, 'created_at' => now(), 'updated_at' => now()],
        ]);

        return $marvinResponse;
    }

    /**
     * Orquestra a resposta para o usuário, começando pela classificação de intenção.
     */
    public function ask(string $userPrompt): string
    {
        // PASSO 1: Descobrir a intenção do usuário
        $intent = $this->getIntent($userPrompt);

        // PASSO 2: Agir com base na intenção
        switch ($intent) {
            case 'get_user_count':
                // Se a intenção é contar usuários, executamos a lógica RAG
                $userCount = DB::table('users')->count();
                $finalPrompt = "Contexto: O número exato de usuários cadastrados no sistema é {$userCount}. Pergunta do usuário: \"{$userPrompt}\". Por favor, responda à pergunta do usuário usando o contexto fornecido.";
                return $this->ollamaService->generate($finalPrompt);

            default:
                // Para qualquer outra intenção, apenas conversamos
                return $this->ollamaService->generate($userPrompt);
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
        // Definimos as possíveis intenções que a IA pode escolher
        $possibleIntents = [
            'get_user_count', // Para perguntas sobre o número de usuários
            'general_chat',   // Para todas as outras conversas
        ];

        // Um prompt de sistema focado APENAS em classificação
        $systemPromptForIntent = "
            Sua única tarefa é classificar a intenção do usuário em uma das seguintes categorias: "
            . implode(', ', $possibleIntents) .
            ". Responda APENAS com o nome da categoria e nada mais.

            Exemplos:
            - Se o usuário perguntar 'quantos usuários temos?', responda 'get_user_count'.
            - Se o usuário perguntar 'qual o número de pessoas cadastradas?', responda 'get_user_count'.
            - Se o usuário perguntar 'olá, tudo bem?', responda 'general_chat'.
        ";

        // Usamos o OllamaService, mas com um "system prompt" temporário para esta tarefa.
        // O `generate` do OllamaService precisa ser um pouco mais flexível.
        // (Veja a alteração no OllamaService abaixo)
        $intent = $this->ollamaService->generate(
            prompt: $userPrompt,
            systemPromptOverride: $systemPromptForIntent,
            options: ['temperature' => 0] // Temperatura 0 para ser preciso na classificação
        );

        // Limpa a resposta para garantir que temos apenas a intenção
        $cleanedIntent = trim($intent);

        // Se a IA responder com algo que não é uma intenção válida, assumimos 'general_chat'
        if (!in_array($cleanedIntent, $possibleIntents)) {
            return 'general_chat';
        }

        return $cleanedIntent;
    }

}
