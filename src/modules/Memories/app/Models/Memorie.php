<?php

namespace Modules\Memories\Models;

use App\Models\User;
use Spatie\MediaLibrary\MediaCollections\Models\Media;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Modules\Memories\Models\Comment;
use Modules\Memories\Models\Place;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Storage;

class Memorie extends Model implements HasMedia
{
    use HasFactory, InteractsWithMedia, HasUuids;


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
        return $this->belongsToMany(User::class, 'memories.likes', 'memory_id', 'user_id');
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

    // * Scope SQL para consultas de place e memorias visiveis, otimizado para pins.
    public function scopeVisibleTo(Builder $query, ?User $viewer): Builder
    {
        // Visitante: apenas público
        if (!$viewer) {
            return $query->whereHas(
                'user',
                fn($q) =>
                $q->where('privacy', 'public')
            );
        }

        return $query->where(function ($q) use ($viewer) {
            $q->where('user_id', $viewer->id)
                ->orWhereHas(
                    'user',
                    fn($u) =>
                    $u->where('privacy', 'public')
                        ->orWhere(function ($fq) use ($viewer) {
                            $fq->where('privacy', 'friends')
                                ->whereIn(
                                    'id',
                                    $viewer->friends()->pluck('id')
                                );
                        })
                );
        });
    }


    /**
     * Thumbnail público (notificações, dropdown, listas)
     */
    public function getPublicThumbnailUrl(int $minutes = 10): ?string
    {
        $media = $this->getFirstMedia('memories_media');

        if (!$media) {
            return null;
        }

        // ✅ Se a conversão EXISTIR de fato
        if ($media->hasGeneratedConversion('thumb')) {
            return $media->getTemporaryUrl(
                now()->addMinutes($minutes),
                'thumb'
            );
        }

        // 🔁 Fallback seguro: imagem original
        return $media->getTemporaryUrl(
            now()->addMinutes($minutes)
        );
    }

    /**
     * Imagem grande (modal, detalhes)
     */
    public function getPublicImageUrl(int $minutes = 10): ?string
    {
        $media = $this->getLatestMedia();

        if (!$media) {
            return null;
        }

        return $this->temporaryMediaUrl($media, null, $minutes);
    }

    /**
     * 🔒 Método interno centralizado
     */
    protected function temporaryMediaUrl(
        Media $media,
        ?string $conversion,
        int $minutes
    ): string {
        $path = $conversion
            ? $media->getPathRelativeToRoot($conversion)
            : $media->getPathRelativeToRoot();

        return Storage::disk($media->disk)->temporaryUrl(
            $path,
            now()->addMinutes($minutes)
        );
    }

    /**
     * Pega sempre a mídia mais recente
     */
    protected function getLatestMedia(): ?Media
    {
        return $this->getMedia('memories_media')
            ->sortByDesc('created_at')
            ->first();
    }

    /**
     * Conversions
     */
    public function registerMediaConversions(?Media $media = null): void
    {
        $this->addMediaConversion('thumb')
            ->width(150)
            ->height(150)
            ->sharpen(10)
            ->nonQueued();
    }
}
