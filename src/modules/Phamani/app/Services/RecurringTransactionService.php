<?php

namespace Modules\Phamani\Services;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Modules\Phamani\DTOs\Transaction\StoreTransactionData;
use Modules\Phamani\Interfaces\Services\IRecurringTransactionService;
use Modules\Phamani\Interfaces\Repositories\IRecurringTransactionRepository;
use Modules\Phamani\Interfaces\Repositories\ITransactionRepository;
use Modules\Phamani\Interfaces\Repositories\IAccountRepository;
use Modules\Phamani\Models\RecurringTransaction;

class RecurringTransactionService implements IRecurringTransactionService
{
    public function __construct(
        protected IRecurringTransactionRepository $recurrings,
        protected ITransactionRepository $transactions,
        protected IAccountRepository $accounts,
    ) {}

    public function createRecurringTransaction(StoreTransactionData $dto): RecurringTransaction
    {
        return DB::transaction(function () use ($dto) {
            $normalizedFrequency = $this->normalizeFrequency($dto->frequency);

            $recurring = $this->recurrings->create([
                'user_id'     => Auth::id(),
                'account_id'  => $dto->account_id,
                'category_id' => $dto->category_id,
                'name'        => $dto->description,
                'amount'      => $dto->amount,
                'type'        => $dto->type,
                'frequency'   => $normalizedFrequency,
                'next_run'    => $this->calculateNextRun($dto->date, $normalizedFrequency),
            ]);

            // Primeira execução
            $this->transactions->create([
                'user_id'      => Auth::id(),
                'account_id'   => $dto->account_id,
                'category_id'  => $dto->category_id,
                'name'         => $dto->description,
                'description'  => $dto->description,
                'type'         => $dto->type,
                'amount'       => $dto->amount,
                'real_amount'  => $dto->amount,
                'date'         => $dto->date,
                'recurring_id' => $recurring->id,
            ]);

            $this->accounts->applyTransaction(
                $dto->account_id,
                $dto->amount,
                $dto->type
            );

            return $recurring;
        });
    }

    private function calculateNextRun(string $date, string $frequency): string
    {
        $base = now()->parse($date);

        return match ($frequency) {
            'daily'   => $base->addDay(),
            'weekly'  => $base->addWeek(),
            'monthly' => $base->addMonth(),
            'yearly'  => $base->addYear(),
            default   => throw new \DomainException(
                "Frequência inválida para cálculo: {$frequency}"
            ),
        };
    }


    private function normalizeFrequency(string $frequency): string
    {
        return match ($frequency) {
            'diario'  => 'daily',
            'semanal' => 'weekly',
            'mensal'  => 'monthly',
            'anual'   => 'yearly',

            // já normalizado
            'daily', 'weekly', 'monthly', 'yearly' => $frequency,

            default => throw new \InvalidArgumentException(
                "Frequência inválida: {$frequency}"
            ),
        };
    }
}
