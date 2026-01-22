<?php

namespace Modules\Phamani\Repositories;

use App\Repositories\Base\CoreRepository;
use Modules\Phamani\Interfaces\Repositories\IRecurringTransactionRepository;
use Modules\Phamani\Models\RecurringTransaction;

class RecurringTransactionRepository extends CoreRepository implements IRecurringTransactionRepository
{
    /**
     * @var RecurringTransaction
     */
    protected $model;

    public function __construct(RecurringTransaction $model)
    {
        parent::__construct($model);
    }

    // Adicione aqui métodos específicos para o RecurringTransactionRepository...
}