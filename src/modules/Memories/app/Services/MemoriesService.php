<?php

namespace Modules\Memories\Services;

use Auth;
use DB;
use Exception;
use Log;
use Modules\Memories\DTOs\StoreMemoryData;
use Modules\Memories\Interfaces\Repositories\IMemoriesRepository;
use Modules\Memories\Interfaces\Services\IMemoriesService;
use Modules\Memories\Interfaces\Services\IPlaceService;

class MemoriesService implements IMemoriesService
{
    public function __construct(
        protected IMemoriesRepository $repository,
        protected IPlaceService $placeService
    ) {}

    public function saveMemories(StoreMemoryData $data): bool
    {
        try {
            DB::beginTransaction();

            // ? Passo 1: Encontrar ou criar o Place usando o método dedicado.
            $place = $this->placeService->save($data->getLocationData());

            // ? Passo 2: Criar a Memory usando o outro método dedicado.
            $memory = $this->repository->createMemory(
                $data->title,
                $data->content,
                $place->id,
                Auth::id()
            );

            // ? Passo 3: Anexar a mídia.
            if ($data->media) {
                $memory->addMedia($data->media)
                    ->toMediaCollection('memories_media');
            }

            DB::commit();
            return true;
        } catch (Exception $e) {
            DB::rollBack();
            Log::error('Erro ao salvar memória: ' . $e->getMessage());
            return false;
        }
    }
}
