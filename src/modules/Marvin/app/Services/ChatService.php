<?php

namespace Modules\Marvin\Services;

use Modules\Marvin\DTOs\ChatMessageResponse;
use Modules\Marvin\Interfaces\Repositories\IChatRepository;
use Modules\Marvin\Interfaces\Services\IChatService;

class ChatService implements IChatService
{
    public function __construct(
        private IChatRepository $repository
    ) {}

    public function saveUserMsg(string $prompt, string $userId): ChatMessageResponse
    {
        $msg = $this->repository->create([
            'user_id' => $userId,
            'role' => 'user',
            'content' => $prompt
        ]);

        return ChatMessageResponse::from($msg);
    }

    public function getHistory(string $userId, int $limit = 6)
    {
        return $this->repository->getRecentByUser($userId, $limit);
    }

    public function saveAssistantMsg(string $content, string $userId)
    {
        return ChatMessageResponse::from(
            $this->repository->create([
                'user_id' => $userId,
                'role' => 'assistant',
                'content' => $content
            ])
        );
    }

    public function getRecentMsg(string $userId, int $limit = 6)
    {
        return $this->repository
            ->getRecentByUser($userId, $limit)
            ->map(fn($message) => ChatMessageResponse::from($message))
            ->values();
    }
}
