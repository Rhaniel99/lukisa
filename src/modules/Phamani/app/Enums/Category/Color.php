<?php

namespace Modules\Phamani\Enums\Category;

enum Color: string
{
    case BROWN     = 'brown';
    case BEIGE     = 'beige';

    case RED       = 'red';
    case GREEN     = 'green';
    case BLUE      = 'blue';

    case ORANGE    = 'orange';
    case PURPLE    = 'purple';

    case PINK      = 'pink';
    case TEAL      = 'teal';
    case INDIGO    = 'indigo';

    case EMERALD   = 'emerald';
    case ROSE      = 'rose';

    case SLATE     = 'slate';
    case CHARCOAL  = 'charcoal';

    case AMBER     = 'amber';

    public function hex(): string
    {
        return match ($this) {
            self::BROWN     => '#3D2817',
            self::BEIGE     => '#8B7355',

            self::RED       => '#D4183D',
            self::GREEN     => '#1F5428',
            self::BLUE      => '#2563EB',

            self::ORANGE    => '#D97706',
            self::PURPLE    => '#7C3AED',

            self::PINK      => '#EC4899',
            self::TEAL      => '#14B8A6',
            self::INDIGO    => '#4F46E5',

            self::EMERALD   => '#047857',
            self::ROSE      => '#BE123C',

            self::SLATE     => '#334155',
            self::CHARCOAL  => '#1F2937',

            self::AMBER     => '#B45309',
        };
    }

    public function label(): string
    {
        return match ($this) {
            self::BROWN     => 'Marrom',
            self::BEIGE     => 'Bege',

            self::RED       => 'Vermelho',
            self::GREEN     => 'Verde',
            self::BLUE      => 'Azul',

            self::ORANGE    => 'Laranja',
            self::PURPLE    => 'Roxo',

            self::PINK      => 'Rosa',
            self::TEAL      => 'Turquesa',
            self::INDIGO    => 'Índigo',

            self::EMERALD   => 'Esmeralda',
            self::ROSE      => 'Vinho',

            self::SLATE     => 'Grafite',
            self::CHARCOAL  => 'Carvão',

            self::AMBER     => 'Âmbar',
        };
    }
}
