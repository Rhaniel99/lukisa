<?php

namespace App\Inertia;

use Illuminate\Http\Request;
use Modules\Memories\DTOs\UserData;

class SettingsUserProps
{
    public static function make(Request $request): ?UserData
    {
        if (!$user = $request->user()) {
            return null;
        }

        return UserData::from($user)->include(
            'email',
            'fullname',
            'birthDate',
            'avatarHistory',
            'privacy',
            'allowFriendRequests'
        );
    }
}
