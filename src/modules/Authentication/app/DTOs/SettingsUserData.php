<?php

namespace Modules\Authentication\DTOs;

use App\Models\User;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Attributes\MapName;
use Spatie\LaravelData\Mappers\SnakeCaseMapper;

#[MapName(SnakeCaseMapper::class)]
class SettingsUserData extends Data
{
    public function __construct(
        public readonly int $id,
        public readonly string $name,
        public readonly string $username,
        public readonly ?string $email,
        public readonly ?string $avatar_url,
    ) {
    }

    public static function fromModel(User $user): self
    {
        return new self(
            id: $user->id,
            name: $user->name,
            username: $user->username,
            email: $user->email,
            avatar_url: $user->avatar_url,
        );
    }
}
