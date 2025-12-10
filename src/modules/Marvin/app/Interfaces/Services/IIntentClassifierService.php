<?php

namespace Modules\Marvin\Interfaces\Services;

/**
 * Interface IIntentClassifierService
 * @package Modules\Marvin\Interfaces\Services
 */
interface IIntentClassifierService
{

    /**
     * Classifica a intenção com base no prompt do usuário.
     */
    public function classify(string $prompt): string;
}
