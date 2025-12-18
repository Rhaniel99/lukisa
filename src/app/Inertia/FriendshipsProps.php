<?php

namespace App\Inertia;

use Illuminate\Http\Request;
use Modules\Friendships\Interfaces\Services\IFriendshipsService;
use Modules\Friendships\DTOs\PendingFriendData;
use Modules\Friendships\DTOs\FriendData;

class FriendshipsProps
{
    public static function make(Request $request): array
    {
        if (!$user = $request->user()) {
            return ['count' => 0];
        }

        /** @var IFriendshipsService $service */
        $service = app(IFriendshipsService::class);

        $data = [
            'count' => $service->getPendingRequestsCount($user),
        ];

        $includes = array_filter(
            explode(',', (string) $request->input('include'))
        );

        if (in_array('pending', $includes, true)) {
            $pending = $service->getPendingRequests($user);
            $data['pending'] = PendingFriendData::collect($pending);
        }

        if (in_array('accepted', $includes, true)) {
            $accepted = $service->getAcceptedFriends($user, 20, 0);
            $data['accepted'] = FriendData::collect($accepted);
        }

        return $data;
    }
}
