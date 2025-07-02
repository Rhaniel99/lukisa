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

    public int $memoryId;
    public int $likesCount;

    /**
     * O construtor agora extrai os dados e busca a contagem mais recente.
     */
    public function __construct(Memorie $memory)
    {
        $this->memoryId = $memory->id;
        // ✅ Busca a contagem diretamente da relação, garantindo o valor mais recente.
        $this->likesCount = $memory->likes()->count();
    }

    public function broadcastAs(): string
    {
        return 'memory.like.updated';
    }

    public function broadcastOn(): array
    {
        return [
            // Usa a propriedade que armazenamos.
            new Channel('memories.' . $this->memoryId),
        ];
    }

    /**
     * Define o payload do evento.
     * O Laravel irá serializar automaticamente as propriedades públicas desta classe.
     * Podemos deixar este método explícito para clareza.
     */
    public function broadcastWith(): array
    {
        return [
            'id' => $this->memoryId,
            'likesCount' => $this->likesCount,
        ];
    }
}
