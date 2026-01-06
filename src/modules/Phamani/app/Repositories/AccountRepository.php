<?php

namespace Modules\Phamani\Repositories;

use App\Repositories\Base\CoreRepository;
use Modules\Phamani\Interfaces\Repositories\IAccountRepository;
use Modules\Phamani\Models\Account;

class AccountRepository extends CoreRepository implements IAccountRepository
{
    /**
     * @var Account
     */
    protected $model;

    public function __construct(Account $model)
    {
        parent::__construct($model);
    }

    public function applyTransaction(string $accountId, float $amount, string $type): void
    {
        $account = $this->model->findOrFail($accountId);

        $account->balance += $type === 'income'
            ? $amount
            : -$amount;

        $account->save();
    }
}
