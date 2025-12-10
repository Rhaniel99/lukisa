<?php

namespace Modules\Marvin\Interfaces\Services;

use Modules\Marvin\DTOs\ChatMessageResponse;

/**
 * Interface IMarvinService
 * @package Modules\Marvin\Interfaces\Services
 */
interface IMarvinService
{
    /**
     * Processa a pergunta do usuário, utilizando o histórico da conversa e o RAG para buscar contexto.
     *
     * @param string $userPrompt A nova pergunta do usuário.
     * @param string $userId O ID do usuário da conversa.
     * @return ChatMessageResponse O DTO da mensagem de resposta da IA.
     */
    public function ask(string $userPrompt, string $userId): ChatMessageResponse;
}
