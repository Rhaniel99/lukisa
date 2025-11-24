<?php

namespace App\Http\Middleware;

use Inertia\Middleware;
use Illuminate\Http\Request;
use Modules\Memories\DTOs\UserData;
use Illuminate\Support\Facades\Session;
use Modules\Friendships\Interfaces\Services\IFriendshipsService;

class HandleInertiaRequests extends Middleware
{
    protected $rootView = 'app';

    public function __construct(
        protected IFriendshipsService $friendshipService
    ) {}

    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    public function share(Request $request): array
    {
        return array_merge(parent::share($request), [
            // Métodos privados para encapsular a lógica
            'auth' => $this->getAuthProps($request),
            'flash' => $this->getFlashProps(),
            'friendships' => fn() => $this->getFriendshipsProps($request),
            'settings_user' => fn() => $this->getSettingsUserProps($request),
            'notifications' => function () use ($request) {
                if (!$user = $request->user()) {
                    return ['count' => 0];
                }

                $data = [
                    'count' => $user->unreadNotifications()->count(),
                ];

                // Se o front pedir 'include=notifications', carregamos a lista
                if ($request->input('include') === 'notifications') {
                    $data['list'] = $user->notifications()
                        ->latest()
                        ->limit(10)
                        ->get()
                        ->map(function ($n) {
                            // Recupera os dados brutos do banco
                            $notificationData = $n->data;

                            // --- LÓGICA DE HIDRATAÇÃO DO AVATAR ---
                            // Se não tiver avatar (porque não salvamos no banco), geramos agora.
                            if (!isset($notificationData['actor_avatar']) && isset($notificationData['actor_id'])) {
                                // Busca o usuário (actor) para gerar a URL assinada fresca
                                // O cache aqui seria bem-vindo, mas find() é rápido o suficiente para 10 itens
                                $actor = \App\Models\User::find($notificationData['actor_id']);

                                if ($actor) {
                                    $notificationData['actor_avatar'] = $actor->getFirstMedia('avatars')?->getTemporaryUrl(now()->addMinutes(60), 'thumb');
                                }
                            }
                            // --------------------------------------

                            return [
                                'id' => $n->id,
                                'read_at' => $n->read_at,
                                'data' => $notificationData, // Usamos os dados enriquecidos
                                'created_at' => $n->created_at->diffForHumans(),
                            ];
                        });
                }

                return $data;
            },
        ]);
    }

    /**
     * Retorna os dados básicos do usuário autenticado.
     */
    private function getAuthProps(Request $request): ?array
    {
        if (!$user = $request->user()) {
            return null;
        }

        return [
            'user' => UserData::from($user),
        ];
    }

    /**
     * Retorna os dados completos do usuário para o modal de configurações.
     * Carregado sob demanda (Lazy).
     */
    private function getSettingsUserProps(Request $request): ?UserData
    {
        if (!$user = $request->user()) {
            return null;
        }

        // Incluímos explicitamente os campos pesados/lazy
        return UserData::from($user)
            ->include('email', 'fullname', 'birthDate', 'avatarHistory', 'privacy', 'allowFriendRequests');
    }

    /**
     * Monta as mensagens flash da sessão.
     */
    private function getFlashProps(): array
    {
        $flash = [];
        $types = ['success', 'error', 'info', 'warning'];

        foreach ($types as $type) {
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
     * Lógica para carregar dados de amizade baseada na query string 'include'.
     */
    private function getFriendshipsProps(Request $request): array
    {
        if (!$user = $request->user()) {
            return ['count' => 0];
        }

        // Como injetamos o serviço no construtor, podemos usá-lo diretamente aqui
        $data = [
            'count' => $this->friendshipService->getPendingRequestsCount($user),
        ];

        $includes = explode(',', $request->input('include', ''));

        if (in_array('pending', $includes)) {
            $pendingRequests = $this->friendshipService->getPendingRequests($user);
            $data['pending'] = \Modules\Friendships\DTOs\PendingFriendData::collect($pendingRequests);
        }

        if (in_array('accepted', $includes)) {
            $acceptedFriends = $this->friendshipService->getAcceptedFriends($user, 20, 0);
            $data['accepted'] = \Modules\Friendships\DTOs\FriendData::collect($acceptedFriends);
        }

        return $data;
    }
}
