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
                if (!$request->user()) {
                    return null;
                }

                $friendshipService = app(\Modules\Friendships\Interfaces\Services\IFriendshipsService::class);
                // Assumindo que getPendingRequests retorna uma coleção de models Friendship,
                // cada um com uma relação 'sender' para o usuário que enviou o pedido.
                $pendingFriendships = $friendshipService->getPendingRequests($request->user());

                return [
                    'pending' => $pendingFriendships->map(function ($friendship) {
                        $sender = $friendship->sender;
                        return [
                            'id' => $sender->id,
                            'friendship_id' => $friendship->id, // ID do pedido de amizade
                            'username' => $sender->username,
                            'discriminator' => $sender->discriminator,
                            'avatar_url' => $sender->getFirstMedia('avatars')?->getTemporaryUrl(now()->addMinutes(5), 'thumb'),
                        ];
                    }),
                    'count' => $pendingFriendships->count(),
                ];
            },
            // SITUAÇÃO 2: Apenas para o modal (completo e sob demanda)
            'settings_user' => fn() => $request->user()
                ? UserData::from($request->user()) // <- Aqui, envie o DTO completo
                : null,
        ]);
    }
}
