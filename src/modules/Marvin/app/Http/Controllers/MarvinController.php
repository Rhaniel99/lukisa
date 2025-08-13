<?php

namespace Modules\Marvin\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Modules\Marvin\Services\OllamaService;

class MarvinController extends Controller
{
    public function ask(Request $request, OllamaService $ollamaService): JsonResponse
    {
        // 1. Validar a requisição para garantir que um prompt foi enviado
        $validated = $request->validate([
            'prompt' => ['required', 'string', 'max:1000'],
        ]);

        try {
            // 2. Usar o serviço para gerar a resposta
            // A injeção de dependência do Laravel nos dá o $ollamaService pronto para uso
            $response = $ollamaService->generate($validated['prompt']);

            // 3. Retornar a resposta em formato JSON
            return response()->json(['response' => $response]);

        } catch (\Exception $e) {
            // 4. Capturar qualquer erro (conexão, timeout, etc.) e retornar uma resposta de erro
            return response()->json([
                'error' => 'Marvin está muito deprimido para responder agora. Tente novamente mais tarde.',
                'details' => $e->getMessage()
            ], 500);
        }
    }
}
