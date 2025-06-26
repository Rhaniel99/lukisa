<?php

namespace Modules\Authentication\DTOs;

use Spatie\LaravelData\Attributes\Validation\File;
use Spatie\LaravelData\Attributes\Validation\Max;
use Spatie\LaravelData\Attributes\Validation\Mimes;
use Spatie\LaravelData\Attributes\Validation\Required;
use Spatie\LaravelData\Attributes\Validation\StringType;
use Illuminate\Http\UploadedFile;
use Spatie\LaravelData\Data;

class UpdateProfileData extends Data
{
    public function __construct(
        #[Required, StringType, Max(255)]
        public string $username,

        #[Required, File, Mimes('jpg', 'jpeg', 'png', 'webp'), Max(10240)] // 10MB
        public UploadedFile $avatar,
    ) {
    }
}
