<?php

namespace Modules\Marvin\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use Modules\Marvin\DTOs\ChatMessageData;

class NewMarvinMessageReceived implements ShouldBroadcastNow
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    /**
     * The new message data.
     *
     * @var ChatMessageData
     */
    public $message;

    /**
     * The user ID to broadcast to.
     *
     * @var string
     */
    private $userId;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct(ChatMessageData $message, string $userId)
    {
        $this->message = $message;
        $this->userId = $userId;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        return new PrivateChannel('marvin.user.' . $this->userId);
    }

    /**
     * The name of the event to broadcast.
     *
     * @return string
     */
    public function broadcastAs()
    {
        return 'marvin.new-message';
    }
}
