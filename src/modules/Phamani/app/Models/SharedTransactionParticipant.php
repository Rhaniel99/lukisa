<?php

namespace Modules\Phamani\Models;

use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SharedTransactionParticipant extends ModuleBaseModel
{
    protected string $tableName = 'shared_transaction_participants';

    protected $fillable = [
        'shared_transaction_id',
        'name',
        'amount',
        'percentage'
    ];

    protected $casts = [
        'amount' => 'decimal:2',
    ];

    public function sharedTransaction(): BelongsTo
    {
        return $this->belongsTo(SharedTransaction::class);
    }
}
