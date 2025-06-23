<?php

namespace Modules\Authentication\DTOs;

use Spatie\LaravelData\Attributes\Validation\Confirmed;
use Spatie\LaravelData\Attributes\Validation\Email;
use Spatie\LaravelData\Attributes\Validation\Min;
use Spatie\LaravelData\Attributes\Validation\Required;
use Spatie\LaravelData\Attributes\Validation\Rule;
use Spatie\LaravelData\Attributes\Validation\StringType;
use Spatie\LaravelData\Data;

class ResetPasswordData extends Data
{
    public function __construct(
        #[Required, StringType, Email, Rule('exists:users,email')]
        public string $email,

        #[Required, StringType, Min(6), Confirmed]
        public string $password,

        public string $password_confirmation
        ) {}
}
