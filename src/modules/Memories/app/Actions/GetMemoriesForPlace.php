<?php

namespace Modules\Memories\Actions;

use App\Models\User;
use Modules\Memories\Interfaces\Repositories\IMemoriesRepository;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Gate;
use Modules\Memories\DTOs\MemoryListItemData;

class GetMemoriesForPlace
{
    public function __construct(
        protected IMemoriesRepository $repository
    ) {}

    public function __invoke(string $placeId, ?User $viewer): Collection
    {
        $memories = $this->repository->getForPlace($placeId);

        return MemoryListItemData::collect(
            $memories->filter(
                fn($memory) => Gate::forUser($viewer)->allows('view', $memory)
            )
        );
    }
}
