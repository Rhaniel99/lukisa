<?php

namespace Modules\Memories\View;

use Illuminate\Support\Collection;
use Modules\Memories\DTOs\MemoryDataResponse;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Lazy;

class MemoriesIndexView extends Data
{
    public function __construct(
        public readonly Collection $places,
        public readonly Lazy|Collection|null $selectedPlaceMemories,
        public readonly Lazy|MemoryDataResponse|null $selectedMemoryDetails,
    ) {}
}
