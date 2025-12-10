<?php

namespace Modules\Marvin\Interfaces\Services;

use Modules\Marvin\DTOs\ChatMessageResponse;

/**
 * Interface IChatService
 * @package Modules\Marvin\Interfaces\Services
 */
interface IChatService
{
    public function saveUserMsg(string $prompt, string $userId): ChatMessageResponse;
    public function saveAssistantMsg(string $content, string $userId);
    public function getRecentMsg(string $userId, int $limit = 6);
    public function getHistory(string $userId, int $limit = 6);
}
