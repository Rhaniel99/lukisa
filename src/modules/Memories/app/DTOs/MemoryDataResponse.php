<?php

namespace Modules\Memories\DTOs;

use Illuminate\Support\Collection;
use Modules\Memories\Models\Memorie;
use Spatie\LaravelData\Attributes\DataCollectionOf;
use Spatie\LaravelData\Attributes\MapName;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Lazy;
use Spatie\LaravelData\Mappers\SnakeCaseMapper;

#[MapName(SnakeCaseMapper::class)]
class MemoryDataResponse extends Data
{
    public function __construct(
        public readonly int $id,
        public readonly string $title,
        public readonly string $description,
        public readonly string $created,
        public readonly int $likes,
        public readonly int $commentsCount,
        public readonly bool $liked,
        public readonly ?string $image,
        public readonly UserData $author,
        public bool $is_owner,

        /** @var DataCollection<CommentData> */
        #[DataCollectionOf(CommentData::class)]
        public readonly Lazy|Collection $comments, // Lazy loading!
    ) {
    }

    public static function fromModel(Memorie $memory): self
    {
        // \Log::info($memory->user_id);
        // \Log::warning(auth()->id());

        return new self(
            id: $memory->id,
            title: $memory->title,
            description: $memory->content,
            created: $memory->created_at->format('Y-m-d'),
            likes: $memory->likes_count ?? 0,
            commentsCount: $memory->comments_count ?? 0,
            liked: $memory->isLikedBy(auth()->user()),
            image: $memory->getFirstMediaUrl('memories_media'),
            author: UserData::fromModel($memory->user),
            is_owner: $memory->user_id === auth()->id(),

            comments: Lazy::whenLoaded(
                'comments', // 1. O nome da relação
                $memory,     // 2. O objeto do model
                fn() => CommentData::collect($memory->comments) // 3. A função a ser executada
            ),
        );
    }
}
