<?php

namespace Modules\Memories\Interfaces\Repositories;

use App\Models\User;
use Illuminate\Support\Collection;
use Modules\Memories\Models\Memorie;

interface IMemoriesRepository
{
    public function createMemory(
        string $title,
        string $content,
        string $placeId,
        string $userId
    ): Memorie;

    public function getForPlace(string $placeId): Collection;

    public function getDetailsWithComments(
        string $memoryId,
        int $commentsPage = 1,
        int $perPage = 3
    ): array;

    // public function isVisibleTo(Memorie $memory, ?User $viewer): bool;
}
