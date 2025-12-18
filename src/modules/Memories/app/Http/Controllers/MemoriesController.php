<?php

namespace Modules\Memories\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Modules\Memories\Actions\GetMemoriesForPlace;
use Modules\Memories\Actions\GetMemoryDetails;
use Modules\Memories\Actions\GetPlacePins;
use Modules\Memories\DTOs\StoreMemoryData;
use Modules\Memories\Interfaces\Services\IMemoriesService;
use Modules\Memories\Models\Memorie;
use Modules\Memories\View\MemoriesIndexView;
use Spatie\LaravelData\Lazy;

class MemoriesController extends Controller
{
    public function __construct(
        protected IMemoriesService $service
    ) {}

    public function index(
        Request $request,
        GetPlacePins $getPlacePins,
        GetMemoriesForPlace $getMemoriesForPlace,
        GetMemoryDetails $getMemoryDetails
    ) {
        $viewer = $request->user();

        return Inertia::render(
            'Auth/Memories/Index',
            (new MemoriesIndexView(
                places: $getPlacePins($viewer),

                selectedPlaceMemories: Lazy::when(
                    fn() => $request->filled('place_id'),
                    fn() => $getMemoriesForPlace(
                        $request->input('place_id'),
                        $viewer
                    )
                ),

                selectedMemoryDetails: Lazy::when(
                    fn() => $request->filled('memory_id'),
                    fn() => $getMemoryDetails(
                        $request->input('memory_id'),
                        $viewer,
                        (int) $request->input('comments_page', 1)
                    )
                )
            ))->toArray()
        );
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
