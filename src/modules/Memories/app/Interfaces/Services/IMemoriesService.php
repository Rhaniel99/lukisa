<?php

namespace Modules\Memories\Interfaces\Services;

use Modules\Memories\DTOs\StoreMemoryData;

/**
 * Interface IMemoriesService
 * @package Modules\Memories\Interfaces\Services
 */
interface IMemoriesService {
    public function saveMemories(StoreMemoryData $r) : bool;
}
