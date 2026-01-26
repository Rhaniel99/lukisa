<?php

namespace Modules\Phamani\Models;

use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class SharedTransaction extends ModuleBaseModel
{
    protected string $tableName = 'shared_transactions';

    protected $fillable = [
        'transaction_id',
        'user_id',
        'total_amount',
        'notes'
    ];

    protected $casts = [
        'total_amount' => 'decimal:2',
    ];
    public function transaction(): BelongsTo
    {
        return $this->belongsTo(Transaction::class);
    }

    public function participants(): HasMany
    {
        return $this->hasMany(SharedTransactionParticipant::class);
    }
}
