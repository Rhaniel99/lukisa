<?php

namespace Modules\Memories\Services;

use Illuminate\Support\Facades\Auth;
use Modules\Memories\DTOs\StoreCommentData;
use Modules\Memories\Events\MemoryCommentUpdated;
use Modules\Memories\Interfaces\Repositories\ICommentRepository;
use Modules\Memories\Interfaces\Services\ICommentService;
use Modules\Memories\Models\Comment;
use Modules\Memories\Notifications\MemoryInteracted;

class CommentService implements ICommentService
{
    public function __construct(
        protected ICommentRepository $repository
    ) {}

    public function save(StoreCommentData $data): ?Comment
    {
        $user = Auth::user();

        $comment = $this->repository->create([
            'content'   => $data->content,
            'memory_id' => $data->memory_id,
            'user_id'   => $user->id,
        ]);

        $memory = $comment->memory;

        broadcast(new MemoryCommentUpdated(
            $memory->id,
            $memory->comments()->count()
        ));

        if ((string) $memory->user_id !== (string) $user->id) {
            $memory->user->notify(
                new MemoryInteracted(
                    actor: $user,
                    memory: $memory,
                    action: 'comment'
                )
            );

            // broadcast(new MemoryInteracted(
            //     $memory->user_id,
            //     $user->username,
            //     $user->getPublicAvatarUrl(),
            //     $memory->getPublicThumbnailUrl(),
            //     'comment',
            //     route('memo.maps.index', [
            //         'memory_id' => $memory->id,
            //         'place_id'  => $memory->place_id,
            //     ])
            // ));
        }

        return $comment;
    }
}
