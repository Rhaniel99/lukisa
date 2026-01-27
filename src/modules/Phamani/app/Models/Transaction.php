<?php

namespace Modules\Phamani\Models;

use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Transaction extends ModuleBaseModel
{
    protected string $tableName = 'transactions';

    protected $fillable = [
        'user_id',
        'account_id',
        'category_id',
        'name',
        'description',
        'type',
        'amount',
        'real_amount',
        'date',
        'recurring_id',
        'installment_id',
        'is_shared',
    ];

    protected $casts = [
        'amount' => 'decimal:2',
        'date' => 'date',
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

    public function installment(): BelongsTo
    {
        return $this->belongsTo(Installment::class);
    }

    public function recurring(): BelongsTo
    {
        return $this->belongsTo(RecurringTransaction::class, 'recurring_id');
    }

    public function tags(): BelongsToMany
    {
        return $this->belongsToMany(
            Tag::class,
            config('phamani.database.schema') . '.transaction_tags'
        );
    }

    public function shared()
    {
        return $this->hasOne(SharedTransaction::class);
    }
}
