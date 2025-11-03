<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
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
            // SITUAÇÃO 1: Para todas as páginas (leve)
            'auth' => fn() => $request->user()
                ? [
                    'user' => UserData::from($request->user())->except('email', 'fullname', 'birthDate')
                ]
                : null,

            'flash' => [
                'success' => fn() => $request->session()->get('success'),
                'error' => fn() => $request->session()->get('error'),
            ],
            'friendships' => function () use ($request) {
                if (!$user = $request->user()) {
                    return ['count' => 0];
                }

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
            },
            // SITUAÇÃO 2: Apenas para o modal (completo e sob demanda)
            'settings_user' => fn() => $request->user()
                ? UserData::from($request->user()) // <- Aqui, envie o DTO completo
                : null,
        ]);
    }
}
