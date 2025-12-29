<?php

namespace Modules\Phamani\Models;

use Illuminate\Database\Eloquent\Relations\HasMany;

class Installment extends ModuleBaseModel
{
    protected string $tableName = 'installments';

    protected $fillable = [
        'user_id',
        'name',
        'total_amount',
        'installment_amount',
        'installments',
        'start_date',
        'end_date',
        'status'
    ];

    protected $casts = [
        'total_amount' => 'decimal:2',
        'installment_amount' => 'decimal:2',
        'start_date' => 'date',
        'end_date' => 'date'
    ];


    /* ---------------- Relationships ---------------- */

    public function transactions(): HasMany
    {
        return $this->hasMany(Transaction::class);
    }
}
