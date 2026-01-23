<?php

namespace Modules\Phamani\Enums\Category;

enum Icon: string
{
    case TAG = 'tag';
    case HOME = 'home';
    case CAR = 'car';
    case HEART = 'heart';
    case SHOPPING_BAG = 'shopping-bag';
    case ZAP = 'zap';
    case BRIEFCASE = 'briefcase';
    case GRADUATION_CAP = 'graduation-cap';
    case PLANE = 'plane';

    case UTENSILS = 'utensils';
    case WALLET = 'wallet';
    case CREDIT_CARD = 'credit-card';
    case GAMEPAD = 'gamepad';
    case MUSIC = 'music';
    case FILM = 'film';
    case DUMBBELL = 'dumbbell';
    case BOOK = 'book';
    case WRENCH = 'wrench';
    case GIFT = 'gift';
    case COFFEE = 'coffee';

    public function label(): string
    {
        return match ($this) {
            self::TAG => 'Etiqueta',
            self::HOME => 'Casa',
            self::CAR => 'Carro',
            self::HEART => 'Saúde',
            self::SHOPPING_BAG => 'Compras',
            self::ZAP => 'Energia',
            self::BRIEFCASE => 'Trabalho',
            self::GRADUATION_CAP => 'Educação',
            self::PLANE => 'Viagem',

            self::UTENSILS => 'Alimentação',
            self::WALLET => 'Carteira',
            self::CREDIT_CARD => 'Cartão',
            self::GAMEPAD => 'Jogos',
            self::MUSIC => 'Música',
            self::FILM => 'Filmes',
            self::DUMBBELL => 'Academia',
            self::BOOK => 'Leitura',
            self::WRENCH => 'Manutenção',
            self::GIFT => 'Presente',
            self::COFFEE => 'Café',
        };
    }
}
