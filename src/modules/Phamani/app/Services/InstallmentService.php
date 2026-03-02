<?php

namespace Modules\Phamani\Services;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Modules\Phamani\DTOs\Transaction\StoreTransactionData;
use Modules\Phamani\Interfaces\Services\IInstallmentService;
use Modules\Phamani\Interfaces\Repositories\IInstallmentRepository;
use Modules\Phamani\Interfaces\Repositories\ITransactionRepository;
use Modules\Phamani\Interfaces\Repositories\IAccountRepository;
use Modules\Phamani\Interfaces\Services\ITagService;
use Modules\Phamani\Models\Installment;
use Modules\Phamani\Traits\AppliesSharing;

class InstallmentService implements IInstallmentService
{
    use AppliesSharing;

    public function __construct(
        protected IInstallmentRepository $installments,
        protected ITransactionRepository $transactions,
        protected IAccountRepository $accounts,
        protected ITagService $tagService
    ) {}

    public function createInstallment(StoreTransactionData $dto): Installment
    {
        return DB::transaction(function () use ($dto) {

            $installmentsCount = (int) ($dto->installments_count ?? 0);
            if ($installmentsCount < 2) {
                throw new \InvalidArgumentException('installments_count inválido.');
            }

            $installmentAmount = $this->calculateInstallmentAmount($dto->amount, $installmentsCount);

            $installment = $this->installments->create([
                'user_id'            => Auth::id(),
                'name'               => $dto->description,
                'total_amount'       => $dto->amount,
                'installment_amount' => $installmentAmount,
                'installments'       => $installmentsCount,
                'start_date'         => $dto->date,
                'end_date'           => now()->parse($dto->date)->addMonths($installmentsCount - 1),
                'status'             => 'active',
            ]);

            $this->generateTransactions($installment, $dto);

            $firstTransaction = $this->transactions->query()
                ->where('installment_id', $installment->id)
                ->orderBy('date')
                ->first();

            if (!$firstTransaction) {
                throw new \RuntimeException('Não foi possível localizar a primeira parcela gerada.');
            }

            // aplica saldo somente da primeira parcela (já com real_amount ajustado pelo sharing)
            $this->accounts->applyTransaction(
                $dto->account_id,
                $firstTransaction->real_amount,
                $dto->type
            );

            return $installment;
        });
    }

    private function generateTransactions(Installment $installment, StoreTransactionData $dto): void
    {
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

            $this->tagService->syncTransactionTags($tx, $dto->tags ?? []);

            // ✅ aplica compartilhamento por parcela (atualiza real_amount + cria shared_* se necessário)
            $this->applySharingIfNeeded($tx, $dto);
        }
    }

    private function calculateInstallmentAmount(float $total, int $installments): float
    {
        return round($total / $installments, 2);
    }
}