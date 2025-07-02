<?php
namespace App\Events;


use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class TesteReverbEvent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public string $message;

    public function __construct()
    {
        $this->message = 'O Reverb está funcionando!';
    }

    // 2. Defina o canal público que será usado para a transmissão
    public function broadcastOn(): array
    {
        return [
            new Channel('canal-de-teste'),
        ];
    }

    // 3. Defina o nome do evento que o frontend vai escutar
    public function broadcastAs(): string
    {
        return 'evento.teste';
    }
}
