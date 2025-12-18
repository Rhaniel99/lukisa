<?php

namespace Modules\Memories\Actions;

use App\Models\User;
use Illuminate\Support\Facades\Gate;
use Modules\Memories\Interfaces\Repositories\IMemoriesRepository;
use Modules\Memories\DTOs\MemoryDetailsData;

class GetMemoryDetails
{
    public function __construct(
        protected IMemoriesRepository $repository
    ) {}

    public function __invoke(
        string $memoryId,
        ?User $viewer,
        int $commentsPage = 1
    ): MemoryDetailsData {
        $result = $this->repository->getDetailsWithComments(
            $memoryId,
            $commentsPage
        );

        $memory   = $result['memory'];
        $comments = $result['comments'];

        Gate::forUser($viewer)->authorize('view', $memory);

        return MemoryDetailsData::fromModel($memory, $comments, $viewer);
    }
}
