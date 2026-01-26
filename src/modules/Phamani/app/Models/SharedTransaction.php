<?php

namespace Modules\Phamani\Models;

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
}
