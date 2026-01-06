<?php

namespace Modules\Phamani\Interfaces\Repositories;

use App\Interfaces\Repositories\ICoreRepository;

interface IAccountRepository extends ICoreRepository
{
    public function applyTransaction(string $accountId, float $amount, string $type): void;
}
