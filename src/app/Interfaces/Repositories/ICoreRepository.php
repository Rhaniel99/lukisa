<?php

namespace App\Interfaces\Repositories;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Collection;

interface ICoreRepository
{
    /**
     * Retorna todos os registros.
     */
    public function all(array $columns = ['*']): Collection;

    /**
     * Encontra um registro pelo seu ID.
     */
    public function find(int|string $id): ?Model;

    /**
     * Cria um novo registro.
     */
    public function create(array $data): Model;

    /**
     * Atualiza um registro existente.
     */
    public function update(int|string $id, array $data): bool;

    /**
     * Deleta um registro.
     */
    public function delete(int|string $id): bool;
}