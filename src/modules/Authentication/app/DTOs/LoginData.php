<?php

namespace Modules\Authentication\DTOs;

use Spatie\LaravelData\Data;
use Spatie\LaravelData\Attributes\Validation\Required;
use Spatie\LaravelData\Attributes\Validation\Email;
use Spatie\LaravelData\Attributes\Validation\StringType;
use Spatie\LaravelData\Attributes\Validation\BooleanType;

class LoginData extends Data
{
    public function __construct(
        #[Required, StringType, Email]
        public string $email,

        #[Required, StringType]
        public string $password,

        #[Required, BooleanType]
        public bool $remember
    ) {}
}
