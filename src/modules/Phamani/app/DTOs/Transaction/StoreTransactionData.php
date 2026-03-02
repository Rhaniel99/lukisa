<?php

namespace Modules\Phamani\DTOs\Transaction;

use Modules\Phamani\DTOs\Tag\TagInputData;
use Spatie\LaravelData\Attributes\DataCollectionOf;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Attributes\Validation\In;
use Spatie\LaravelData\Attributes\Validation\Required;
use Spatie\LaravelData\Attributes\Validation\Uuid;
use Spatie\LaravelData\Attributes\Validation\Min;
use Illuminate\Validation\Rule;

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

        #[DataCollectionOf(TagInputData::class)]
        public array $tags = [],

        #[DataCollectionOf(SharedParticipantData::class)]
        public array $shared_participants = [],
    ) {}

    public static function rules(): array
    {
        return [

            'date' => ['required', 'date_format:Y-m-d'],

            'installments_count' => [
                Rule::requiredIf(fn() => (bool) request('is_installment')),
                'nullable',
                'integer',
                'min:2',
                'max:240',
            ],

            'frequency' => [
                Rule::requiredIf(fn() => (bool) request('is_recurring')),
                'nullable',
                Rule::in(['diario', 'semanal', 'mensal', 'anual', 'daily', 'weekly', 'monthly', 'yearly']),
            ],

            'shared_participants' => [
                Rule::requiredIf(fn() => (bool) request('is_shared')),
                'array',
                'min:1',
                'max:20',
            ],

            'shared_participants.*.name' => [
                Rule::requiredIf(fn() => (bool) request('is_shared')),
                'string',
                'min:2',
                'max:80',
            ],

            'is_recurring' => [
                'boolean',
                Rule::prohibitedIf(fn() => (bool) request('is_installment'))
            ],

            'is_installment' => [
                'boolean',
                Rule::prohibitedIf(fn() => (bool) request('is_recurring'))
            ],
        ];
    }
}