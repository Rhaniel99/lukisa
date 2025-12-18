<?php

namespace Modules\Memories\Policies;

use App\Models\User;
use Modules\Memories\Models\Memorie;

class MemoriePolicy
{
    /**
     * Determina se o usuário pode VER a memória.
     */
    public function view(?User $user, Memorie $memory): bool
    {
        // Visitante: só público
        if (!$user) {
            return $memory->user->privacy === 'public';
        }

        // Dono sempre vê
        if ($user->id === $memory->user_id) {
            return true;
        }

        // Público
        if ($memory->user->privacy === 'public') {
            return true;
        }

        // Amigos
        if ($memory->user->privacy === 'friends') {
            return $user->isFriendsWith($memory->user_id);
        }

        return false;
    }
}
