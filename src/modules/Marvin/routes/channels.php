<?php

use Illuminate\Support\Facades\Broadcast;

/*
|--------------------------------------------------------------------------
| Broadcast Channels
|--------------------------------------------------------------------------
|
| Here you may register all of the event broadcasting channels that your
| application supports. The given channel authorization callbacks are
| used to check if an authenticated user can listen to the channel.
|
*/

Broadcast::channel('marvin.user.{userId}', function ($user, $userId) {
    // Ensures that a user can only listen to their own channel.
    return (int) $user->id === (int) $userId;
});
