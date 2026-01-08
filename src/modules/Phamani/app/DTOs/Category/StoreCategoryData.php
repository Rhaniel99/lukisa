<?php

namespace Modules\Phamani\DTOs\Category;

use Spatie\LaravelData\Data;
use Spatie\LaravelData\Attributes\Validation\In;
use Spatie\LaravelData\Attributes\Validation\Required;
use Spatie\LaravelData\Attributes\Validation\Uuid;

class StoreCategoryData extends Data
{
    public function __construct(
        #[Required]
        public string $name,

        #[Required, In(['income', 'expense', 'both'])]
        public string $type,

        #[Required]
        public string $color,

        #[Required]
        public string $icon,

        #[Uuid]
        public ?string $parent_id = null,
    ) {}
}
