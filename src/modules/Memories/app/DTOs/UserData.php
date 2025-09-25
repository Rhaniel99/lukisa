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
        // 1. Primeiro, pegamos o objeto de mídia (o "crachá")
        $avatarMedia = $user->getFirstMedia('avatars');

        // // 2. Verificamos se o crachá existe. Se sim, geramos a URL a partir DELE.
        $temporaryAvatarUrl = $avatarMedia
            ? $avatarMedia->getTemporaryUrl(now()->addMinutes(5), 'thumb')
            : null;

        return new self(
            id: $user->id,
            username: $user->username,
            fullname: $user->name,
            email: $user->email,
            avatarUrl: $temporaryAvatarUrl,
            birthDate: $user->birth_date
        );
    }
}
