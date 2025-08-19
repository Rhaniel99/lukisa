<?php

namespace Modules\Memories\Repositories;

use Modules\Memories\DTOs\StoreMemoryData;
use Modules\Memories\Interfaces\Repositories\IMemoriesRepository;
use Modules\Memories\Models\Memorie;
use Modules\Memories\Models\Place;

class MemoriesRepository implements IMemoriesRepository
{
    /**
     * {@inheritdoc}
     */
    public function findOrCreatePlace(float $latitude, float $longitude): Place
    {
        return Place::firstOrCreate(
            ['latitude' => $latitude, 'longitude' => $longitude]
        );
    }

    /**
     * {@inheritdoc}
     */
    public function createMemory(StoreMemoryData $data, string $placeId, string $userId): Memorie
    {
        return Memorie::create([
            'title' => $data->title,
            'content' => $data->content,
            'place_id' => $placeId,
            'user_id' => $userId,
        ]);
    }
}
