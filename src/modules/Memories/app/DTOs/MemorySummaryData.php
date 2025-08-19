<?php
namespace Modules\Memories\DTOs;

use Modules\Memories\Models\Memorie;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Attributes\MapName;
use Spatie\LaravelData\Mappers\SnakeCaseMapper;

#[MapName(SnakeCaseMapper::class)]
class MemorySummaryData extends Data
{
    public function __construct(
        public readonly string $id,
        public readonly string $title,
        public readonly string $created,
        public readonly int $likes,
        public readonly int $commentsCount,
        public readonly bool $liked,
        public readonly ?string $image,
        public readonly UserData $author,
        public readonly bool $is_owner,
    ) {}

    public static function fromModel(Memorie $memory): self
    {
        return new self(
            id: $memory->id,
            title: $memory->title,
            created: $memory->created_at->format('Y-m-d'),
            likes: $memory->likes_count ?? 0,
            commentsCount: $memory->comments_count ?? 0,
            liked: $memory->isLikedBy(auth()->user()),
            image: $memory->getFirstMediaUrl('memories_media'),
            author: UserData::fromModel($memory->user),
            is_owner: $memory->user_id === auth()->id(),
        );
    }
}
