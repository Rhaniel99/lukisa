<?php
namespace Modules\Memories\ViewModels;

use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Modules\Memories\DTOs\MemoryDataResponse;
use Modules\Memories\DTOs\MemorySummaryData;
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
                return MemorySummaryData::collect($m);
            }
        );

        // 3) Carrega detalhes de uma memória (com comentários) se passar memory_id
        $selectedMemoryDetails = Lazy::when(
            fn() => $request->has('memory_id'),
            function () use ($request) {
                $page = $request->input('comments_page', 1);
                $memory = Memorie::with('user')
                    ->withCount(['likes', 'comments'])
                    ->findOrFail($request->input('memory_id'));

                // Paginar comentários (3 por página, ordenados do mais novo)
                $commentsQuery = $memory->comments()->with('user')->latest();

                // Clonamos a query para obter a contagem total ANTES de aplicar o offset/limit da paginação.
                $totalComments = (clone $commentsQuery)->count();
                $perPage = 3;

                // Buscamos os comentários da página atual.
                $commentsForCurrentPage = $commentsQuery->forPage($page, $perPage)->get();

                // Criamos um paginador manual para ter controle total sobre os dados.
                $paginated = new \Illuminate\Pagination\LengthAwarePaginator(
                    $commentsForCurrentPage,
                    $totalComments,
                    $perPage,
                    $page,
                    [
                        'path' => $request->url(),
                        'pageName' => 'comments_page',
                    ]
                );

                // Anexar comentários paginados (DTO)
                $dto = MemoryDataResponse::fromModel($memory, $paginated);

                return $dto;
            }
        );

        return new self($places, $selectedPlaceMemories, $selectedMemoryDetails);
    }
}
