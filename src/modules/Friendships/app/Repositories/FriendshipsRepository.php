<?php

namespace Modules\Friendships\Repositories;

use App\Models\User;
use App\Repositories\Base\CoreRepository;
use Illuminate\Database\Eloquent\Collection;
use Modules\Authentication\Interfaces\Repositories\IAuthenticationRepository;
use Modules\Friendships\Interfaces\Repositories\IFriendshipsRepository;
use Modules\Friendships\Models\Friendship;

class FriendshipsRepository extends CoreRepository implements IFriendshipsRepository
{
    protected IAuthenticationRepository $userRepository;

    public function __construct(Friendship $model, IAuthenticationRepository $userRepository)
    {
        parent::__construct($model);
        $this->userRepository = $userRepository;
    }

    public function findUserByTag(string $tag): ?User
    {
        // Valida o formato para evitar erros
        if (!str_contains($tag, '#')) {
            return null;
        }

        [$username, $discriminator] = explode('#', $tag, 2);

        return $this->userRepository->findUserByUsernameAndDiscriminator($username, $discriminator);
    }

    public function createRequest(User $sender, User $receiver): Friendship
    {w
        return $this->create([
            'user_id' => $sender->id,
            'friend_id' => $receiver->id,
            'status' => 'pending',
        ]);
    }

    public function findExistingFriendship(User $user1, User $user2): ?Friendship
    {
        return $this->model
            ->where(function ($query) use ($user1, $user2) {
                $query->where('user_id', $user1->id)->where('friend_id', $user2->id);
            })
            ->orWhere(function ($query) use ($user1, $user2) {
                $query->where('user_id', $user2->id)->where('friend_id', $user1->id);
            })
            ->first();
    }

    public function getPendingRequestsFor(User $user): Collection
    {
        return $user->friendRequestsReceived()->with('sender')->get();
    }

    public function findPendingRequestById(string $friendshipId, User $receiver): ?Friendship
    {
        return $this->model
            ->where('id', $friendshipId)
            ->where('friend_id', $receiver->id)
            ->where('status', 'pending')
            ->first();
    }

}