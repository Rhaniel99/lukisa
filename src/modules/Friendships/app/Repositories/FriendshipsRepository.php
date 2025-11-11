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

    public function createRequest(string $user_id, string $friend_id): Friendship
    {
        return $this->create([
            'user_id' => $user_id,
            'friend_id' => $friend_id,
            'status' => 'pending',
        ]);
    }

    public function findExistingFriendship(string $user_id, string $friend_id): ?Friendship
    {
        return $this->model
            ->where(function ($query) use ($user_id, $friend_id) {
                $query->where('user_id', $user_id)->where('friend_id', $friend_id);
            })->orWhere(function ($query) use ($user_id, $friend_id) {
                $query->where('user_id', $friend_id)->where('friend_id', $user_id);
            })->first();
    }

    public function getPendingRequestsFor(User $user): Collection
    {
        return $user->friendRequestsReceived()->with('sender')->get();
    }

    public function getPendingRequestsCountFor(User $user): int
    {
        return $this->model
            ->where('friend_id', $user->id)
            ->where('status', 'pending')
            ->count();
    }

    public function findPendingRequestById(string $friendship_id): ?Friendship
    {
        return $this->model
            ->where('id', $friendship_id)
            ->where('status', 'pending')
            ->first();
    }

    public function getAcceptedFriendsFor(User $user, int $limit = 20, int $offset = 0): Collection
    {
        return $this->model
            ->where('status', 'accepted')
            ->where(function ($query) use ($user) {
                $query->where('user_id', $user->id)
                    ->orWhere('friend_id', $user->id);
            })
            ->with(['sender', 'receiver'])
            ->offset($offset)
            ->limit($limit)
            ->get()
            ->map(function ($friendship) use ($user) {
                // Retorna o usuário que não é o usuário atual
                return $friendship->user_id === $user->id
                    ? $friendship->receiver
                    : $friendship->sender;
            });
    }

    public function getAcceptedFriendsCountFor(User $user): int
    {
        return $this->model
            ->where('status', 'accepted')
            ->where(function ($query) use ($user) {
                $query->where('user_id', $user->id)
                    ->orWhere('friend_id', $user->id);
            })
            ->count();
    }
}
