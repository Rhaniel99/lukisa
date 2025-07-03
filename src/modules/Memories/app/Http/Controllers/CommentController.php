<?php

namespace Modules\Memories\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Modules\Memories\Models\Memorie;

class CommentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return view('memories::index');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('memories::create');
    }

    public function store(Request $request, Memorie $memory): RedirectResponse
    {
        // 1. Valida o conteúdo do comentário
        $validated = $request->validate([
            'content' => ['required', 'string', 'max:1000'],
        ]);

        // 2. Cria o comentário associado à memória e ao usuário logado
        $memory->comments()->create([
            'content' => $validated['content'],
            'user_id' => auth()->id(),
        ]);

        // 3. Redireciona de volta para a página anterior
        return redirect()->back()->with('success', 'Comentário adicionado!');
    }

    /**
     * Show the specified resource.
     */
    public function show($id)
    {
        return view('memories::show');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        return view('memories::edit');
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
