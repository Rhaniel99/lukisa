<?php

namespace Modules\Phamani\Interfaces\Repositories;

use App\Interfaces\Repositories\ICoreRepository;
use Illuminate\Support\Collection;

interface ITransactionRepository extends ICoreRepository
{
    public function getLatestForUser(
        string $userId,
        int $limit = 5
    ): Collection;
}
