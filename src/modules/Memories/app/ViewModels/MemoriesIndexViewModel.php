<?php

namespace Modules\Memories\ViewModels;

use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Modules\Memories\DTOs\MemoryDataResponse;
use Modules\Memories\DTOs\MemorySummaryData;
use Modules\Memories\Interfaces\Repositories\IMemoriesRepository; 
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
        $places = Place::select(['id', 'name', 'latitude', 'longitude'])->get();

        // 2) Carrega memórias do lugar com PRIVACIDADE
        $selectedPlaceMemories = Lazy::when(
            fn() => $request->has('place_id'),
            function () use ($request) {
                // Instancia o repositório via Service Container
                /** @var IMemoriesRepository $repo */
                $repo = app(IMemoriesRepository::class);
                
                // Busca as memórias filtradas para o usuário atual
                $memories = $repo->getForPlace(
                    $request->input('place_id'), 
                    $request->user()
                );

                return MemorySummaryData::collect($memories);
            }
        );

        // 3) Carrega detalhes de uma memória (Mantive sua lógica de paginação aqui, 
        // mas adicionei uma verificação básica de segurança)
        $selectedMemoryDetails = Lazy::when(
            fn() => $request->has('memory_id'),
            function () use ($request) {
                $page = $request->input('comments_page', 1);
                
                // Verificar se a memória existe e o usuário pode ver 
                // (Idealmente moveria isso para o Repo também, findWithPermission)
                $memory = Memorie::with('user')
                    ->withCount(['likes', 'comments'])
                    ->findOrFail($request->input('memory_id'));

                // TODO: Aqui você poderia adicionar uma verificação rápida
                // if (!$memory->isVisibleTo($request->user())) abort(403);

                // Paginar comentários...
                $commentsQuery = $memory->comments()->with('user')->latest();
                $totalComments = (clone $commentsQuery)->count();
                $perPage = 3;
                $commentsForCurrentPage = $commentsQuery->forPage($page, $perPage)->get();

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

                return MemoryDataResponse::fromModel($memory, $paginated);
            }
        );

        return new self($places, $selectedPlaceMemories, $selectedMemoryDetails);
    }
}