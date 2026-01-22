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
use Modules\Phamani\Models\RecurringTransaction;

class TransactionService implements ITransactionService
{
    public function __construct(
        protected ITransactionRepository $repository,
        protected IAccountRepository $accountRepository,
        protected IInstallmentService $installmentService,
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
                return $this->installmentService->createFromTransaction($dto);
            }

            if ($dto->is_recurring) {
                return $this->createRecurring($dto);
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
        ]);

        $this->accountRepository->applyTransaction(
            $dto->account_id,
            $dto->amount,
            $dto->type
        );

        return $transaction;
    }


    private function createRecurring(StoreTransactionData $dto)
    {
        $recurring = RecurringTransaction::create([
            'user_id' => Auth::id(),
            'account_id' => $dto->account_id,
            'category_id' => $dto->category_id,
            'name' => $dto->description,
            'amount' => $dto->amount,
            'type' => $dto->type,
            'frequency' => $dto->frequency,
            'next_run' => $this->calculateNextRun($dto->date, $dto->frequency),
        ]);

        $transaction = $this->repository->create([
            'user_id' => Auth::id(),
            'account_id' => $dto->account_id,
            'category_id' => $dto->category_id,
            'name' => $dto->description,
            'description' => $dto->description,
            'type' => $dto->type,
            'amount' => $dto->amount,
            'date' => $dto->date,
            'is_recurring' => true,
            'recurring_id' => $recurring->id,
        ]);

        $this->accountRepository->applyTransaction(
            $dto->account_id,
            $dto->amount,
            $dto->type
        );

        return $transaction;
    }

    private function calculateNextRun(string $date, string $frequency): string
    {
        $base = now()->parse($date);

        return match ($frequency) {
            'diario' => $base->addDay(),
            'semanal' => $base->addWeek(),
            'mensal' => $base->addMonth(),
            'anual' => $base->addYear(),
            default => $base->addMonth(),
        };
    }
}
