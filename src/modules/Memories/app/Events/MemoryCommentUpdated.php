<?php

namespace Modules\Memories\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Queue\SerializesModels;

class MemoryCommentUpdated implements ShouldBroadcast
{
    use SerializesModels;

    public function __construct(
        public string $memoryId,
        public int $commentsCount
    ) {}

    public function broadcastAs(): string
    {
        return 'memory.comments.updated';
    }

    public function broadcastOn(): array
    {
        return [
            new Channel('memories.' . $this->memoryId),
        ];
    }

    public function broadcastWith(): array
    {
        return [
            'id' => $this->memoryId,
            'commentsCount' => $this->commentsCount,
        ];
    }
}

