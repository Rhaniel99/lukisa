<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Inertia\Middleware;
use Modules\Friendships\Interfaces\Services\IFriendshipsService;
use Modules\Memories\DTOs\UserData;

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
