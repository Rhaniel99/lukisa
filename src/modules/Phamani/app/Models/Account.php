<?php

namespace Modules\Phamani\Models;

use Illuminate\Database\Eloquent\Relations\HasMany;

class Account extends ModuleBaseModel
{
    protected string $tableName = 'accounts';


    protected $fillable = [
        'user_id',
        'name',
        'type',
        'balance'
    ];

    protected $casts = [
        'balance' => 'decimal:2',
    ];

    /* ---------------- Relationships ---------------- */

    public function transactions(): HasMany
    {
        return $this->hasMany(Transaction::class);
    }

    public function recurringTransactions(): HasMany
    {
        return $this->hasMany(RecurringTransaction::class);
    }
}
