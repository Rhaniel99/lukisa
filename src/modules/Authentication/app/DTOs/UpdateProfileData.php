<?php

namespace Modules\Authentication\DTOs;

use Illuminate\Http\UploadedFile;
use Spatie\LaravelData\Attributes\Validation\BooleanType;
use Spatie\LaravelData\Attributes\Validation\Confirmed;
use Spatie\LaravelData\Attributes\Validation\Email;
use Spatie\LaravelData\Attributes\Validation\File;
use Spatie\LaravelData\Attributes\Validation\In;
use Spatie\LaravelData\Attributes\Validation\IntegerType;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Attributes\Validation\Max;
use Spatie\LaravelData\Attributes\Validation\Mimes;
use Spatie\LaravelData\Attributes\Validation\Min;
use Spatie\LaravelData\Attributes\Validation\Nullable;
use Spatie\LaravelData\Attributes\Validation\StringType;

class UpdateProfileData extends Data
{
    public function __construct(
        #[Nullable, StringType, Max(255)]
        public ?string $fullname,

        #[Nullable, StringType, Email(), Max(255)]
        public ?string $email,

        #[Nullable, StringType, Min(8), Confirmed]
        public ?string $password,

        public ?string $password_confirmation,
        
        #[Nullable, StringType, Max(255)]
        public ?string $username,

        #[Nullable, File, Mimes('jpg', 'jpeg', 'png', 'webp'), Max(10240)] // 10MB
        public ?UploadedFile $avatar,

        #[Nullable, IntegerType]
        public ?int $media_id,

        #[Nullable, In(['public', 'friends', 'private'])]
        public ?string $privacy,

        #[Nullable, BooleanType]
        public ?bool $allow_friend_requests
    ) {}

    /**
     * Retorna apenas os campos enviados (não nulos)
     */
    public function toArray(): array
    {
        return array_filter([
            'fullname' => $this->fullname,
            'username' => $this->username,
            'email'    => $this->email,
            'password' => $this->password,
            'privacy' => $this->privacy,
            'allow_friend_requests' => $this->allow_friend_requests,
        ], fn($value) => !is_null($value));
    }
}
