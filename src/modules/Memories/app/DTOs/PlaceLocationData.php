<?php

namespace Modules\Memories\DTOs;

use Spatie\LaravelData\Attributes\Validation\Between;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Attributes\Validation\Required;
use Spatie\LaravelData\Attributes\Validation\StringType;
use Spatie\LaravelData\Attributes\Validation\Numeric;
use Spatie\LaravelData\Attributes\Validation\Max;

class PlaceLocationData extends Data
{
    public function __construct(
        #[Required, Numeric, Between(-90, 90)]
        public readonly float $latitude,

        #[Required, Numeric, Between(-180, 180)]
        public readonly float $longitude,

        #[Required, StringType, Max(255)]
        public readonly string $name
    ) {}
}
