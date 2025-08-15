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
    protected array $options;

    public function __construct()
    {
        $this->url = config('marvin.ollama.url');
        $this->model = config('marvin.ollama.model');
        $this->systemPrompt = config('marvin.personality');
        $this->timeout = config('marvin.ollama.timeout');
        $this->options = config('marvin.ollama.options');
    }

    /**
     * Envia um prompt para o serviço Ollama e retorna a resposta.
     *
     * @param string $prompt
     * @return string
     * @throws ConnectionException
     */
    public function generate(string $prompt, ?string $systemPromptOverride = null, array $options = []): string
    {
        // Prepara o payload da requisição
        $payload = [
            'model' => $this->model,
            'prompt' => $prompt,
            'stream' => false,
            'options' => array_merge(config('marvin.ollama.options', []), $options),
        ];

        // Usa o system prompt de override se for fornecido, senão, usa a personalidade padrão
        $payload['system'] = $systemPromptOverride ?? $this->systemPrompt;

        $response = Http::timeout($this->timeout)
            ->post("{$this->url}/api/generate", $payload);

        $response->throw();

        return $response->json()['response'];
    }

    /**
     * Envia um histórico de mensagens para o serviço Ollama e retorna a nova resposta.
     *
     * @param array $messages Histórico da conversa
     * @return string A resposta do assistente
     */
    public function chat(array $messages): string
    {
        $response = Http::timeout($this->timeout)
            ->post("{$this->url}/api/chat", [
                'model' => $this->model,
                'messages' => $messages,
                'stream' => false,
                'options' => config('marvin.ollama.options'),
            ]);

        $response->throw();

        // A resposta do endpoint /api/chat vem dentro de 'message' -> 'content'
        return $response->json()['message']['content'];
    }
}
