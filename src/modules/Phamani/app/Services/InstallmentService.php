<?php

namespace Modules\Phamani\Services;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Modules\Phamani\DTOs\Transaction\StoreTransactionData;
use Modules\Phamani\Interfaces\Services\IInstallmentService;
use Modules\Phamani\Interfaces\Repositories\IInstallmentRepository;
use Modules\Phamani\Interfaces\Repositories\ITransactionRepository;
use Modules\Phamani\Interfaces\Repositories\IAccountRepository;
use Modules\Phamani\Models\Installment;

class InstallmentService implements IInstallmentService
{
    public function __construct(
        protected IInstallmentRepository $installments,
        protected ITransactionRepository $transactions,
        protected IAccountRepository $accounts,
    ) {}

    public function createInstallment(StoreTransactionData $dto): Installment
    {
        return DB::transaction(function () use ($dto) {

            $installmentAmount = $this->calculateInstallmentAmount(
                $dto->amount,
                $dto->installments_count
            );

            $installment = $this->installments->create([
                'user_id'             => Auth::id(),
                'name'                => $dto->description,
                'total_amount'        => $dto->amount,
                'installment_amount'  => $installmentAmount,
                'installments'        => $dto->installments_count,
                'start_date'          => $dto->date,
                'end_date'            => now()
                    ->parse($dto->date)
                    ->addMonths($dto->installments_count - 1),
                'status'              => 'active',
            ]);

            $this->generateTransactions($installment, $dto);

            $firstTransaction = $this->transactions->query()
                ->where('installment_id', $installment->id)
                ->orderBy('date')
                ->first();


            // ✅ aplica saldo somente da primeira parcela
            $this->accounts->applyTransaction(
                $dto->account_id,
                $firstTransaction->real_amount,
                // $installmentAmount,
                $dto->type
            );

            return $installment;
        });
    }

    private function generateTransactions(
        Installment $installment,
        StoreTransactionData $dto
    ): void {
        foreach (range(1, $installment->installments) as $i) {
            $date = now()
                ->parse($installment->start_date)
                ->addMonths($i - 1)
                ->toDateString();


            $tx = $this->transactions->create([
                'user_id'        => Auth::id(),
                'account_id'     => $dto->account_id,
                'category_id'    => $dto->category_id,
                'name'           => "{$installment->name} ({$i}/{$installment->installments})",
                'description'    => $installment->name,
                'type'           => $dto->type,
                'amount'         => $installment->installment_amount,
                'real_amount'    => $installment->installment_amount,
                'date'           => $date,
                'installment_id' => $installment->id,
                'is_shared'      => $dto->is_shared,
            ]);

            if ($dto->is_shared && !empty($dto->shared_participants)) {
                $userShare = $tx->amount;

                $shared = \Modules\Phamani\Models\SharedTransaction::create([
                    'transaction_id' => $tx->id,
                    'user_id'        => Auth::id(),
                    'total_amount'   => $tx->amount,
                    'notes'          => null,
                ]);

                foreach ($dto->shared_participants as $p) {
                    $pct = (int) $p->percentage;
                    $amount = round($tx->amount * ($pct / 100), 2);
                    $userShare -= $amount;

                    \Modules\Phamani\Models\SharedTransactionParticipant::create([
                        'shared_transaction_id' => $shared->id,
                        'name'                  => $p->name,
                        'amount'                => $amount,
                        'percentage'            => $pct,
                    ]);
                }

                $tx->update([
                    'real_amount' => max($userShare, 0),
                ]);
            }
        }
    }

    private function calculateInstallmentAmount(
        float $total,
        int $installments
    ): float {
        return round($total / $installments, 2);
    }
}
