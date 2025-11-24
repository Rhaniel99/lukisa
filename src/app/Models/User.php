<?php

namespace App\Models;

use DB;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Modules\Friendships\Models\Friendship;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

/**
 * @mixin IdeHelperUser
 */
class User extends Authenticatable implements HasMedia
{
    use HasFactory, Notifiable, HasUuids, InteractsWithMedia;

    protected $fillable = [
        'name',
        'email',
        'password',
        'birth_date',
        'username',
        'discriminator',
        'status',
        'privacy',
        'allow_friend_requests',
    ];


    /**
     * Retorna a tag completa do usuário (ex: 'Rhaniel#3484').
     */
    public function getTagAttribute(): string
    {
        return "{$this->username}#{$this->discriminator}";
    }


    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'birth_date' => 'datetime',
            'allow_friend_requests' => 'boolean',
        ];
    }

    public function registerMediaConversions(Media $media = null): void
    {
        $this->addMediaConversion('thumb')
            ->width(150)
            ->height(150)
            ->sharpen(10)
            ->nonQueued();
    }

    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('avatars')
            ->useDisk('s3');
    }
    /**
     * Retorna os amigos do usuário (relacionamentos aceitos).
     * Este método é complexo porque a amizade é bidirecional.
     */
    public function friends(): Collection
    {
        // Pega os IDs de amizades aceitas onde o usuário é o remetente (user_id)
        $friendIdsSent = DB::table('friendships')
            ->where('user_id', $this->id)
            ->where('status', 'accepted')
            ->pluck('friend_id');

        // Pega os IDs de amizades aceitas onde o usuário é o destinatário (friend_id)
        $friendIdsReceived = DB::table('friendships')
            ->where('friend_id', $this->id)
            ->where('status', 'accepted')
            ->pluck('user_id');

        // Une todos os IDs e remove duplicados
        $allFriendIds = $friendIdsSent->merge($friendIdsReceived)->unique();

        if ($allFriendIds->isEmpty()) {
            return new Collection();
        }

        // Retorna uma coleção de Usuários com base nos IDs encontrados em uma única query
        return User::whereIn('id', $allFriendIds)->get();
    }

    /**
     * Retorna os pedidos de amizade que este usuário enviou.
     */
    public function friendRequestsSent(): HasMany
    {
        return $this->hasMany(Friendship::class, 'user_id')->where('status', 'pending');
    }

    /**
     * Retorna os pedidos de amizade que este usuário recebeu.
     */
    public function friendRequestsReceived(): HasMany
    {
        return $this->hasMany(Friendship::class, 'friend_id')->where('status', 'pending');
    }
}
