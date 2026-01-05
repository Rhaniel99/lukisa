<?php

namespace Modules\Memories\Services;

use Illuminate\Support\Facades\Auth;
use Modules\Memories\DTOs\StoreCommentData;
use Modules\Memories\Events\MemoryCommentUpdated;
use Modules\Memories\Interfaces\Repositories\ICommentRepository;
use Modules\Memories\Interfaces\Services\ICommentService;
use Modules\Memories\Models\Comment;

class CommentService implements ICommentService
{
    public function __construct(
        protected ICommentRepository $repository
    ) {}

    public function save(StoreCommentData $data): ?Comment
    {
        $memory = $this->repository
            ->create([
                'content'   => $data->content,
                'memory_id' => $data->memory_id,
                'user_id'   => Auth::id(),
            ]);

        broadcast(new MemoryCommentUpdated(
            $memory->memory_id,
            $memory->memory->comments()->count()
        ));

        return $memory;
    }
}
