<?php

namespace Modules\Marvin\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
// use Modules\Marvin\Database\Factories\ChatMessageFactory;

class ChatMessage extends Model
{
    use HasFactory, HasUuids;

    private string $schema;

    public function __construct()
    {
        $this->schema = config('marvin.database.schema');
    }

    protected $table = "{$this->schema}.chat_messages";
    protected $fillable = [
        'user_id',
        'role',
        'content',
    ];
    protected $guarded = ['id'];
}
