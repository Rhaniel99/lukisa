<?php

namespace Modules\Friendships\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
// use Modules\Friendships\Database\Factories\FriendshipFactory;

class Friendship extends Model
{
    use HasFactory, HasUuids;

    /**
     * O nome da tabela associado ao modelo.
     */
    protected $table = 'friendships';

    /**
     * Os atributos que são preenchíveis em massa.
     */
    protected $fillable = [
        "user_id",
        "friend_id",
        "status",
    ];

    /**
     * Define a relação com o usuário que enviou o pedido de amizade.
     */
    public function sender(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    /**
     * Define a relação com o usuário que recebeu o pedido de amizade.
     */
    public function receiver(): BelongsTo
    {
        return $this->belongsTo(User::class, 'friend_id');
    }

    // /**
    //  * Cria uma nova instância da factory para o modelo.
    //  *
    //  * @return \Modules\Friendships\Database\Factories\FriendshipFactory
    //  */
    // protected static function newFactory(): FriendshipFactory
    // {
    //     return FriendshipFactory::new();
    // }
}