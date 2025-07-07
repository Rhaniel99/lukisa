<?php

namespace Modules\Memories\Events;

use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Queue\SerializesModels;
use Modules\Memories\DTOs\CommentData;
use Modules\Memories\Models\Comment;

class CommentPosted implements ShouldBroadcast
{
    use InteractsWithSockets, SerializesModels;

    /**
     * O DTO do comentário que será enviado no broadcast.
     * Usar um DTO garante que o formato dos dados seja consistente.
     */
    public CommentData $comment;

    public function __construct(Comment $comment)
    {
        // Carregamos a relação 'user' para garantir que os dados do autor estejam disponíveis
        $comment->load('user');
        $this->comment = CommentData::fromModel($comment);
    }

    /**
     * Retorna o nome do evento para o frontend.
     */
    public function broadcastAs(): string
    {
        return 'comment.posted';
    }

    /**
     * Define o canal privado para o qual o evento será enviado.
     * Apenas usuários vendo esta memória receberão o evento.
     */
    public function broadcastOn(): array
    {
        // Usamos a propriedade 'memory_id' que existe no nosso DTO de comentário
        return [
            new PrivateChannel('memories.' . $this->comment->memory_id),
        ];
    }
}
