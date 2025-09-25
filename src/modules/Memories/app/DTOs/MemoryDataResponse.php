<?php

namespace Modules\Memories\DTOs;

use Illuminate\Pagination\LengthAwarePaginator;
use Modules\Memories\Models\Memorie;
use Spatie\LaravelData\Attributes\DataCollectionOf;
use Spatie\LaravelData\Attributes\MapName;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\DataCollection;
use Spatie\LaravelData\Mappers\SnakeCaseMapper;

#[MapName(SnakeCaseMapper::class)]
class MemoryDataResponse extends Data
{
    public function __construct(
        public readonly string $id,
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
        public readonly DataCollection $comments,
        public readonly int $commentsCurrentPage = 1,
        public readonly int $commentsLastPage = 1,
    ) {
    }

    public static function fromModel(Memorie $memory, LengthAwarePaginator $comments): self
    {
        return new self(
            id: $memory->id,
            title: $memory->title,
            description: $memory->content,
            created: $memory->created_at->format('Y-m-d'),
            likes: $memory->likes_count ?? 0,
            commentsCount: $memory->comments_count ?? 0,
            liked: $memory->isLikedBy(auth()->user()),
            image: $memory->getFirstMedia('memories_media')
                      ?->getTemporaryUrl(now()->addMinutes(5)),
            author: UserData::fromModel($memory->user),
            is_owner: $memory->user_id === auth()->id(),
            comments: new DataCollection(CommentData::class, $comments->items()),
            commentsCurrentPage: $comments->currentPage(),
            commentsLastPage: $comments->lastPage(),
        );
    }
}
