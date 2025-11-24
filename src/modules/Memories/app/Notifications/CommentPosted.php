<?php

namespace Modules\Memories\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use App\Models\User;
use Modules\Memories\Models\Memorie;

class CommentPosted extends Notification
{
    use Queueable;

    public function __construct(
        public User $actor, // Quem curtiu
        public Memorie $memory // Qual memória
    ) {}

    public function via($notifiable): array
    {
        return ['database', 'broadcast']; // Salva no banco e envia via Reverb
    }

    public function toArray($notifiable): array
    {
        return [
            'type' => 'comment',
            'message' => "{$this->actor->username} comentou na sua memória.",
            'actor_id' => $this->actor->id,
            'actor_name' => $this->actor->name,
            'actor_avatar' => $this->actor->getFirstMediaUrl('avatars', 'thumb'),
            'memory_id' => $this->memory->id,
            'link' => route('memo.maps.index', ['memory_id' => $this->memory->id]), // Link para abrir no mapa
        ];
    }
}