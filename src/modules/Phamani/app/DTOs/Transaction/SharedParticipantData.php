<?php

namespace Modules\Phamani\DTOs\Transaction;

use Spatie\LaravelData\Data;
use Spatie\LaravelData\Attributes\Validation\Required;
use Spatie\LaravelData\Attributes\Validation\Min;
use Spatie\LaravelData\Attributes\Validation\Max;

class SharedParticipantData extends Data
{
    public function __construct(
        #[Required]
        public string $name,

        #[Required, Min(0), Max(100)]
        public int $percentage,
    ) {}
}
