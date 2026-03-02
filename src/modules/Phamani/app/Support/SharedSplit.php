<?php

namespace Modules\Phamani\Support;

final class SharedSplit
{
    public static function split(float $total, int $participantsCount): array
    {
        $totalCents = (int) round($total * 100);
        $count = max($participantsCount + 1, 1);

        $base = intdiv($totalCents, $count);
        $remainder = $totalCents - ($base * $count);

        $participantCents = $base;
        $userCents = $base + $remainder;

        return [
            'participant_amount' => $participantCents / 100,
            'user_amount'        => $userCents / 100,
            'participant_pct'    => $totalCents > 0 ? ($participantCents / $totalCents) * 100 : 0,
            'user_pct'           => $totalCents > 0 ? ($userCents / $totalCents) * 100 : 0,
        ];
    }
}