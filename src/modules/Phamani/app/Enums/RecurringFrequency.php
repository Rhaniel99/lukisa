<?php

namespace Modules\Phamani\Enums;

enum RecurringFrequency: string
{
    case DAILY = 'daily';
    case WEEKLY = 'weekly';
    case MONTHLY = 'monthly';
    case YEARLY = 'yearly';

    public function label(): string
    {
        return match ($this) {
            self::DAILY => 'Diário',
            self::WEEKLY => 'Semanal',
            self::MONTHLY => 'Mensal',
            self::YEARLY => 'Anual',
        };
    }

    public static function fromInput(string $value): self
    {
        return match ($value) {
            // pt-BR
            'diario' => self::DAILY,
            'semanal' => self::WEEKLY,
            'mensal' => self::MONTHLY,
            'anual' => self::YEARLY,

            // já normalizado
            'daily' => self::DAILY,
            'weekly' => self::WEEKLY,
            'monthly' => self::MONTHLY,
            'yearly' => self::YEARLY,

            default => throw new \InvalidArgumentException(
                "Frequência inválida: {$value}"
            ),
        };
    }
}
