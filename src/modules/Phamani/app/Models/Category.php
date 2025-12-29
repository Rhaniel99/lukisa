<?php

namespace Modules\Phamani\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Category extends Model
{
    protected string $tableName = 'categories';

    protected $fillable = [
        'user_id',
        'parent_id',
        'name',
        'type',
        'color',
        'icon',
        'is_default',
    ];

    /* ---------------- Hierarchy ---------------- */

    public function parent(): BelongsTo
    {
        return $this->belongsTo(self::class, 'parent_id');
    }

    public function children(): HasMany
    {
        return $this->hasMany(self::class, 'parent_id');
    }

    /* ---------------- Relationships ---------------- */

    public function transactions(): HasMany
    {
        return $this->hasMany(Transaction::class);
    }
}