<?php

namespace Modules\Memories\Interfaces\Repositories;

use App\Models\User;
use Illuminate\Database\Eloquent\Collection;
use Modules\Memories\Models\Memorie;

interface IMemoriesRepository
{
    public function createMemory(
        string $title,
        string $content,
        string $placeId,
        string $userId
    ): Memorie;

    public function getForPlace(string $placeId, ?User $viewer): Collection;
}
