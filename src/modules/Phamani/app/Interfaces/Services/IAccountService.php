<?php

namespace Modules\Phamani\Interfaces\Services;

use Illuminate\Database\Eloquent\Collection;
use Modules\Phamani\DTOs\Account\StoreAccountData;

/**
 * Interface IAccountService
 * @package Modules\Phamani\Interfaces\Services
 */
interface IAccountService
{
    public function listForUser(string $userId): Collection;
    public function create(string $userId, StoreAccountData $dto);
}
