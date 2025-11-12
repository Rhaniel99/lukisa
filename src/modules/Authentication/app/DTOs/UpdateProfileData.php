<?php

namespace Modules\Authentication\DTOs;

use Illuminate\Http\UploadedFile;
use Spatie\LaravelData\Attributes\Validation\File;
use Spatie\LaravelData\Attributes\Validation\IntegerType;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Attributes\Validation\Max;
use Spatie\LaravelData\Attributes\Validation\Mimes;
use Spatie\LaravelData\Attributes\Validation\Nullable;
use Spatie\LaravelData\Attributes\Validation\StringType;

class UpdateProfileData extends Data
{
    public function __construct(
        #[Nullable, StringType, Max(255)]
        public ?string $fullname,
        
        #[Nullable, StringType, Max(255)]
        public ?string $username,

        #[Nullable, File, Mimes('jpg', 'jpeg', 'png', 'webp'), Max(10240)] // 10MB
        public ?UploadedFile $avatar,

        #[Nullable, IntegerType]
        public ?int $media_id,
    ) {}

    /**
     * Retorna apenas os campos enviados (não nulos)
     */
    public function toArray(): array
    {
        return array_filter([
            'fullname' => $this->fullname,
            'username' => $this->username,
        ], fn($value) => !is_null($value));
    }
}
