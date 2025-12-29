<?php

namespace Modules\Phamani\Models;

use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Tag extends ModuleBaseModel
{
    protected string $tableName = 'tags';

    protected $fillable = [
        'user_id',
        'name',
        'color',
    ];


    /* ---------------- Relationships ---------------- */

    public function transactions(): BelongsToMany
    {
        return $this->belongsToMany(
            Transaction::class,
            config('phamani.database.schema') . '.transaction_tags'
        );
    }
}w
