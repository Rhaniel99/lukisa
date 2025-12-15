<?php

namespace Modules\Memories\DTOs;

use Modules\Memories\Models\Comment;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Attributes\MapName;
use Spatie\LaravelData\Mappers\SnakeCaseMapper;

#[MapName(SnakeCaseMapper::class)]
class CommentData extends Data
{
    public function __construct(
        public readonly string $memory_id,
        public readonly string $id,
        public readonly string $content, // 'text' no frontend
        public readonly string $created,
        public readonly UserData $author, // 'author' no frontend
    ) {
    }

    /**
     * Cria o DTO a partir de um modelo Eloquent 'Comment'.
     * Este é o método que resolve o erro.
     */
    public static function fromModel(Comment $comment): self
    {
        return new self(
            memory_id: $comment->memory_id,
            id: $comment->id,
            content: $comment->content, // Mapeia a coluna 'content' para 'text'
            created: $comment->created_at->diffForHumans(), // Formata a data
            author: UserData::fromModel($comment->user),
        );
    }
}
