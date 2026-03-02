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
use Modules\Phamani\Interfaces\Services\ITagService;
use Modules\Phamani\Traits\AppliesSharing;

class TransactionService implements ITransactionService
{
    use AppliesSharing;

    public function __construct(
        protected ITransactionRepository $repository,
        protected IAccountRepository $accountRepository,
        protected IInstallmentService $installmentService,
        protected IRecurringTransactionService $recurringService,
        protected ITagService $tagService
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

            $transaction = $this->createSingleTransaction($dto);

            $this->tagService->syncTransactionTags($transaction, $dto->tags ?? []);

            return $transaction;
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
            'real_amount' => $dto->amount,
            'date'        => $dto->date,
            'is_shared'   => $dto->is_shared,
        ]);

        $this->applySharingIfNeeded($transaction, $dto);

        $this->accountRepository->applyTransaction(
            $dto->account_id,
            $transaction->real_amount,
            $dto->type
        );

        return $transaction;
    }
}
