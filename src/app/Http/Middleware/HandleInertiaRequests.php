<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Inertia\Middleware;
use Modules\Memories\DTOs\UserData;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    public function share(Request $request): array
    {
        return array_merge(parent::share($request), [
            'auth' => fn() => $request->user()
                ? [
                    'user' => UserData::from($request->user())
                ]
                : null,

            'flash' => $this->buildFlashProps($request),
            'friendships' => fn() => $this->buildFriendshipsProps($request),
            'settings_user' => fn() => $request->user()
                ? UserData::from($request->user())
                ->include('email', 'fullname', 'birthDate', 'avatarHistory')
                : null,
        ]);
    }

    protected function buildFlashProps(Request $request): array
    {
        $flash = [];

        foreach (['success', 'error', 'info', 'warning'] as $type) {
            if (Session::has($type)) {
                $flash[$type] = [
                    'message' => Session::get($type),
                    'time' => now()->timestamp,
                ];
            }
        }

        return $flash;
    }

    /**
     * Constrói os dados de amizades (dinâmico via "include")
     */
    protected function buildFriendshipsProps(Request $request): array
    {
        if (!$user = $request->user()) {
            return ['count' => 0];
        }

        /** @var IFriendshipsService $friendshipService */
        $friendshipService = app(\Modules\Friendships\Interfaces\Services\IFriendshipsService::class);
        $includes = explode(',', $request->input('include', ''));

        $data = [
            'count' => $friendshipService->getPendingRequestsCount($user),
        ];

        if (in_array('pending', $includes)) {
            $pendingRequests = $friendshipService->getPendingRequests($user);
            $data['pending'] = \Modules\Friendships\DTOs\PendingFriendData::collect($pendingRequests);
        }

        if (in_array('accepted', $includes)) {
            $acceptedFriends = $friendshipService->getAcceptedFriends($user, 20, 0);
            $data['accepted'] = \Modules\Friendships\DTOs\FriendData::collect($acceptedFriends);
        }

        return $data;
    }
}
