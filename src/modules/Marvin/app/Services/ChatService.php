<?php

namespace Modules\Marvin\Services;

use Modules\Marvin\DTOs\ChatMessageData;
use Modules\Marvin\Interfaces\Repositories\IChatRepository;
use Modules\Marvin\Interfaces\Services\IChatService;

class ChatService implements IChatService
{
    public function __construct(
        private IChatRepository $repository
    ) {}

    public function saveUserMsg(string $prompt, string $userId): ChatMessageData
    {
        $msg = $this->repository->create([
            'user_id' => $userId,
            'role' => 'user',
            'content' => $prompt
        ]);

        return ChatMessageData::from($msg);
    }
}
