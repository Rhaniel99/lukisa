<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    protected $appends = ['avatar_url']; 

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'birth_date',
        'username',
        'avatar',
        'status'
    ];

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
            'birth_date' => 'date',
        ];
    }

     public function getAvatarUrlAttribute(): ?string // ✅ Nome do Accessor
    {
        // Se o usuário não tiver um avatar definido, retorna null.
        if (empty($this->avatar)) {
            return null;
        }

        // Gera uma URL temporária para o arquivo no disco 's3' (seu MinIO)
        // que expira em 15 minutos.
        return \Storage::disk('s3')->temporaryUrl(
            $this->avatar,
            now()->addMinutes(15)
        );
    }
}
