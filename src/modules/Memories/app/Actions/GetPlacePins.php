<?php

namespace Modules\Memories\Actions;

use App\Models\User;
use Modules\Memories\Interfaces\Repositories\IPlaceRepository;
use Illuminate\Support\Collection;

class GetPlacePins
{
    public function __construct(
        protected IPlaceRepository $placeRepository
    ) {}

    public function __invoke(?User $viewer): Collection
    {
        return $this->placeRepository->getVisiblePinsFor($viewer);
    }
}
