<?php

namespace Modules\Phamani\Interfaces\Services;

use Modules\Phamani\DTOs\Transaction\StoreTransactionData;

/**
 * Interface ITransactionService
 * @package Modules\Phamani\Interfaces\Services
 */
interface ITransactionService
{
    public function create(StoreTransactionData $dto);
}
