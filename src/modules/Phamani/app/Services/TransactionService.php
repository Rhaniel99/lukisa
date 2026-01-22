<?php

namespace Modules\Phamani\Services;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Modules\Phamani\DTOs\Transaction\StoreTransactionData;
use Modules\Phamani\Interfaces\Repositories\ITransactionRepository;
use Modules\Phamani\Interfaces\Services\ITransactionService;
use Modules\Phamani\Interfaces\Repositories\IAccountRepository;
use Modules\Phamani\Models\Installment;
use Modules\Phamani\Models\RecurringTransaction;

class TransactionService implements ITransactionService
{
    public function __construct(
        protected ITransactionRepository $repository,
        protected IAccountRepository $accountRepository,
    ) {}

    public function create(StoreTransactionData $dto)
    {
        return DB::transaction(function () use ($dto) {

            if ($dto->is_installment) {
                return $this->createInstallment($dto);
            }

            if ($dto->is_recurring) {
                return $this->createRecurring($dto);
            }

            return $this->createSingleTransaction($dto);
        });
    }

    private function createSingleTransaction(StoreTransactionData $dto)
    {
        return $this->repository->create([
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
    }

    private function createInstallment(StoreTransactionData $dto)
    {
        $installmentAmount = round(
            $dto->amount / $dto->installments_count,
            2
        );

        $installment = Installment::create([
            'user_id' => Auth::id(),
            'name' => $dto->description,
            'total_amount' => $dto->amount,
            'installment_amount' => $installmentAmount,
            'installments' => $dto->installments_count,
            'start_date' => $dto->date,
            'end_date' => now()->parse($dto->date)->addMonths($dto->installments_count - 1),
            'status' => 'active',
        ]);

        foreach (range(1, $dto->installments_count) as $i) {
            $date = now()->parse($dto->date)->addMonths($i - 1);

            $this->repository->create([
                'user_id' => Auth::id(),
                'account_id' => $dto->account_id,
                'category_id' => $dto->category_id,
                'name' => "{$dto->description} ({$i}/{$dto->installments_count})",
                'description' => $dto->description,
                'type' => $dto->type,
                'amount' => $installmentAmount,
                'date' => $date,
                'is_installment' => true,
                'installment_id' => $installment->id,
            ]);
        }

        // ⚠️ aplica saldo apenas da PRIMEIRA parcela
        $this->accountRepository->applyTransaction(
            $dto->account_id,
            $installmentAmount,
            $dto->type
        );
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
