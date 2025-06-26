<?php

use Illuminate\Support\Facades\Route;
use Modules\Memories\Http\Controllers\MemoriesController;

Route::middleware(['auth:sanctum'])->prefix('v1')->group(function () {
    Route::apiResource('memories', MemoriesController::class)->names('memories');
});
