<?php

namespace Modules\Marvin\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class ChatMessage extends Model
{
    use HasFactory, HasUuids;
    protected $table = "marvin.chat_messages";
    protected $fillable = [
        'user_id',
        'role',
        'content',
    ];
    protected $guarded = ['id'];
}
