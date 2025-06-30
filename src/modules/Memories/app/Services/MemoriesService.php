<?php

namespace Modules\Memories\Services;

use Modules\Memories\DTOs\StoreMemoryData;
use Modules\Memories\Interfaces\Repositories\IMemoriesRepository;
use Modules\Memories\Interfaces\Services\IMemoriesService;

class MemoriesService implements IMemoriesService {

    protected IMemoriesRepository $memoryRepository;

    public function __construct(IMemoriesRepository $memoryRepository)
    {
        $this->memoryRepository = $memoryRepository;
    }

    public function saveMemories(StoreMemoryData $r) : bool
    {
        return true;
    }
}
