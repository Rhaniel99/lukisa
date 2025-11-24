<?php

namespace Modules\Memories\DTOs;

use App\Models\User;
use Carbon\Carbon;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Lazy; // <-- Importante
use Spatie\LaravelData\Attributes\MapName;
use Spatie\LaravelData\Mappers\SnakeCaseMapper;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

#[MapName(SnakeCaseMapper::class)]
class UserData extends Data
{
    public function __construct(
        public readonly string $id,
        public readonly ?string $username,
        public readonly ?string $discriminator,
        public readonly ?string $avatarUrl,

        // Propriedades "Preguiçosas" (Lazy) : Elas não serão enviadas a menos que explicitamente solicitadas
        public readonly Lazy|string|null $fullname,
        public readonly Lazy|string|null $email,
        public readonly Lazy|Carbon|null $birthDate,
        public readonly Lazy|bool|null $privacy,
        public readonly Lazy|bool|null $allowFriendRequests,
        public readonly Lazy|array $avatarHistory,
    ) {}

    public static function fromModel(User $user): self
    {
        return new self(
            id: $user->id,
            username: $user->username,
            discriminator: $user->discriminator,
            avatarUrl: $user->getPublicAvatarUrl(),
            fullname: Lazy::create(fn() => $user->name),
            email: Lazy::create(fn() => $user->email),
            birthDate: Lazy::create(fn() => $user->birth_date),
            privacy: Lazy::create(fn() => $user->privacy),
            allowFriendRequests: Lazy::create(fn() => $user->allow_friend_requests),

            // A lógica do histórico permanece aqui, pois é específica da transformação
            avatarHistory: Lazy::create(function() use ($user) {
                $avatars = $user->getMedia('avatars')->sortByDesc('created_at');
                return $avatars->slice(1, 5)
                    ->map(function (Media $media) {
                        $cacheBuster = $media->updated_at->timestamp;
                        return [
                            'id' => $media->id,
                            'url' => route('media.avatar', [
                                'media' => $media->id,
                                'v' => $cacheBuster
                            ]),
                        ];
                    })
                    ->values()
                    ->toArray();
            })
        );
    }
}