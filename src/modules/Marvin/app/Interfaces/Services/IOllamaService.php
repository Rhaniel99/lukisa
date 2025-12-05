<?php

namespace Modules\Marvin\Interfaces\Services;

/**
 * Interface IOllamaService
 * @package Modules\Marvin\Interfaces
 */
interface IOllamaService
{
    public function generate(string $prompt, ?string $systemPromptOverride = null, array $options = []): string;
    // public function chat(array $messages): string;
    public function chat(array $messages, string $systemPrompt): string;
}
