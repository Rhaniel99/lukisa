<?php

namespace Modules\Memories\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Queue\SerializesModels;
use Modules\Memories\Models\Memorie;

class MemoryLikeUpdated implements ShouldBroadcast
{
    use SerializesModels, InteractsWithSockets;

    public Memorie $memory;

    public function __construct(Memorie $memory)
    {
        $this->memory = $memory->load('likes:id'); // Carrega apenas os IDs dos likes
    }

    public function broadcastAs(): string
    {
        return 'memory.like.updated';
    }

    public function broadcastOn(): array
    {
        return [
            new Channel('memories.' . $this->memory->id),
        ];
    }

    public function broadcastWith(): array
    {
        return [
            'id' => $this->memory->id,
            'likesCount' => $this->memory->likes->count(),
            'likers' => $this->memory->likes->pluck('id')->all(),
        ];
    }
}
