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
    public function sendRequest(User $sender, string $receiverTag): Friendship;
    public function getPendingRequests(User $user): Collection;
    public function acceptRequest(string $friendshipId, User $user): bool;
    public function rejectRequest(string $friendshipId, User $user): bool;
}
