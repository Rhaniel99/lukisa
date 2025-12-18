<?php

namespace Modules\Memories\Interfaces\Repositories;

use App\Interfaces\Repositories\ICoreRepository;
use App\Models\User;
use Illuminate\Database\Eloquent\Collection;
use Modules\Memories\Models\Place;

interface IPlaceRepository extends ICoreRepository
{
    public function findOrCreateByCoordinates(float $lat, float $lng, string $name): Place;
    public function getAllPins(): Collection;
    public function getVisiblePinsFor(?User $viewer): Collection;
}