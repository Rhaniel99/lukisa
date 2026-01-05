<?php

namespace Modules\Memories\Events;

use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Queue\SerializesModels;

class MemoryInteracted implements ShouldBroadcast
{
    use SerializesModels;

    public function __construct(
        public string $targetUserId,
        public string $actorName,
        public ?string $actorAvatar,
        public string $action  // 'like' | 'comment'
    ) {}

    public function broadcastAs(): string
    {
        return 'memory.notification';
    }

    public function broadcastOn(): array
    {
        return [
            new PrivateChannel("user.notifications.{$this->targetUserId}")
        ];
    }

    public function broadcastWith(): array
    {
        return [
            'userName' => $this->actorName,
            'avatarUrl' => $this->actorAvatar,
            'actionType' => $this->action,
        ];
    }
}
