<?php

use Illuminate\Support\Facades\Route;
use Modules\Authentication\Http\Controllers\AuthenticationController;

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user/settings', [AuthenticationController::class, 'getUserSettings']);
});
