<?php

namespace Modules\Memories\Interfaces\Services;

use Modules\Memories\DTOs\PlaceLocationData;
use Modules\Memories\Models\Place;

/**
 * Interface IPlaceService
 * @package Modules\Memories\Interfaces\Services
 */
interface IPlaceService
{
    public function save(PlaceLocationData $data): Place;
}
