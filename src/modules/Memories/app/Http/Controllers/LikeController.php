<?php

namespace Modules\Memories\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Modules\Memories\Models\Memorie;
use Modules\Memories\Services\LikeService;

class LikeController extends Controller
{
    public function __construct(
        protected LikeService $service
    ) {}

    public function store(Memorie $memory)
    {
        $this->service->like(Auth::user(), $memory);
        return back();
    }

    public function destroy(Memorie $memory)
    {
        $this->service->unlike(Auth::user(), $memory);
        return back();
    }
}
