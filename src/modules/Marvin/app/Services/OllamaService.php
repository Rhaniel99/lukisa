<?php

namespace Modules\Marvin\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Http\Client\ConnectionException;
use Modules\Marvin\Interfaces\Services\IOllamaService;

class OllamaService implements IOllamaService
{
    protected string $url;
    protected string $model;
    protected string $systemPrompt;
    protected int $timeout;
    public function __construct()
    {
        $this->url = config('marvin.ollama.url');
        $this->model = config('marvin.ollama.model');
        $this->systemPrompt = config('marvin.personality');
        $this->timeout = config('marvin.ollama.timeout');
    }

    /**
     * Envia um prompt para o serviço Ollama e retorna a resposta.
     *
     * @param string $prompt
     * @return string
     * @throws ConnectionException
     */
    public function generate(string $prompt): string
    {
        $response = Http::timeout($this->timeout)
            ->post($this->url . '/api/generate', [
                'model' => $this->model,
                'system' => $this->systemPrompt,
                'prompt' => $prompt,
                'stream' => false,
            ]);

        // Lança uma exceção se a resposta não for bem-sucedida
        $response->throw();

        return $response->json()['response'];
    }
}
