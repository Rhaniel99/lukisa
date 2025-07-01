<?php

namespace Modules\Memories\DTOs;

use Spatie\LaravelData\Attributes\MapName;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Mappers\SnakeCaseMapper;

#[MapName(SnakeCaseMapper::class)] // Mapeia camelCase (author) para snake_case (author)
class CommentData extends Data
{
    public function __construct(
        public readonly int $id,
        public readonly string $text, // Note que mudei para 'text' como no seu exemplo JS
        public readonly string $createdAt,
        public readonly UserData $author, // ✅ Aninhamento de DTOs!
    ) {}
}
