<?php

namespace Modules\Memories\Http\Controllers;

use App\Http\Controllers\Controller;
use Modules\Memories\Models\Memorie;
use Modules\Memories\Events\MemoryLikeUpdated; // ✅ Importar nosso evento

class LikeController extends Controller
{
    public function store(Memorie $memory)
    {
        $memory->likes()->attach(auth()->id());
        broadcast(new MemoryLikeUpdated($memory));
        return back();
    }

    public function destroy(Memorie $memory)
    {
        $memory->likes()->detach(auth()->id());
        broadcast(new MemoryLikeUpdated($memory));
        return back();
    }
}
