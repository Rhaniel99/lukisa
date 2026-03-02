<?php

namespace Modules\Phamani\Interfaces\Repositories;

use App\Interfaces\Repositories\ICoreRepository;

interface ITagRepository extends ICoreRepository
{
    /** @return array<int, string|int> IDs das tags */
    public function getOrCreateIdsForUser(string|int $userId, array $names): array;
}