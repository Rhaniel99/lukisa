<?php

namespace Modules\Memories\Repositories;

use App\Models\User;
use App\Repositories\Base\CoreRepository;
use Illuminate\Database\Eloquent\Collection;
use Modules\Memories\Interfaces\Repositories\IPlaceRepository;
use Modules\Memories\Models\Place;

class PlaceRepository extends CoreRepository implements IPlaceRepository
{
    /**
     * @var Place
     */
    protected $model;

    public function __construct(Place $model)
    {
        parent::__construct($model);
    }

    public function findOrCreateByCoordinates(float $lat, float $lng, string $name): Place
    {
        return $this->model->firstOrCreate(
            [
                'latitude' => $lat,
                'longitude' => $lng
            ],
            [
                'name' => $name
            ]
        );
    }

    public function getAllPins(): Collection
    {
        return $this->model
            ->select(['id', 'name', 'latitude', 'longitude'])
            ->with('memories.user') // necessário para a Policy
            ->get();
    }

    // * Otimizado para pins
    public function getVisiblePinsFor(?User $viewer): Collection
    {
        return $this->model
            ->select(['id', 'name', 'latitude', 'longitude'])
            ->whereHas(
                'memories',
                fn($q) =>
                $q->visibleTo($viewer)
            )
            ->get();
    }
}
