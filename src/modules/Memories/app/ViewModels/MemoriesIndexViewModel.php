<?php
// modules/Memories/app/ViewModels/MemoriesIndexViewModel.php
namespace Modules\Memories\ViewModels;

use Illuminate\Support\Collection;
use Modules\Memories\Models\Place;
use Spatie\LaravelData\Data;

class MemoriesIndexViewModel extends Data // Usar DTO da Spatie como ViewModel é uma ótima abordagem
{
    public function __construct(
        public readonly Collection $places,
    ) {
    }

    public static function fromRequest(): static
    {
        $places = Place::with([
            'memories' => fn($query) => $query->with('user:id,name,avatar')->latest(),
            'memories.media'
        ])->get();

        return new self($places);
    }
}
