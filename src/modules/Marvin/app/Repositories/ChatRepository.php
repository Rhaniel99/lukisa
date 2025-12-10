<?php

namespace Modules\Marvin\Repositories;

use App\Repositories\Base\CoreRepository;
use Modules\Marvin\Interfaces\Repositories\IChatRepository;
use Modules\Marvin\Models\ChatMessage;
use Illuminate\Database\Eloquent\Collection;


class ChatRepository extends CoreRepository implements IChatRepository
{
    /**
     * @var ChatMessage
     */
    protected $model;

    public function __construct(ChatMessage $model)
    {
        parent::__construct($model);
    }

    public function getRecentByUser(string $userId, int $limit = 6): Collection
    {
        return $this->model
            ->newQuery()
            ->where('user_id', $userId)
            ->orderBy('created_at', 'desc')
            ->limit($limit)
            ->get()
            ->reverse()
            ->values();
    }
}
