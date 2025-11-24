<?php

namespace Modules\Memories\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Modules\Memories\Models\Memorie;
use Modules\Memories\Events\MemoryLikeUpdated;
use Modules\Memories\Notifications\MemoryLiked;

class LikeController extends Controller
{
    public function store(Memorie $memory)
    {
        $memory->likes()->attach(Auth::id());

        if ($memory->user_id !== Auth::id()) {
            $memory->user->notify(new MemoryLiked(Auth::user(), $memory));
        }
        
        broadcast(new MemoryLikeUpdated($memory->fresh()));
        return back();
    }

    public function destroy(Memorie $memory)
    {
        $memory->likes()->detach(Auth::id());
        broadcast(new MemoryLikeUpdated($memory->fresh()));
        return back();
    }
}
