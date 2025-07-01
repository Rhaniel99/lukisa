<?php

namespace Modules\Memories\Http\Controllers;

use App\Http\Controllers\Controller;
use Modules\Memories\Models\Memorie;

class LikeController extends Controller
{
    public function store(Memorie $memory)
    {
        // Adiciona o like do usuário atual à memória
        $memory->likes()->attach(auth()->id());


        return back();
    }

    public function destroy(Memorie $memory)
    {
        // Remove o like do usuário atual da memória
        $memory->likes()->detach(auth()->id());

        return back();
    }
}
