<?php

namespace Modules\Phamani\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Modules\Phamani\DTOs\Category\StoreCategoryData;
use Modules\Phamani\Interfaces\Services\ICategoryService;

class CategoryController extends Controller
{
    public function __construct(
        protected ICategoryService $service,
    ) {}

    public function index()
    {
        return view('phamani::index');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('phamani::create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCategoryData $r)
    {
        $this->service->create(
            userId: Auth::id(),
            dto: $r
        );
        
        return back()->with('success', 'Categoria criada com sucesso!');
    }

    /**
     * Show the specified resource.
     */
    public function show($id)
    {
        return view('phamani::show');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        return view('phamani::edit');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id) {}

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id) {}
}
