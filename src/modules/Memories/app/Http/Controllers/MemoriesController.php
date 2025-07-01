<?php

namespace Modules\Memories\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Modules\Memories\DTOs\StoreMemoryData;
use Modules\Memories\Interfaces\Services\IMemoriesService;
use Modules\Memories\ViewModels\MemoriesIndexViewModel;

class MemoriesController extends Controller
{
    protected IMemoriesService $memoryService;

    public function __construct(IMemoriesService $memoryService)
    {
        $this->memoryService = $memoryService;
    }

    public function index(Request $request)
    {
        return Inertia::render('Auth/Memories/Index', MemoriesIndexViewModel::fromRequest($request));
    }

    public function store(StoreMemoryData $r)
    {
        $success = $this->memoryService->saveMemories($r);

        if (!$success) {
            return back()->with('error', 'Ocorreu um erro. Por favor, tente novamente.');
        }

        return back()->with('success', 'Memoria salva com sucesso!');

        // return to_route('memo.maps.index')->with('success', 'Memoria salva com sucesso!');
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
    public function update(Request $request, $id)
    {
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
    }
}
