<?php

namespace Modules\Phamani\Interfaces\Services;

/**
 * Interface IDashboardService
 * @package Modules\Phamani\Interfaces\Services
 */
interface IDashboardService
{
    public function kpis(string $userId): array;
    public function cashFlow(
        string $userId,
        string $period = 'yearly'
    ): array;
}
