<?php

namespace Modules\Phamani\Services;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Modules\Phamani\DTOs\Transaction\StoreTransactionData;
use Modules\Phamani\Interfaces\Repositories\ITransactionRepository;
use Modules\Phamani\Interfaces\Services\ITransactionService;
use Modules\Phamani\Interfaces\Repositories\IAccountRepository;

class TransactionService implements ITransactionService
{
    public function __construct(
        protected ITransactionRepository $repository,
        protected IAccountRepository $accountRepository,
    ) {}

    public function create(StoreTransactionData $dto)
    {
        return DB::transaction(function () use ($dto) {

            $transaction = $this->repository->create([
                'user_id'     => Auth::id(),
                'account_id'  => $dto->account_id,
                'category_id' => $dto->category_id,
                'name'        => $dto->description,
                'description' => $dto->description,
                'type'        => $dto->type,
                'amount'      => $dto->amount,
                'date'        => $dto->date,
                'is_installment' => false,
                'is_recurring'   => false,
            ]);

            // Atualiza saldo da conta
            $this->accountRepository->applyTransaction(
                $dto->account_id,
                $dto->amount,
                $dto->type
            );

            return $transaction;
        });
    }
}
