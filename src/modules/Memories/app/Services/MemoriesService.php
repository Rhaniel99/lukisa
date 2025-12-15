<?php

namespace Modules\Memories\Services;

use Auth;
use DB;
use Exception;
use Log;
use Modules\Memories\DTOs\StoreMemoryData;
use Modules\Memories\Interfaces\Repositories\IMemoriesRepository;
use Modules\Memories\Interfaces\Services\IMemoriesService;

class MemoriesService implements IMemoriesService
{

    protected IMemoriesRepository $memoryRepository;

    public function __construct(IMemoriesRepository $memoryRepository)
    {
        $this->memoryRepository = $memoryRepository;
    }

    public function saveMemories(StoreMemoryData $r): bool
    {
        try {

            DB::beginTransaction();
            // ? Passo 1: Encontrar ou criar o Place usando o método dedicado.
            $place = $this->memoryRepository->findOrCreatePlace(
                $r->latitude,
                $r->longitude,
                $r->place_name
            );

            // ? Passo 2: Criar a Memory usando o outro método dedicado.
            $memory = $this->memoryRepository->createMemory(
                $r,
                $place->id,
                Auth::id()
            );

            // ? Passo 3: Anexar a mídia.
            if ($r->media) {
                $memory->addMedia($r->media)
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
