<?php

namespace Modules\Friendships\Interfaces\Services;

use App\Models\User;
use Illuminate\Database\Eloquent\Collection;
use Modules\Friendships\Models\Friendship;

/**
 * Interface IFriendshipsService
 * @package Modules\Friendships\Interfaces\Services
 */
interface IFriendshipsService {
    // public function sendRequest(User $sender, string $receiverTag): Friendship;
    // public function acceptRequest(string $friend_id, string $user_id): bool;
    public function sendRequest(string $user_id, string $receiverTag): Friendship;
    public function getPendingRequests(User $user): Collection;
    public function acceptRequest(string $friendship_id): bool;
    // public function acceptRequest(string $friendshipId, User $user): bool;
    public function rejectRequest(string $friendship_id): bool;
    // public function rejectRequest(string $friendshipId, User $user): bool;
    public function getPendingRequestsCount(User $user): int;
    public function getAcceptedFriends(User $user, int $limit = 20, int $offset = 0): Collection;
    public function getAcceptedFriendsCount(User $user): int;
    public function removeFriendToFriend(string $friend_id, string $user_id): bool;
    public function setFriendBlock(string $user_id, string $auth_user_id): bool;
}