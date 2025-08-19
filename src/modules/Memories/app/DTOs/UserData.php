<?php

namespace Modules\Memories\DTOs;

use App\Models\User;
use Carbon\Carbon;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Attributes\MapName;
use Spatie\LaravelData\Mappers\SnakeCaseMapper;

#[MapName(SnakeCaseMapper::class)]
class UserData extends Data
{
    public function __construct(
        public readonly string $id,
        public readonly ?string $username,
        public readonly ?string $fullname,
        public readonly ?string $email,
        public readonly ?string $avatarUrl,
        public readonly ?Carbon $birthDate,
    ) {
    }

    public static function fromModel(User $user): self
    {
        return new self(
            id: $user->id,
            username: $user->username,
            fullname: $user->name,
            email: $user->email,
            avatarUrl: $user->getFirstMediaUrl('avatars', 'thumb'),
            // avatarUrl: $user->avatar_url,
            birthDate: $user->birth_date
        );
    }
}
