<?php

namespace Modules\Marvin\DTOs;

use Spatie\LaravelData\Data;
use Spatie\LaravelData\Attributes\MapName;
use Spatie\LaravelData\Mappers\SnakeCaseMapper;

#[MapName(SnakeCaseMapper::class)]
class AskRequest extends Data
{
    public function __construct(
        public readonly string $prompt,
    ) {
    }
}
