<?php

namespace Modules\Marvin\Interfaces\Services;

use Modules\Marvin\DTOs\ChatMessageData;

/**
 * Interface IMarvinService
 * @package Modules\Marvin\Interfaces\Services
 */
interface IMarvinService
{
    // public function ask_chat(string $userPrompt, string $sessionId): string;
    // public function ask_chat(string $userPrompt, string $userId): string;
    // public function ask(string $userPrompt): string;
    // public function ask(string $userPrompt, string $userId): string;
    public function ask(string $userPrompt, string $userId): ChatMessageData;
}
