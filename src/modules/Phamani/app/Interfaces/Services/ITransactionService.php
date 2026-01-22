<?php

namespace Modules\Phamani\Interfaces\Services;

use Illuminate\Support\Collection;
use Modules\Phamani\DTOs\Transaction\StoreTransactionData;

/**
 * Interface ITransactionService
 * @package Modules\Phamani\Interfaces\Services
 */
interface ITransactionService
{
    public function create(StoreTransactionData $dto);
    public function getRecentForDashboard(
        string $userId,
        int $limit = 5
    ): Collection;
}
