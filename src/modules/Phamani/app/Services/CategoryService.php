<?php

namespace Modules\Phamani\Services;

use Modules\Phamani\Interfaces\Repositories\ICategoryRepository;
use Modules\Phamani\Interfaces\Services\ICategoryService;
use Illuminate\Support\Collection;

class CategoryService implements ICategoryService
{

    public function __construct(
        protected ICategoryRepository $repository
    ) {}


    public function listForUser(string $userId): Collection
    {
        return $this->repository
            ->query()
            ->whereNull('user_id')
            ->orWhere('user_id', $userId)
            ->orderBy('name')
            ->get(['id', 'name', 'type', 'color', 'icon']);
    }
}
