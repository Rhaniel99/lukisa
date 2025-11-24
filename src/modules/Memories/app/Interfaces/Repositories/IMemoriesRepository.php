<?php

namespace Modules\Memories\Interfaces\Repositories;

use App\Models\User;
use Illuminate\Database\Eloquent\Collection;
use Modules\Memories\Models\Memorie;
use Modules\Memories\DTOs\StoreMemoryData;
use Modules\Memories\Models\Place;

interface IMemoriesRepository {

    public function findOrCreatePlace(float $latitude, float $longitude): Place;

    public function createMemory(StoreMemoryData $data, string $placeId, string $userId): Memorie;

    public function getForPlace(string $placeId, ?User $viewer): Collection;
}
