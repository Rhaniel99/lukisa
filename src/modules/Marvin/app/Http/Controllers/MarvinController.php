<?php

namespace Modules\Marvin\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Modules\Marvin\Services\MarvinService;

class MarvinController extends Controller
{
    public function ask(Request $request, MarvinService $marvinService): RedirectResponse
    {
        $validated = $request->validate([
            'prompt' => ['required', 'string', 'max:1000'],
        ]);

        try {

            $response = $marvinService->ask($validated['prompt']);

            return redirect()->back()->with('marvin_response', $response);
        } catch (\Exception $e) {
            \Log::info($e);
            // Em caso de erro, redireciona de volta com uma mensagem de erro
            return redirect()->back()->with('marvin_error', 'Marvin está muito deprimido para responder agora.');
        }
    }
}
