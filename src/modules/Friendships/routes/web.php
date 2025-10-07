<?php

use Illuminate\Support\Facades\Route;
use Modules\Friendships\Http\Controllers\FriendshipsController;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::resource('friendships', FriendshipsController::class)->names('friendships');
});
