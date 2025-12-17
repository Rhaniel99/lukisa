<?php

namespace Modules\Memories\Interfaces\Repositories;

use App\Interfaces\Repositories\ICoreRepository;
use Modules\Memories\Models\Place;

interface IPlaceRepository extends ICoreRepository
{
    public function findOrCreateByCoordinates(float $lat, float $lng, string $name): Place;
}