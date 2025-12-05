<?php

namespace Modules\Marvin\Interfaces\Services;

use Modules\Marvin\DTOs\ChatMessageData;

/**
 * Interface IChatService
 * @package Modules\Marvin\Interfaces\Services
 */
interface IChatService
{
    public function saveUserMsg(string $prompt, string $userId): ChatMessageData;
}
