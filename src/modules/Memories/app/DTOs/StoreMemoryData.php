<?php

namespace Modules\Memories\DTOs;

use Illuminate\Http\UploadedFile;
use Spatie\LaravelData\Attributes\Validation\File;
use Spatie\LaravelData\Attributes\Validation\Max;
use Spatie\LaravelData\Attributes\Validation\Mimes;
use Spatie\LaravelData\Attributes\Validation\Numeric;
use Spatie\LaravelData\Attributes\Validation\Required;
use Spatie\LaravelData\Attributes\Validation\StringType;
use Spatie\LaravelData\Attributes\Validation\Between;
use Spatie\LaravelData\Data;

class StoreMemoryData extends Data
{
    public function __construct(
        #[Required, StringType, Max(255)]
        public readonly string $title,

        // Mantemos os campos "planos" aqui para validar o Request do Front
        #[Required, StringType, Max(255)]
        public readonly string $place_name,

        #[Required, StringType]
        public readonly string $content,

        #[Required, Numeric, Between(-90, 90)]
        public readonly float $latitude,

        #[Required, Numeric, Between(-180, 180)]
        public readonly float $longitude,

        #[Required, File, Mimes('jpg', 'jpeg', 'png', 'webp', 'mp3', 'wav'), Max(10240)]
        public readonly UploadedFile $media,
    ) {}

    /**
     * Helper para extrair apenas os dados de localização.
     * Isso transforma os dados planos deste DTO no objeto PlaceLocationData.
     */
    public function getLocationData(): PlaceLocationData
    {
        return new PlaceLocationData(
            latitude: $this->latitude,
            longitude: $this->longitude,
            name: $this->place_name // Mapeamos place_name para name
        );
    }
}