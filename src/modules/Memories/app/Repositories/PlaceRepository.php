<?php

namespace Modules\Memories\Repositories;

use App\Repositories\Base\CoreRepository;
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
}
