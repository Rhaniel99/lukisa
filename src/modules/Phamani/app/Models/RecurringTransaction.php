<?php

namespace Modules\Phamani\Models;

use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class RecurringTransaction extends ModuleBaseModel
{

    protected string $tableName = 'recurring_transactions';

    protected $fillable = [
        'user_id',
        'account_id',
        'category_id',
        'name',
        'amount',
        'type',
        'frequency',
        'next_run',
        'end_date',
    ];

    protected $casts = [
        'amount' => 'decimal:2',
        'next_run' => 'date',
        'end_date' => 'date',
    ];

    /* ---------------- Relationships ---------------- */

    public function account(): BelongsTo
    {
        return $this->belongsTo(Account::class);
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function generatedTransactions(): HasMany
    {
        return $this->hasMany(Transaction::class, 'recurring_id');
    }
}
