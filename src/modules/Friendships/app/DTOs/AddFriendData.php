<?php

namespace Modules\Friendships\DTOs;

use Spatie\LaravelData\Data;
use Spatie\LaravelData\Attributes\Validation\Required;
use Spatie\LaravelData\Attributes\Validation\StringType;
use Spatie\LaravelData\Attributes\Validation\Regex;

class AddFriendData extends Data
{
    public function __construct(
        #[Required, StringType, Regex('/^.+#\d{4}$/')]
        public string $tag,
    ) {
        // Normaliza imediatamente
        $this->tag = preg_replace('/\s+/', '', $this->tag);
    }

    /**
     * Define mensagens de erro customizadas para a validação.
     */
    public static function messages(...$_args): array
    {
        return [
            'tag.required' => 'Você precisa digitar a tag de um usuário.',
            'tag.regex' => 'O formato da tag é inválido. Use "username#1234".',
        ];
    }
}
