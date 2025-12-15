<?php

namespace Modules\Memories\Repositories;

use App\Models\User;
use App\Repositories\Base\CoreRepository;
use Modules\Memories\DTOs\StoreMemoryData;
use Modules\Memories\Interfaces\Repositories\IMemoriesRepository;
use Modules\Memories\Models\Memorie;
use Modules\Memories\Models\Place;
use Illuminate\Database\Eloquent\Collection;

class MemoriesRepository extends CoreRepository implements IMemoriesRepository
{
    public function __construct(Memorie $model)
    {
        parent::__construct($model);
    }

    public function findOrCreatePlace(float $latitude, float $longitude, string $name): Place
    {
        return Place::firstOrCreate(
            [
                'latitude' => $latitude,
                'longitude' => $longitude
            ],
            [
                'name' => $name
            ]
        );
    }

    /**
     * {@inheritdoc}
     */
    public function createMemory(StoreMemoryData $data, string $placeId, string $userId): Memorie
    {
        return Memorie::create([
            'title' => $data->title,
            'content' => $data->content,
            'place_id' => $placeId,
            'user_id' => $userId,
        ]);
    }

    /**
     * Busca memórias de um lugar respeitando a privacidade.
     */
    public function getForPlace(string $placeId, ?User $viewer): Collection
    {
        $query = $this->model
            ->where('place_id', $placeId)
            ->with('user') // Carrega o autor da memória
            ->withCount(['likes', 'comments']);

        // Se for visitante (não logado), vê apenas PUBLIC
        if (!$viewer) {
            return $query->whereHas('user', function ($q) {
                $q->where('privacy', 'public');
            })->latest()->get();
        }

        // Se for usuário logado, aplicamos as 3 regras:
        // 1. É minha memória? (Sempre vejo)
        // 2. É pública? (Sempre vejo)
        // 3. É de amigo e está configurada para 'friends'? (Vejo se for amigo)

        // Pegamos os IDs dos amigos do usuário logado
        $friendIds = $viewer->friends()->pluck('id')->toArray();

        $query->where(function ($q) use ($viewer, $friendIds) {
            // Regra 1: Minhas memórias
            $q->where('user_id', $viewer->id)

                // Regra 2 e 3: Memórias de outros
                ->orWhereHas('user', function ($u) use ($friendIds) {
                    $u->where(function ($privacyQuery) use ($friendIds) {
                        // A. Público
                        $privacyQuery->where('privacy', 'public')

                            // B. Amigos (Se o autor da memória estiver na minha lista de amigos)
                            ->orWhere(function ($friendsQuery) use ($friendIds) {
                                $friendsQuery->where('privacy', 'friends')
                                    ->whereIn('id', $friendIds);
                            });
                    });
                });
        });

        return $query->latest()->get();
    }
}
