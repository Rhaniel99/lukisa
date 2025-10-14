<?php

namespace Modules\Friendships\Interfaces\Repositories;

use App\Interfaces\Repositories\ICoreRepository;
use App\Models\User;
use Illuminate\Database\Eloquent\Collection;
use Modules\Friendships\Models\Friendship;

/**
 * Interface IFriendshipsRepository
 * @package Modules\Friendships\Interfaces\Repositories
 */
interface IFriendshipsRepository extends ICoreRepository
{
    public function findUserByTag(string $tag): ?User;
    public function createRequest(User $sender, User $receiver): Friendship;
    public function findExistingFriendship(User $user1, User $user2): ?Friendship;
    public function getPendingRequestsFor(User $user): Collection;
    public function findPendingRequestById(string $friendshipId, User $receiver): ?Friendship;

}
