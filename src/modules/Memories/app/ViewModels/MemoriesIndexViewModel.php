<?php
namespace Modules\Memories\ViewModels;

use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Modules\Memories\DTOs\MemoryDataResponse;
use Modules\Memories\Models\Place;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Lazy;

class MemoriesIndexViewModel extends Data
{
    public function __construct(
        public readonly Collection $places,
        public readonly Lazy|Collection|null $selectedPlaceMemories, // ✅ Nova prop opcional
    ) {}

    public static function fromRequest(Request $request): static
    {
        // Carga inicial dos pins
        $places = Place::query()
            ->select(['id', 'latitude', 'longitude'])
            ->get();

        // A prop 'selectedPlaceMemories' só será calculada e retornada se for pedida.
       $selectedPlaceMemories = Lazy::when(
            fn() => $request->has('place_id'),
            function () use ($request) {
                $place = Place::findOrFail($request->input('place_id'));

                $memories = $place->memories()
                    ->with(['user', 'comments.user'])
                    ->withCount(['likes', 'comments'])
                    ->latest()
                    ->get();

                return MemoryDataResponse::collect($memories);
            }
        );

        return new self($places, $selectedPlaceMemories);
    }
}
