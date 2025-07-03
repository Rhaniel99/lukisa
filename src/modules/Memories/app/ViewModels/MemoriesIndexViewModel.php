<?php
namespace Modules\Memories\ViewModels;

use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Modules\Memories\DTOs\MemoryDataResponse;
use Modules\Memories\Models\Memorie;
use Modules\Memories\Models\Place;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Lazy;

class MemoriesIndexViewModel extends Data
{
    public function __construct(
        public readonly Collection $places,
        public readonly Lazy|Collection|null $selectedPlaceMemories,
        public readonly Lazy|MemoryDataResponse|null $selectedMemoryDetails,
    ) {
    }

    public static function fromRequest(Request $request): static
    {
        // 1) Carrega sempre os pins
        $places = Place::select(['id', 'latitude', 'longitude'])->get();

        // 2) Carrega memórias do lugar, se passar place_id
        $selectedPlaceMemories = Lazy::when(
            fn() => $request->has('place_id'),
            function () use ($request) {
                $place = Place::findOrFail($request->input('place_id'));
                $m = $place->memories()
                    ->with('user')
                    ->withCount(['likes', 'comments'])
                    ->latest()
                    ->get();
                return MemoryDataResponse::collect($m);
            }
        );

        // 3) Carrega detalhes de uma memória (com comentários) se passar memory_id
        $selectedMemoryDetails = Lazy::when(
            fn() => $request->has('memory_id'),
            function () use ($request) {
                $memory = Memorie::with(['user', 'comments.user'])
                    ->withCount(['likes', 'comments'])
                    ->findOrFail($request->input('memory_id'));
                return MemoryDataResponse::fromModel($memory);
            }
        );

        return new self($places, $selectedPlaceMemories, $selectedMemoryDetails);
    }
}
