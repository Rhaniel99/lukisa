<?php

namespace Modules\Memories\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use App\Models\User;
use Modules\Memories\Models\Memorie;

class MemoryInteracted extends Notification
{
    use Queueable;

    public function __construct(
        public User $actor,
        public Memorie $memory,
        public string $action // 'like' | 'comment'
    ) {}

    public function via($notifiable): array
    {
        return ['database', 'broadcast'];
    }

    protected function message(): string
    {
        return match ($this->action) {
            'comment' => "{$this->actor->username} comentou sua memória.",
            default   => "{$this->actor->username} curtiu sua memória.",
        };
    }

    /**
     * 📦 Persistência (dropdown)
     */
    public function toDatabase($notifiable): array
    {
        return [
            'type'      => $this->action,
            'message'   => $this->message(),
            'actor_id'  => $this->actor->id,
            'actor_name'=> $this->actor->username,
            'memory_id' => $this->memory->id,
            'link'      => route('memo.maps.index', [
                'memory_id' => $this->memory->id,
                'place_id'  => $this->memory->place_id,
            ]),
        ];
    }

    /**
     * 🔔 Broadcast (toast)
     */
    public function toBroadcast($notifiable): array
    {
        return [
            'data' => [
                'type'             => $this->action,
                'actor_name'       => $this->actor->username,
                'actor_avatar'     => $this->actor->getPublicAvatarUrl(),
                'memory_thumbnail' => $this->memory->getPublicThumbnailUrl(),
                'link'             => route('memo.maps.index', [
                    'memory_id' => $this->memory->id,
                    'place_id'  => $this->memory->place_id,
                ]),
            ],
        ];
    }
}
