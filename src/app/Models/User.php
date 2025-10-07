<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

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
        'status'
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
    /**
     * Retorna os amigos do usuário (relacionamentos aceitos).
     * Este método é complexo porque a amizade é bidirecional.
     */
    public function friends()
    {
        // Amigos que o usuário adicionou
        $friendsOfMine = $this->belongsToMany(User::class, 'friendships', 'user_id', 'friend_id')
            ->wherePivot('status', 'accepted')
            ->withTimestamps();

        // Amigos que adicionaram o usuário
        $friendOf = $this->belongsToMany(User::class, 'friendships', 'friend_id', 'user_id')
            ->wherePivot('status', 'accepted')
            ->withTimestamps();

        // Une as duas coleções
        return $friendsOfMine->get()->merge($friendOf->get());
    }

    public function friendRequestsSent(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'friendships', 'user_id', 'friend_id')
            ->wherePivot('status', 'pending');
    }

    public function friendRequestsReceived(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'friendships', 'friend_id', 'user_id')
            ->wherePivot('status', 'pending');
    }
}
