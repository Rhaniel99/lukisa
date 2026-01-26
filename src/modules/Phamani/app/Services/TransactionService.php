<?php

namespace Modules\Phamani\Services;

use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Modules\Phamani\DTOs\Transaction\StoreTransactionData;
use Modules\Phamani\Interfaces\Repositories\ITransactionRepository;
use Modules\Phamani\Interfaces\Services\ITransactionService;
use Modules\Phamani\Interfaces\Repositories\IAccountRepository;
use Modules\Phamani\Interfaces\Services\IInstallmentService;
use Modules\Phamani\Interfaces\Services\IRecurringTransactionService;

class TransactionService implements ITransactionService
{
    public function __construct(
        protected ITransactionRepository $repository,
        protected IAccountRepository $accountRepository,
        protected IInstallmentService $installmentService,
        protected IRecurringTransactionService $recurringService
    ) {}

    public function getRecentForDashboard(
        string $userId,
        int $limit = 5
    ): Collection {
        return $this->repository->getLatestForUser(
            userId: $userId,
            limit: $limit
        );
    }

    public function create(StoreTransactionData $dto)
    {
        return DB::transaction(function () use ($dto) {

            if ($dto->is_installment) {
                return $this->installmentService->createInstallment($dto);
            }

            if ($dto->is_recurring) {
                return $this->recurringService->createRecurringTransaction($dto);
            }

            return $this->createSingleTransaction($dto);
        });
    }

    private function createSingleTransaction(StoreTransactionData $dto)
    {
        $transaction = $this->repository->create([
            'user_id'     => Auth::id(),
            'account_id'  => $dto->account_id,
            'category_id' => $dto->category_id,
            'name'        => $dto->description,
            'description' => $dto->description,
            'type'        => $dto->type,
            'amount'      => $dto->amount,
            'date'        => $dto->date,
            'is_shared'   => $dto->is_shared,
        ]);

        $this->accountRepository->applyTransaction(
            $dto->account_id,
            $dto->amount,
            $dto->type
        );

        // se for compartilhada, cria registro e participantes
        if ($dto->is_shared && !empty($dto->shared_participants)) {
            $shared = \Modules\Phamani\Models\SharedTransaction::create([
                'transaction_id' => $transaction->id,
                'user_id'        => Auth::id(),
                'total_amount'   => $transaction->amount,
                'notes'          => null,
            ]);

            foreach ($dto->shared_participants as $p) {
                $pct = (int) $p->percentage;
                $amount = round($transaction->amount * ($pct / 100), 2);

                \Modules\Phamani\Models\SharedTransactionParticipant::create([
                    'shared_transaction_id' => $shared->id,
                    'name'                  => $p->name,
                    'amount'                => $amount,
                    'percentage'            => $pct,
                ]);
            }
        }

        return $transaction;
    }
}
