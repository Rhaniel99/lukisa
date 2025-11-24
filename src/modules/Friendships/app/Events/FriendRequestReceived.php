<?php

namespace Modules\Friendships\Events;

use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class FriendRequestReceived implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    /**
     * @param string $userId O ID do usuário que RECEBEU o pedido
     * @param int $count A nova contagem total de pendentes
     */
    public function __construct(
        public string $userId,
        public int $count
    ) {}

    public function broadcastOn(): array
    {
        // Usa o canal privado do usuário (padrão do Laravel para notificações)
        return [
            new PrivateChannel('App.Models.User.' . $this->userId),
        ];
    }

    public function broadcastAs(): string
    {
        return 'friend.request.received';
    }

    public function broadcastWith(): array
    {
        return [
            'count' => $this->count,
        ];
    }
}