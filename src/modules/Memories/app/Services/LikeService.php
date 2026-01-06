<?php

namespace Modules\Memories\Services;

use App\Models\User;
use Modules\Memories\Events\MemoryLikeUpdated;
use Modules\Memories\Interfaces\Services\ILikeService;
use Modules\Memories\Models\Memorie;
use Modules\Memories\Notifications\MemoryInteracted;

class LikeService implements ILikeService
{
    public function like(User $actor, Memorie $memory): void
    {
        if ($memory->likes()->where('user_id', $actor->id)->exists()) {
            return;
        }

        $memory->likes()->attach($actor->id);

        if ($memory->user_id !== $actor->id) {
            $memory->user->notify(
                new MemoryInteracted(
                    actor: $actor,
                    memory: $memory,
                    action: 'like'
                )
            );
        }

        broadcast(new MemoryLikeUpdated($memory->fresh()));
    }

    public function unlike(User $actor, Memorie $memory): void
    {
        $memory->likes()->detach($actor->id);

        broadcast(new MemoryLikeUpdated($memory->fresh()));
    }
}
