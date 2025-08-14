<?php

namespace Modules\Marvin\Interfaces\Services;

/**
 * Interface IOllamaService
 * @package Modules\Marvin\Interfaces
 */
interface IOllamaService
{
    public function generate(string $prompt, ?string $systemPromptOverride = null, array $options = []): string;
}
