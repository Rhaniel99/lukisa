<?php

namespace Modules\Authentication\DTOs;

use Spatie\LaravelData\Attributes\Validation\Before;
use Spatie\LaravelData\Attributes\Validation\Date;
use Spatie\LaravelData\Attributes\Validation\Email;
use Spatie\LaravelData\Attributes\Validation\Required;
use Spatie\LaravelData\Attributes\Validation\Rule;
use Spatie\LaravelData\Attributes\Validation\StringType;
use Spatie\LaravelData\Data;

class CheckUserData extends Data
{
    public function __construct(
        #[Required, StringType, Email, Rule('exists:users,email')]
        public string $email,

        #[Required, Date, Before('today')]
        public string $birth_date,

    ) {}
}
