<?php

namespace Modules\Memories\DTOs;

use Modules\Memories\Models\Place;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Attributes\Validation\Required;
use Spatie\LaravelData\Attributes\Validation\StringType;
use Spatie\LaravelData\Attributes\Validation\Exists;
use Spatie\LaravelData\Attributes\FromRouteParameter;
use Spatie\LaravelData\Attributes\Validation\Max;

class StoreCommentData extends Data
{
    public function __construct(
        #[Required, StringType, Max(1000)]
        public readonly string $content,

        #[FromRouteParameter('memory')]
        public readonly string $memory_id,

        // Nullable e Opcional
        #[Exists(Place::class, 'id')]
        public readonly ?string $place_id = null
    ) {}
}
