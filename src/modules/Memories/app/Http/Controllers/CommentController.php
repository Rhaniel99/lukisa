<?php

namespace Modules\Memories\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Modules\Memories\Events\CommentPosted;
use Modules\Memories\Notifications\CommentPosted as CommentPostedNotification;
use Modules\Memories\Models\Memorie;

class CommentController extends Controller
{
    public function store(Request $request, Memorie $memory): RedirectResponse
    {
        // 1. Valida o conteúdo do comentário
        $validated = $request->validate([
            'content' => ['required', 'string', 'max:1000'],
        ]);

        $comment = $memory->comments()->create([ // Salve o novo comentário em uma variável
            'content' => $validated['content'],
            'user_id' => Auth::id(),
        ]);

        if ($memory->user_id !== Auth::id()) {
            $memory->user->notify(new CommentPostedNotification(Auth::user(), $memory));
        }

        // 2. Dispare o evento e use toOthers() para não enviá-lo de volta a quem comentou
        broadcast(new CommentPosted($comment));

        // 3. Redireciona de volta para a página anterior
        return redirect()->back()->with('success', 'Comentário adicionado!');
    }
}
