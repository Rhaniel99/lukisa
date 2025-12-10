<?php

namespace Modules\Marvin\Interfaces\Repositories;

use App\Interfaces\Repositories\ICoreRepository;
use Illuminate\Database\Eloquent\Collection;

interface IChatRepository extends ICoreRepository
{
    public function getRecentByUser(string $userId, int $limit = 6): Collection;
}