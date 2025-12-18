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
class MemoryDetailsData extends Data
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
        public readonly bool $isOwner,

        /** @var DataCollection<CommentData> */
        #[DataCollectionOf(CommentData::class)]
        public readonly DataCollection $comments,
        public readonly int $commentsCurrentPage,
        public readonly int $commentsLastPage,
    ) {}

    public static function fromModel(
        Memorie $memory,
        LengthAwarePaginator $comments,
        ?\App\Models\User $viewer
    ): self {
        return new self(
            id: $memory->id,
            title: $memory->title,
            description: $memory->content,
            created: $memory->created_at->format('d/m/Y'),
            likes: $memory->likes_count ?? 0,
            commentsCount: $memory->comments_count ?? 0,
            liked: $viewer ? $memory->isLikedBy($viewer) : false,
            image: $memory->getFirstMedia('memories_media')
                ?->getTemporaryUrl(now()->addMinutes(5)),
            author: UserData::fromModel($memory->user),
            isOwner: $viewer?->id === $memory->user_id,
            comments: new DataCollection(
                CommentData::class,
                $comments->items()
            ),
            commentsCurrentPage: $comments->currentPage(),
            commentsLastPage: $comments->lastPage(),
        );
    }
}
