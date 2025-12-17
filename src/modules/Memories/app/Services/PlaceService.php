<?php

namespace Modules\Memories\Services;

use Modules\Memories\DTOs\PlaceLocationData;
use Modules\Memories\Interfaces\Repositories\IPlaceRepository;
use Modules\Memories\Interfaces\Services\IPlaceService;
use Modules\Memories\Models\Place;

class PlaceService implements IPlaceService
{
    public function __construct(
        protected IPlaceRepository $repository
    ) {}

    public function save(PlaceLocationData $data): Place
    {
        return $this->repository->findOrCreateByCoordinates(
            $data->latitude,
            $data->longitude,
            $data->name
        );
    }
}
