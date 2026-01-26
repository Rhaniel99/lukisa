<?php

namespace Modules\Phamani\Models;


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
}
