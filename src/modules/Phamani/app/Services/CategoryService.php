<?php

namespace Modules\Phamani\Services;

use Modules\Phamani\Interfaces\Repositories\ICategoryRepository;
use Modules\Phamani\Interfaces\Services\ICategoryService;
use Illuminate\Support\Collection;
use Modules\Phamani\DTOs\Category\StoreCategoryData;

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

    public function create(string $userId, StoreCategoryData $dto)
    {
        return $this->repository->create([
            'user_id'    => $userId,
            'parent_id'  => $dto->parent_id,
            'name'       => $dto->name,
            'type'       => $dto->type,
            'color'      => $dto->color,
            'icon'       => $dto->icon,
            'is_default' => false,
        ]);
    }
}
