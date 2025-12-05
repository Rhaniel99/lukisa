<?php

namespace Modules\Marvin\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Modules\Marvin\Events\NewMarvinMessageReceived;
use Modules\Marvin\Models\ChatMessage;
use Modules\Marvin\Services\MarvinService;

class ProcessMarvinQuestionJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * The user's question.
     *
     * @var string
     */
    public $prompt;

    /**
     * The ID of the user who asked the question.
     *
     * @var string
     */
    public $userId;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(string $prompt, string $userId)
    {
        $this->prompt = $prompt;
        $this->userId = $userId;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle(MarvinService $marvinService)
    {
        try {
            // Salva a pergunta do usuário, que agora é a única fonte da verdade.
            ChatMessage::create([
                'user_id' => $this->userId,
                'role' => 'user',
                'content' => $this->prompt,
            ]);

            // O serviço agora só processa e salva a resposta do assistente.
            $assistantMessage = $marvinService->ask($this->prompt, $this->userId);

            \Log::info($assistantMessage);

            // Se uma resposta foi recebida, broadcast it.
            if ($assistantMessage) {
                NewMarvinMessageReceived::dispatch($assistantMessage, $this->userId);
            }
        } catch (\Exception $e) {
            // Log do erro para depuração futura, sem impedir o fluxo.
            \Log::error('Error em ProcessMarvinQuestionJob: ' . $e->getMessage(), ['exception' => $e]);
        }
    }
}
