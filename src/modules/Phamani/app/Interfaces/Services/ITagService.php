<?php

namespace Modules\Phamani\Interfaces\Services;

/**
 * Interface ITagService
 * @package Modules\Phamani\Interfaces\Services
 */
interface ITagService
{
    public function resolveTagIds(array $tags): array;
    public function syncTransactionTags($transaction, array $tags): void;
}
