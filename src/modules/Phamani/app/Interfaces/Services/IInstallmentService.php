<?php

namespace Modules\Phamani\Interfaces\Services;

use Modules\Phamani\DTOs\Transaction\StoreTransactionData;
use Modules\Phamani\Models\Installment;

/**
 * Interface IInstallmentService
 * @package Modules\Phamani\Interfaces\Services
 */
interface IInstallmentService {
    public function createFromTransaction(StoreTransactionData $dto): Installment;
}
