<?php

namespace App\Repositories\Base;

use App\Interfaces\Repositories\ICoreRepository;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;

abstract class CoreRepository implements ICoreRepository
{
    /**
     * A instância do modelo Eloquent.
     * @var Model
     */
    protected $model;

    /**
     * O construtor injeta a instância do modelo.
     */
    public function __construct(Model $model)
    {
        $this->model = $model;
    }

    /**
     * Retorna todos os registros.
     */
    public function all(array $columns = ['*']): Collection
    {
        return $this->model->all($columns);
    }

    /**
     * Encontra um registro pelo seu ID.
     */
    public function find(int|string $id): ?Model
    {
        return $this->model->find($id);
    }

    /**
     * Cria um novo registro.
     */
    public function create(array $data): Model
    {
        return $this->model->create($data);
    }

    /**
     * Atualiza um registro existente.
     */
    public function update(int|string $id, array $data): bool
    {
        $record = $this->find($id);
        if ($record) {
            return $record->update($data);
        }
        return false;
    }

    /**
     * Deleta um registro.
     */
    public function delete(int|string $id): bool
    {
        $record = $this->find($id);
        if ($record) {
            return $record->delete();
        }
        return false;
    }

    /**
     * Executa a paginação em uma query Eloquent.
     */
    protected function paginateExec(
        Builder $query,
        int $size,
        int $page,
        ?string $orderBy,
        ?int $asc
    ): LengthAwarePaginator {
        $primaryKey = $this->model->getKeyName();
        $orderby = empty($orderBy) ? $primaryKey : mb_strtolower($orderBy);
        $direction = $asc == 1 ? 'asc' : 'desc';

        return $query->orderBy($orderby, $direction)->paginate(
            $size,
            ['*'],
            'page',
            $page
        );
    }

    /**
     * Retorna uma nova instância do Query Builder do modelo.
     *
     */
    public function query(): Builder
    {
        return $this->model->newQuery();
    }
}
