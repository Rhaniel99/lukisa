<?php

namespace Modules\Memories\DTOs;

use Illuminate\Http\UploadedFile;
use Spatie\LaravelData\Attributes\Validation\File;
use Spatie\LaravelData\Attributes\Validation\Max;
use Spatie\LaravelData\Attributes\Validation\Mimes;
use Spatie\LaravelData\Attributes\Validation\Numeric;
use Spatie\LaravelData\Attributes\Validation\Required;
use Spatie\LaravelData\Attributes\Validation\StringType;
use Spatie\LaravelData\Data;

class StoreMemoryData extends Data
{
    public function __construct(
        #[Required, StringType, Max(255)]
        public readonly string $title,

        #[Required, StringType, Max(255)]
        public readonly string $place_name,

        #[Required, StringType]
        public readonly string $content,

        #[Required, Numeric]
        public readonly float $latitude,

        #[Required, Numeric]
        public readonly float $longitude,

        // O campo pode ser nulo (nullable), mas se enviado, deve ser um arquivo válido.
        #[Required, File, Mimes('jpg', 'jpeg', 'png', 'webp', 'mp3', 'wav'), Max(10240)] // 10MB max
        public readonly UploadedFile $media,
    ) {}
}
