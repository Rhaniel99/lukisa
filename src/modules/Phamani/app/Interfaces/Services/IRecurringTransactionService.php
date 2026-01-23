<?php

namespace Modules\Phamani\Interfaces\Services;

use Modules\Phamani\DTOs\Transaction\StoreTransactionData;
use Modules\Phamani\Models\RecurringTransaction;

/**
 * Interface IRecurringTransactionService
 * @package Modules\Phamani\Interfaces\Services
 */
interface IRecurringTransactionService {
    public function createRecurringTransaction(StoreTransactionData $dto): RecurringTransaction;
}
