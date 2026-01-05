<?php

namespace Modules\Memories\Services;

use Illuminate\Support\Facades\Auth;
use Modules\Memories\DTOs\StoreCommentData;
use Modules\Memories\Events\MemoryCommentUpdated;
use Modules\Memories\Interfaces\Repositories\ICommentRepository;
use Modules\Memories\Interfaces\Services\ICommentService;
use Modules\Memories\Models\Comment;
use Modules\Memories\Events\MemoryInteracted;

class CommentService implements ICommentService
{
    public function __construct(
        protected ICommentRepository $repository
    ) {}

    public function save(StoreCommentData $data): ?Comment
    {
        $userId = Auth::id();

        $memory = $this->repository
            ->create([
                'content'   => $data->content,
                'memory_id' => $data->memory_id,
                'user_id'   => $userId,
            ]);

        broadcast(new MemoryCommentUpdated(
            $memory->memory_id,
            $memory->memory->comments()->count()
        ));

        if ($memory->user_id !== $userId) {
            broadcast(new MemoryInteracted(
                $memory->user_id,
                Auth::user()->username,
                Auth::user()->avatar_url,
                'comment'
            ));
        }

        return $memory;
    }
}
