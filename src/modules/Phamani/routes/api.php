<?php

use Illuminate\Support\Facades\Route;
use Modules\Phamani\Http\Controllers\PhamaniController;

Route::middleware(['auth:sanctum'])->prefix('v1')->group(function () {
    Route::apiResource('phamanis', PhamaniController::class)->names('phamani');
});
