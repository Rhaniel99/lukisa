<?php

namespace Modules\Phamani\Interfaces\Services;

use Illuminate\Support\Collection;

/**
 * Interface ICategoryService
 * @package Modules\Phamani\Interfaces\Services
 */
interface ICategoryService
{
    public function listForUser(string $userId): Collection;
}
