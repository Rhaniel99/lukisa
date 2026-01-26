<?php

namespace Modules\Phamani\DTOs\Transaction;

use Spatie\LaravelData\Attributes\DataCollectionOf;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Attributes\Validation\In;
use Spatie\LaravelData\Attributes\Validation\Required;
use Spatie\LaravelData\Attributes\Validation\Uuid;
use Spatie\LaravelData\Attributes\Validation\Min;

class StoreTransactionData extends Data
{
    public function __construct(
        #[Required]
        public string $description,

        #[Required, Min(0.01)]
        public float $amount,

        #[Required, In(['income', 'expense'])]
        public string $type,

        #[Required, Uuid]
        public string $category_id,

        #[Required, Uuid]
        public string $account_id,

        #[Required]
        public string $date,

        public bool $is_installment = false,

        public ?int $installments_count = null,

        public bool $is_recurring = false,

        public ?string $frequency = null,

        public bool $is_shared = false,

        #[DataCollectionOf(SharedParticipantData::class)]
        public array $shared_participants = [],
    ) {}
}
