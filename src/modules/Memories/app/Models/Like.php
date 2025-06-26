<?php

namespace Modules\Memories\Models;

use Illuminate\Database\Eloquent\Relations\Pivot;
// use Modules\Memories\Database\Factories\LikeFactory;

class Like extends Pivot
{
    /**
     * A tabela associada ao model, com o schema.
     *
     * @var string
     */
    protected $table = 'memories.likes';

    /**
     * Indica se o model tem timestamps (updated_at).
     * Como só temos created_at, definimos como false para evitar erros.
     * O 'created_at' será gerenciado pelo banco de dados ou manualmente.
     *
     * @var bool
     */
    public $timestamps = false;

    protected $fillable = [
        'user_id',
        'memory_id',
        'created_at',
    ];
}
