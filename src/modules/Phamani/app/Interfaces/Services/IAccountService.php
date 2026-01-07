<?php

namespace Modules\Phamani\Interfaces\Services;

use Illuminate\Database\Eloquent\Collection;

/**
 * Interface IAccountService
 * @package Modules\Phamani\Interfaces\Services
 */
interface IAccountService
{
    public function listForUser(string $userId): Collection;
}
