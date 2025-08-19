<?php

namespace Modules\Memories\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Modules\Memories\Models\Memorie;
// use Modules\Memories\Database\Factories\CommentFactory;

class Comment extends Model
{
    use HasFactory, HasUuids;

    /**
     * 1. Nome da Tabela
     */
    protected $table = 'memories.comments';

    /**
     * 2. Atributos "Mass Assignable"
     */
    protected $fillable = [
        'content',
        'user_id',
        'memory_id',
    ];

    /**
     * 3. Relacionamentos
     */

    /**
     * Um Comentário (Comment) pertence a um Usuário (User).
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Um Comentário (Comment) pertence a uma Memória (Memory).
     */
    public function memory(): BelongsTo
    {
        return $this->belongsTo(Memorie::class, 'memory_id');
    }
}
