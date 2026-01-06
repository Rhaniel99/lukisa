<?php

namespace Modules\Memories\DTOs;

use Illuminate\Support\Facades\Auth;
use Modules\Memories\Models\Memorie;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Attributes\MapName;
use Spatie\LaravelData\Mappers\SnakeCaseMapper;

#[MapName(SnakeCaseMapper::class)]
class MemoryListItemData extends Data
{
    public function __construct(
        public readonly string $id,
        public readonly string $title,
        public readonly string $created,
        public readonly string $description,
        public readonly int $likes,
        public readonly int $commentsCount,
        public readonly bool $liked,
        public readonly ?string $image,
        public readonly UserData $author,
        public readonly bool $isOwner,
    ) {}

    public static function fromModel(Memorie $memory): self
    {
        return new self(
            id: $memory->id,
            title: $memory->title,
            description: $memory->content,
            created: $memory->created_at->format('d/m/Y'),
            likes: $memory->likes_count ?? 0,
            commentsCount: $memory->comments_count ?? 0,
            liked: $memory->isLikedBy(Auth::user()),
            image: $memory->getPublicImageUrl(5),
            author: UserData::fromModel($memory->user),
            isOwner: $memory->user_id === Auth::id(),
        );
    }
}
