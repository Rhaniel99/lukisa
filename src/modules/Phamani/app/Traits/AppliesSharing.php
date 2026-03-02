<?php

namespace Modules\Phamani\Traits;

use Illuminate\Support\Facades\Auth;
use Modules\Phamani\DTOs\Transaction\StoreTransactionData;
use Modules\Phamani\Models\SharedTransaction;
use Modules\Phamani\Models\SharedTransactionParticipant;
use Modules\Phamani\Support\SharedSplit;

/**
 * Aplica a lógica de compartilhamento (divisão igual por centavos, resto fica com você)
 * em uma Transaction já criada.
 */
trait AppliesSharing
{
    protected function applySharingIfNeeded($transaction, StoreTransactionData $dto): void
    {
        // só aplica se realmente for compartilhado e tiver participantes
        if (!$dto->is_shared || empty($dto->shared_participants)) {
            return;
        }

        // garante que amount seja numérico
        $total = (float) $transaction->amount;
        $participantsCount = count($dto->shared_participants);

        // edge-case: se veio vazio por algum motivo, não aplica
        if ($participantsCount <= 0) {
            return;
        }

        // cria "shared_transactions"
        $shared = SharedTransaction::create([
            'transaction_id' => $transaction->id,
            'user_id'        => Auth::id(),
            'total_amount'   => $transaction->amount,
            'notes'          => null,
        ]);

        // split por centavos
        $split = SharedSplit::split($total, $participantsCount);

        // cria participantes (percentage agora é decimal(5,2) -> salva com 2 casas)
        foreach ($dto->shared_participants as $p) {
            SharedTransactionParticipant::create([
                'shared_transaction_id' => $shared->id,
                'name'                  => $p->name,
                'amount'                => round($split['participant_amount'], 2),
                'percentage'            => round($split['participant_pct'], 2),
            ]);
        }

        // atualiza a transaction (quanto VOCÊ paga)
        $transaction->update([
            'is_shared'   => true,
            'real_amount' => round($split['user_amount'], 2),
        ]);
    }
}