<?php

namespace Modules\Memories\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Place extends Model
{
    use HasFactory, HasUuids;

    /**
     * 1. Nome da Tabela
     * Informa ao Eloquent para usar a tabela com o schema que definimos.
     */
    protected $table = 'memories.places';

    /**
     * 2. Atributos "Mass Assignable"
     * Define quais colunas podem ser preenchidas em massa (ex: ao usar Place::create([...])).
     */
    protected $fillable = [
        'name',
        'address',
        'latitude',
        'longitude',
    ];

    /**
     * 3. Relacionamentos
     * Define como este model se conecta com outros.
     */

    /**
     * Um Lugar (Place) pode ter várias Memórias (Memories).
     */
    public function memories(): HasMany
    {
        return $this->hasMany(Memorie::class);
    }
}
