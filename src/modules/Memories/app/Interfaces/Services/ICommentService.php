<?php

namespace Modules\Memories\Interfaces\Services;

use Modules\Memories\DTOs\StoreCommentData;
use Modules\Memories\Models\Comment;

/**
 * Interface ICommentService
 * @package Modules\Memories\Interfaces\Services
 */
interface ICommentService
{
    public function save(StoreCommentData $data): ?Comment;
}
