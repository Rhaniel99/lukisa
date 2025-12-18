<?php

namespace Modules\Memories\Repositories;

use App\Models\User;
use App\Repositories\Base\CoreRepository;
use Illuminate\Support\Collection;
use Modules\Memories\Interfaces\Repositories\IMemoriesRepository;
use Modules\Memories\Models\Memorie;

class MemoriesRepository extends CoreRepository implements IMemoriesRepository
{
    public function __construct(Memorie $model)
    {
        parent::__construct($model);
    }

    public function createMemory(
        string $title,
        string $content,
        string $placeId,
        string $userId
    ): Memorie {
        return $this->create([
            'title'    => $title,
            'content'  => $content,
            'place_id' => $placeId,
            'user_id'  => $userId,
        ]);
    }

    public function getDetailsWithComments(
        string $memoryId,
        int $commentsPage = 1,
        int $perPage = 3
    ): array {
        $memory = $this->model
            ->with('user', 'media')
            ->withCount(['likes', 'comments'])
            ->findOrFail($memoryId);

        $comments = $memory->comments()
            ->with('user')
            ->latest()
            ->paginate(
                $perPage,
                ['*'],
                'comments_page',
                $commentsPage
            );

        return [
            'memory'   => $memory,
            'comments' => $comments,
        ];
    }


    /**
     * Busca memórias de um lugar respeitando a privacidade.
     */
 public function getForPlace(string $placeId): Collection
{
    return $this->model
        ->where('place_id', $placeId)
        ->with('user')
        ->withCount(['likes', 'comments'])
        ->latest()
        ->get();
}


    /**
     * Visibilidade centralizada (apoia Actions / Policies)
     */
    
    // public function isVisibleTo(Memorie $memory, ?User $viewer): bool
    // {
    //     if (!$viewer) {
    //         return $memory->user->privacy === 'public';
    //     }

    //     if ($viewer->id === $memory->user_id) {
    //         return true;
    //     }

    //     if ($memory->user->privacy === 'public') {
    //         return true;
    //     }

    //     if ($memory->user->privacy === 'friends') {
    //         return $viewer->friends()
    //             ->where('id', $memory->user_id)
    //             ->exists();
    //     }

    //     return false;
    // }
}
