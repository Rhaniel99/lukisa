<?php

namespace App\Http\Middleware;

use Inertia\Middleware;
use Illuminate\Http\Request;
use Modules\Memories\DTOs\UserData;
use Illuminate\Support\Facades\Session;
use App\Inertia\NotificationsProps;
use App\Inertia\SettingsUserProps;
use App\Inertia\FriendshipsProps;


class HandleInertiaRequests extends Middleware
{
    protected $rootView = 'app';

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
            'friendships' => fn() => FriendshipsProps::make($request),
            'settings_user' => fn() => SettingsUserProps::make($request),
            'notifications' => fn() => NotificationsProps::make($request),

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
}
