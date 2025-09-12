<?php

namespace Modules\Marvin\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Inertia\Inertia;
use Inertia\Response;
use Modules\Marvin\DTOs\ChatMessageData;
use Modules\Marvin\Jobs\ProcessMarvinQuestionJob;
use Modules\Marvin\Models\ChatMessage;
use Modules\Marvin\Services\OllamaService;

class MarvinController extends Controller
{
    /**
     * Recebe uma pergunta do usuário, despacha para a fila e retorna uma resposta de redirecionamento.
     */
    public function ask(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'prompt' => ['required', 'string', 'max:4000'],
        ]);

        $userId = (string) Auth::id();
        $prompt = $validated['prompt'];

        // Despacha o job para processar a resposta da IA em segundo plano
        ProcessMarvinQuestionJob::dispatch($prompt, $userId);

        // Redireciona de volta para a página anterior. O Inertia interceptará isso.
        return redirect()->back();
    }

    /**
     * Busca as últimas 6 mensagens para o modal de chat.
     */
    public function messages(OllamaService $ollamaService): Response
    {
        $messages = ChatMessage::query()
            ->where('user_id', Auth::id())
            ->orderBy('created_at', 'desc')
            ->orderBy('id', 'desc')
            ->limit(6)
            ->get()
            ->map(fn (ChatMessage $message) => ChatMessageData::from($message));

        $status = Cache::get('ollama_service_status', fn () => $ollamaService->isOnline() ? 'online' : 'offline');

        return Inertia::render('Auth/Lukisa/Index', [
            'marvinMessages' => $messages->reverse()->values(),
            'ollamaStatus' => $status,
        ]);
    }
}
