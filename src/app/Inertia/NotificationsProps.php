<?php

namespace App\Inertia;

use Illuminate\Http\Request;
use App\Models\User;

class NotificationsProps
{
    public static function make(Request $request): array
    {
        if (!$user = $request->user()) {
            return ['count' => 0];
        }

        $data = [
            'count' => $user->unreadNotifications()->count(),
        ];

        if ($request->input('include') === 'notifications') {
            $data['list'] = $user->notifications()
                ->latest()
                ->limit(10)
                ->get()
                ->map(fn ($n) => self::hydrate($n));
        }

        return $data;
    }

    protected static function hydrate($notification): array
    {
        $data = $notification->data;

        if (!isset($data['actor_avatar']) && isset($data['actor_id'])) {
            if ($actor = User::find($data['actor_id'])) {
                $data['actor_avatar'] = $actor
                    ->getFirstMedia('avatars')
                    ?->getTemporaryUrl(now()->addMinutes(60), 'thumb');
            }
        }

        return [
            'id' => $notification->id,
            'read_at' => $notification->read_at,
            'created_at' => $notification->created_at->diffForHumans(),
            'data' => $data,
        ];
    }
}
