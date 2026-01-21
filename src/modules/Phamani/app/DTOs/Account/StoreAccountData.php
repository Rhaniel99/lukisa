<?php

namespace Modules\Phamani\DTOs\Account;

use Spatie\LaravelData\Attributes\Validation\In;
use Spatie\LaravelData\Attributes\Validation\Max;
use Spatie\LaravelData\Attributes\Validation\Required;
use Spatie\LaravelData\Data;

class StoreAccountData extends Data
{
    public function __construct(
        #[Required(), Max(100)]
        public string $name,

        #[Required, In(['cash', 'checking', 'credit'])]
        public string $type,
    ) {}
}
