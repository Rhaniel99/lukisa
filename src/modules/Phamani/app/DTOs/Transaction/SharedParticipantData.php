<?php

namespace Modules\Phamani\DTOs\Transaction;

use Spatie\LaravelData\Data;
use Spatie\LaravelData\Attributes\Validation\Required;
use Spatie\LaravelData\Attributes\Validation\Min;

class SharedParticipantData extends Data
{
    public function __construct(
        #[Required, Min(2)]
        public string $name,
    ) {}
}