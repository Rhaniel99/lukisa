<?php

use Illuminate\Support\Facades\Route;
use Modules\Lukisa\Http\Controllers\LukisaController;

Route::middleware(['auth:sanctum'])->prefix('v1')->group(function () {
    Route::apiResource('lukisas', LukisaController::class)->names('lukisa');
});
