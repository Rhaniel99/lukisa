<?php

namespace Modules\Memories\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Modules\Memories\DTOs\MemoryDataResponse;
use Modules\Memories\DTOs\StoreMemoryData;
use Modules\Memories\Interfaces\Services\IMemoriesService;
use Modules\Memories\Models\Memorie;
use Modules\Memories\ViewModels\MemoriesIndexViewModel;

class MemoriesController extends Controller
{
    public function __construct(
        protected IMemoriesService $service
    ) {}

    public function index(Request $request)
    {
        return Inertia::render('Auth/Memories/Index', MemoriesIndexViewModel::fromRequest($request));
    }

    public function show(Memorie $memory)
    {
        // Carrega as relações necessárias que talvez não estivessem na carga inicial
        $memory->load(['user', 'comments.user']);

        return Inertia::render('Auth/Memories/Index', [
            // aqui você devolve explicitamente o que o front precisa
            'selectedMemoryDetails' => MemoryDataResponse::from($memory),
        ]);
    }

    // * OK
    public function store(StoreMemoryData $r)
    {
        $success = $this->service->saveMemories($r);

        if (!$success) {
            return back()->with('error', 'Ocorreu um erro. Por favor, tente novamente.');
        }

        return back()->with('success', 'Memoria salva com sucesso!');
    }

    public function destroy(Memorie $memory)
    {
        if ($memory->user_id !== Auth::id()) {
            abort(403);
        }

        $memory->delete();

        // Redireciona de volta com uma mensagem de sucesso.
        // O Inertia cuidará de atualizar a página.
        return back()->with('success', 'Memória removida com sucesso!');
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
}
