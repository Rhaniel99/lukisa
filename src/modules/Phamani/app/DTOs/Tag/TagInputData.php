<?php

namespace Modules\Phamani\DTOs\Tag;

use Spatie\LaravelData\Attributes\Validation\Max;
use Spatie\LaravelData\Attributes\Validation\Required;
use Spatie\LaravelData\Data;

class TagInputData extends Data
{
    public function __construct(
        #[Required(), Max(30)]
        public string $name,
    ) {}
}
