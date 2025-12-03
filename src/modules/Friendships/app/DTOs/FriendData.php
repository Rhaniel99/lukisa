<?php

namespace Modules\Friendships\DTOs;

use App\Models\User;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Attributes\MapName;
use Spatie\LaravelData\Mappers\SnakeCaseMapper;

#[MapName(SnakeCaseMapper::class)]
class FriendData extends Data
{
    public function __construct(
        public readonly string $id,
        public readonly string $username,
        public readonly string $discriminator,
        public readonly ?string $avatar_url,
        public readonly string $status,
    ) {
    }

    public static function fromModel(User $user, string $status = 'online'): self
    {
        return new self(
            id: $user->id,
            username: $user->username,
            discriminator: $user->discriminator,
            avatar_url: $user->getPublicAvatarUrl(),
            status: $status
        );
    }
}
