<?php

namespace Modules\Friendships\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
// use Modules\Friendships\Database\Factories\FriendshipFactory;

class Friendship extends Model
{
    use HasFactory;

    /**
     * O nome da tabela associado ao modelo.
     * É uma boa prática definir explicitamente, especialmente em módulos.
     *
     * @var string
     */
    protected $table = 'friendships';

    /**
     * Os atributos que são preenchíveis em massa.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        "user_id",
        "friend_id",
        "status",
    ];

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