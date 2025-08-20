<?php

namespace Modules\Marvin\ViewModels;

use Modules\Marvin\DTOs\ChatMessageData;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Attributes\MapName;
use Spatie\LaravelData\Mappers\SnakeCaseMapper;

#[MapName(SnakeCaseMapper::class)]
class ConversationTurnViewModel extends Data
{
    public function __construct(
        public readonly string $id,
        public readonly ChatMessageData $question,
        public readonly ChatMessageData $answer,
    ) {
    }
}
