<?php

namespace Modules\Marvin\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Inertia\Inertia;
use Inertia\Response;
use Modules\Marvin\DTOs\AskRequest;
use Modules\Marvin\Jobs\ProcessMarvinQuestionJob;
use Modules\Marvin\Services\ChatService;
use Modules\Marvin\Services\OllamaService;

class MarvinController extends Controller
{
    /**
     * Recebe uma pergunta do usuário, despacha para a fila e retorna uma resposta de redirecionamento.
     */
    public function ask(AskRequest $data): RedirectResponse
    {
        ProcessMarvinQuestionJob::dispatch(
            $data->prompt,
            (string) Auth::id()
        );

        // Redireciona de volta para a página anterior. O Inertia interceptará isso.
        return redirect()->back();
    }

    /**
     * Busca as últimas 6 mensagens para o modal de chat.
     */
    public function messages(ChatService $chatService, OllamaService $ollamaService): Response
    {
        $messages = $chatService->getRecentMsg((string) Auth::id());

        $status = Cache::remember(
            'ollama_service_status',
            3,
            fn() => $ollamaService->isOnline() ? 'online' : 'offline'
        );

        return Inertia::render('Auth/Lukisa/Index', [
            'marvinMessages' => $messages,
            'ollamaStatus' => $status,
        ]);
    }
}
