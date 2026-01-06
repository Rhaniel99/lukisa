<?php

namespace Modules\Memories\Interfaces\Services;

use App\Models\User;
use Modules\Memories\Models\Memorie;

/**
 * Interface ILikeService
 * @package Modules\Memories\Interfaces\Services
 */
interface ILikeService
{
    public function like(User $actor, Memorie $memory): void;
    public function unlike(User $actor, Memorie $memory): void;
}
