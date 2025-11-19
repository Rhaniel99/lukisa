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

        // Propriedades "Preguiçosas" (Lazy)
        // Elas não serão enviadas a menos que explicitamente solicitadas
        public readonly Lazy|string|null $fullname,
        public readonly Lazy|string|null $email,
        public readonly Lazy|Carbon|null $birthDate,
        public readonly Lazy|bool|null $privacy,
        public readonly Lazy|array $avatarHistory,
    ) {}

    public static function fromModel(User $user): self
    {
        // 1. Pega a coleção de avatares ordenada pela data de criação
        $avatars = $user->getMedia('avatars')->sortByDesc('created_at');

        // 2. O avatar atual é o primeiro da coleção ordenada
        $currentAvatar = $avatars->first();
        $currentUrl = $currentAvatar?->getTemporaryUrl(now()->addMinutes(5), 'thumb');

        return new self(
            id: $user->id,
            username: $user->username,
            discriminator: $user->discriminator,
            avatarUrl: $currentUrl,

            // 2. Campos simples, mas que você quer esconder do payload global 'auth.user'
            fullname: Lazy::create(fn() => $user->name),
            email: Lazy::create(fn() => $user->email),
            birthDate: Lazy::create(fn() => $user->birth_date),
            privacy: Lazy::create(fn() => $user->privacy),

            // 3. O histórico são os avatares restantes na coleção já ordenada
            avatarHistory: Lazy::create(function() use ($avatars) {
                return $avatars->slice(1, 5) // Pula o primeiro (atual) e pega os 5 anteriores
                    ->map(function (Media $media) {
                        return [
                            'id' => $media->id,
                            'url' => $media->getTemporaryUrl(now()->addMinutes(5), 'thumb'),
                        ];
                    })
                    ->values()
                    ->toArray();
            })
        );
    }
}