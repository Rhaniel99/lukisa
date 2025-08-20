<?php

namespace Modules\Marvin\Http\Controllers;

use App\Http\Controllers\Controller;
use Auth;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Pagination\CursorPaginator;
use Inertia\Inertia;
use Modules\Marvin\DTOs\ChatMessageData;
use Modules\Marvin\Models\ChatMessage;
use Modules\Marvin\Services\MarvinService;
use Modules\Marvin\ViewModels\ConversationTurnViewModel;

class MarvinController extends Controller
{
    /**
     * Renderiza a página de chat inicial com o histórico de mensagens do usuário.
     */
    public function index()
    {
        $messagesPaginator = ChatMessage::query()
            ->where('user_id', Auth::id())
            ->orderBy('created_at', 'desc')
            ->orderBy('id', 'desc')
            ->paginate(12)
            ->withQueryString();

        // 2. Agrupamos as mensagens em turnos (lógica inalterada).
        $turns = new Collection();
        $messages = $messagesPaginator->items();

        for ($i = 0; $i < count($messages) - 1; $i += 2) {
            $answer = $messages[$i];
            $question = $messages[$i + 1];

            if ($question->role === 'user' && $answer->role === 'assistant') {
                $turns->push(
                    new ConversationTurnViewModel(
                        id: $question->id,
                        question: ChatMessageData::from($question),
                        answer: ChatMessageData::from($answer)
                    )
                );
            }
        }

        // 3. Retornamos os dados (lógica inalterada).
        return Inertia::render('Auth/Marvin/Index', [
            'history' => [
                'data' => $turns->reverse()->values(),
                'links' => $messagesPaginator->linkCollection(),
                'meta' => [
                    'current_page' => $messagesPaginator->currentPage(),
                    'from' => $messagesPaginator->firstItem(),
                    'last_page' => $messagesPaginator->lastPage(),
                    'path' => $messagesPaginator->path(),
                    'per_page' => $messagesPaginator->perPage() / 2, // Ajustamos para turnos
                    'to' => $messagesPaginator->lastItem(),
                    'total' => $messagesPaginator->total(),
                    'next_page_url' => $messagesPaginator->nextPageUrl(), // A chave para o frontend
                ],
            ],
        ]);
    }

    /**
     * Recebe uma pergunta do usuário, processa com o MarvinService e redireciona.
     */
    public function ask(Request $request, MarvinService $marvinService): RedirectResponse
    {
        $validated = $request->validate([
            'prompt' => ['required', 'string', 'max:4000'],
        ]);

        $userId = Auth::id();

        try {
            // Usando o método 'ask' unificado que gerencia histórico e RAG.
            $marvinService->ask($validated['prompt'], (string) $userId);

        } catch (\Exception $e) {
            \Log::error('Erro no MarvinController@ask: ' . $e->getMessage());

            return redirect()->back()->with('error', 'Marvin está muito deprimido para responder agora. Tente novamente mais tarde.');
        }

        // Apenas redireciona de volta. O Inertia vai recarregar as props
        // e obter o histórico de mensagens atualizado, mostrando a pergunta e a resposta.
        return redirect()->route('marvin.index');
    }
}
