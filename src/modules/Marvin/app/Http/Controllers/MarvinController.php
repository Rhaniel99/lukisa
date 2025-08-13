<?php

namespace Modules\Marvin\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Modules\Marvin\Services\OllamaService;

class MarvinController extends Controller
{
    public function ask(Request $request, OllamaService $ollamaService): RedirectResponse
    {
        $validated = $request->validate([
            'prompt' => ['required', 'string', 'max:1000'],
        ]);

        try {
            $response = $ollamaService->generate($validated['prompt']);

            // Redireciona de volta para a página anterior com a resposta
            return redirect()->back()->with('marvinResponse', $response);

        } catch (\Exception $e) {
            // Em caso de erro, redireciona de volta com uma mensagem de erro
            return redirect()->back()->with('marvinError', 'Marvin está muito deprimido para responder agora.');
        }
    }
}
