<?php

namespace Modules\Phamani\Repositories;

use App\Repositories\Base\CoreRepository;
use Modules\Phamani\Interfaces\Repositories\ITransactionRepository;
use Modules\Phamani\Models\Transaction;
use Illuminate\Support\Collection;

class TransactionRepository extends CoreRepository implements ITransactionRepository
{
    /**
     * @var Transaction
     */
    protected $model;

    public function __construct(Transaction $model)
    {
        parent::__construct($model);
    }

    public function getLatestForUser(
        string $userId,
        int $limit = 5
    ): Collection {
        return $this->model
            ->where('user_id', $userId)
            ->with([
                'account:id,name,type',
                'category:id,name,color,icon',
            ])
            ->orderByDesc('date')
            ->limit($limit)
            ->get();
    }
}
