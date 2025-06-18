<?php

namespace Modules\Authentication\DTOs;

use Spatie\LaravelData\Attributes\Validation\Unique;
use Spatie\LaravelData\Attributes\Validation\Required;
use Spatie\LaravelData\Attributes\Validation\Email;
use Spatie\LaravelData\Attributes\Validation\StringType;
use Spatie\LaravelData\Attributes\Validation\Date;
use Spatie\LaravelData\Attributes\Validation\Before;
use Spatie\LaravelData\Attributes\Validation\Confirmed;
use Spatie\LaravelData\Attributes\Validation\Min;
use Spatie\LaravelData\Attributes\Validation\Max;

use Spatie\LaravelData\Data;


class RegisterData extends Data
{
    public function __construct(
        #[Required, StringType, Max(255)]
        public string $name,

        #[Required, StringType, Email, Unique('users', 'email')] // Adicione aqui a regra 'Unique' para a tabela de usuários
        public string $email,

        #[Required, Date, Before('today')]
        public string $birth_date,

        // 2. Adicione a regra 'Confirmed' ao campo de senha original
        // Você também pode adicionar uma regra de tamanho mínimo, como Min(8)
        #[Required, StringType, Confirmed, Min(6)]
        public string $password,

        // 3. Ele não precisa de regras especiais,
        // pois a regra 'Confirmed' no campo 'password' cuidará da verificação.
        public string $password_confirmation,
    ) {}
}
