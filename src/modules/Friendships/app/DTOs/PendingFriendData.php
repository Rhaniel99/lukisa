<?php

namespace Modules\Friendships\DTOs;

use Modules\Friendships\Models\Friendship;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Attributes\MapName;
use Spatie\LaravelData\Mappers\SnakeCaseMapper;

#[MapName(SnakeCaseMapper::class)]
class PendingFriendData extends Data
{
    public function __construct(
        public readonly string $friendship_id,
        public readonly string $id,
        public readonly string $username,
        public readonly string $discriminator,
        public readonly ?string $avatar_url,
    ) {
    }

    public static function fromModel(Friendship $friendship): self
    {
        $sender = $friendship->sender;
        
        return new self(
            friendship_id: $friendship->id,
            id: $sender->id,
            username: $sender->username,
            discriminator: $sender->discriminator,
            avatar_url: $sender->getFirstMedia('avatars')?->getTemporaryUrl(now()->addMinutes(5), 'thumb'),
        );
    }
}
