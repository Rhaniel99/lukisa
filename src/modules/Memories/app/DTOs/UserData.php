<?php

namespace Modules\Memories\DTOs;

use App\Models\User;
use Spatie\LaravelData\Data;

class UserData extends Data
{
    public function __construct(
        public readonly int $id,
        public readonly string $name,
        public readonly ?string $avatar,
    ) {
    }

    // Opcional: Adicionar um método "from" para facilitar a criação
    public static function fromModel(User $user): self
    {
        // $avatarUrl = $user->getFirstTemporaryUrl(now()->addMinutes(15), 'avatar');
        return new self(
            id: $user->id,
            name: $user->username,
            avatar: $user->avatar_url
        );
    }
}
