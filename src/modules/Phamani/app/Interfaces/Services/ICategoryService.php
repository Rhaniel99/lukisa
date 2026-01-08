<?php

namespace Modules\Phamani\Interfaces\Services;

use Illuminate\Support\Collection;
use Modules\Phamani\DTOs\Category\StoreCategoryData;

/**
 * Interface ICategoryService
 * @package Modules\Phamani\Interfaces\Services
 */
interface ICategoryService
{
    public function create(string $userId, StoreCategoryData $dto);
    public function listForUser(string $userId): Collection;
}
