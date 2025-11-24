<?php

namespace Modules\Memories\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use App\Models\User;
use Modules\Memories\Models\Memorie;

class MemoryLiked extends Notification
{
    use Queueable;

    public function __construct(
        public User $actor,
        public Memorie $memory
    ) {}

    public function via($notifiable): array
    {
        return ['database', 'broadcast'];
    }

    /**
     * Dados persistentes para o Banco de Dados.
     * NÃO salvamos a URL aqui para não expirar.
     */
    public function toDatabase($notifiable): array
    {
        return [
            'type' => 'like',
            'message' => "{$this->actor->username} curtiu sua memória.",
            'actor_id' => $this->actor->id, // Importante: Salvamos o ID para buscar depois
            'actor_name' => $this->actor->name,
            // 'actor_avatar' => NÃO salvamos aqui
            'memory_id' => $this->memory->id,
            'link' => route('memo.maps.index', ['memory_id' => $this->memory->id]),
        ];
    }

    /**
     * Dados efêmeros para o Broadcast (Reverb/Toast).
     * Aqui geramos a URL temporária pois será exibida na hora.
     */
    public function toBroadcast($notifiable): array
    {
        return [
            'data' => [
                'type' => 'like',
                'message' => "{$this->actor->username} curtiu sua memória.",
                'actor_name' => $this->actor->name,
                'actor_avatar' => $this->actor->getFirstMedia('avatars')?->getTemporaryUrl(now()->addMinutes(30), 'thumb'),
                'link' => route('memo.maps.index', ['memory_id' => $this->memory->id]),
            ]
        ];
    }
}