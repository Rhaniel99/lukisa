<?php

namespace Modules\Marvin\DTOs;

use Carbon\Carbon;
use Modules\Marvin\Models\ChatMessage;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Attributes\MapName;
use Spatie\LaravelData\Mappers\SnakeCaseMapper;

#[MapName(SnakeCaseMapper::class)]
class ChatMessageData extends Data
{
  public function __construct(
        public readonly string $id,
        public readonly string $content,
        public readonly string $role,
        public readonly Carbon $created_at,
    ) {
    }

    public static function fromModel(ChatMessage $message): self
    {
        return new self(
            id: $message->id,
            content: $message->content,
            role: $message->role,
            created_at: $message->created_at,
        );
    }
}
