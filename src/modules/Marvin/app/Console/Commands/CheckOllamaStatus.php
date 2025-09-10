<?php

namespace Modules\Marvin\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Cache;
use Modules\Marvin\Events\OllamaStatusUpdated;
use Modules\Marvin\Services\OllamaService;

class CheckOllamaStatus extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'marvin:check-status';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Verifica o status do serviço Ollama e transmite um evento se houver mudança.';

    /**
     * Cache key for storing the status.
     *
     * @var string
     */
    const CACHE_KEY = 'ollama_service_status';

    /**
     * Execute the console command.
     */
    public function handle(OllamaService $ollamaService): int
    {
        $previousStatus = Cache::get(self::CACHE_KEY, 'unknown');
        $currentStatus = $ollamaService->isOnline() ? 'online' : 'offline';

        if ($previousStatus !== $currentStatus) {
            $this->info("Status do Ollama mudou de {$previousStatus} para {$currentStatus}. Disparando evento...");

            // Dispara o evento para ser transmitido pelo Reverb (será criado a seguir)
            OllamaStatusUpdated::dispatch($currentStatus);

            // Armazena o novo status no cache
            Cache::put(self::CACHE_KEY, $currentStatus);
        } else {
            $this->info("Status do Ollama permaneceu o mesmo ({$currentStatus}). Nenhum evento disparado.");
        }

        return \Symfony\Component\Console\Command\Command::SUCCESS;
    }
}
