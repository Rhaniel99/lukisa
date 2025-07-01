<?php

namespace Modules\Memories\Interfaces\Repositories;

use Modules\Memories\Models\Memorie;
use Modules\Memories\DTOs\StoreMemoryData;
use Modules\Memories\Models\Place;

/**
 * Interface IMemoriesRepository
 * @package Modules\Memories\Interfaces\Repositories
 */
interface IMemoriesRepository {
    /**
     * Encontra um Place pelas coordenadas ou cria um novo se não existir.
     *
     * @param float $latitude
     * @param float $longitude
     * @return Place
     */
    public function findOrCreatePlace(float $latitude, float $longitude): Place;

    /**
     * Cria um novo registro de Memorie.
     *
     * @param StoreMemoryData $data O DTO ainda é útil para carregar os dados textuais.
     * @param integer $placeId O ID do Place associado.
     * @param integer $userId O ID do User que criou.
     * @return Memorie
     */
    public function createMemory(StoreMemoryData $data, int $placeId, int $userId): Memorie;
}
