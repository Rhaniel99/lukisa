<?php

namespace Modules\Marvin\Interfaces\Services;

/**
 * Interface IContextProviderService
 * @package Modules\Marvin\Interfaces\Services
 */
interface IContextProviderService
{
    /**
     * Retorna contexto adicional baseado na intenção classificada.
     */
    public function getContext(string $intent): ?string;
}
