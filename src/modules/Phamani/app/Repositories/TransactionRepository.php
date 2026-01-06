<?php

namespace Modules\Phamani\Repositories;

use App\Repositories\Base\CoreRepository;
use Modules\Phamani\Interfaces\Repositories\ITransactionRepository;
use Modules\Phamani\Models\Transaction;

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


}
