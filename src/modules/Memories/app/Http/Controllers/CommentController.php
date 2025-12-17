<?php

namespace Modules\Memories\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Modules\Memories\DTOs\StoreCommentData;
use Modules\Memories\Interfaces\Services\ICommentService;

class CommentController extends Controller
{
    public function __construct(
        protected ICommentService $service
    ) {}

    public function store(StoreCommentData $r): RedirectResponse
    {
        $success = $this->service->save($r);

        if (!$success) {
            return back()->with('error', 'Erro ao salvar comentário.');
        }

        return to_route('memo.maps.index', [
            'place_id' => $r->place_id,
            'memory_id' => $r->memory_id,
            'comments_page' => 1,
        ])->with('success', 'Comentário adicionado!');
    }
}
