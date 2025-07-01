<?php

namespace Modules\Memories\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Modules\Memories\Models\Comment;
use Modules\Memories\Models\Place;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

// use Modules\Memories\Database\Factories\MemoriesFactory;

class Memorie extends Model implements HasMedia
{
    use HasFactory, InteractsWithMedia; // Adiciona o trait da media-library

    protected $table = 'memories.memories';

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'title',
        'content',
        'user_id',
        'place_id',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Uma Memória (Memory) pertence a um Lugar (Place).
     */
    public function place(): BelongsTo
    {
        return $this->belongsTo(Place::class);
    }

    /**
     * Uma Memória (Memory) pode ter vários Comentários (Comments).
     */
    public function comments(): HasMany
    {
        return $this->hasMany(Comment::class, 'memory_id');
    }

    /**
     * Uma Memória (Memory) pode ser curtida por vários Usuários (Users).
     * Este é um relacionamento Muitos-para-Muitos.
     */
    public function likes(): BelongsToMany
    {
        // Precisamos especificar o nome completo da tabela pivô (com schema)
        return $this->belongsToMany(User::class, 'memories.likes', 'memory_id', 'user_id')
            ->withTimestamps(); // Para poder acessar o created_at da curtida
    }

    /**
     * Verifica se a memória foi curtida por um usuário específico.
     *
     * @param \App\Models\User|null $user
     * @return boolean
     */
    public function isLikedBy(?User $user): bool
    {
        if (!$user) {
            return false;
        }

        // Se você já carregou os likes, verifique na coleção para evitar nova query.
        if ($this->relationLoaded('likes')) {
            return $this->likes->contains($user);
        }

        // Caso contrário, faça uma query otimizada com exists().
        return $this->likes()->where('user_id', $user->id)->exists();
    }
}
