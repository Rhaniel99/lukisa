<?php

use Illuminate\Support\Facades\Route;
use Modules\Friendships\Http\Controllers\FriendshipsController;

Route::middleware(['auth:sanctum'])->prefix('v1')->group(function () {
    Route::apiResource('friendships', FriendshipsController::class)->names('friendships');
});
