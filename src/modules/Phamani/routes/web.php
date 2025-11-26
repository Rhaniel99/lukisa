<?php

use Illuminate\Support\Facades\Route;
use Modules\Phamani\Http\Controllers\PhamaniController;

Route::middleware(['auth', 'check.profile'])->group(function () {
    Route::resource('phamani', PhamaniController::class)->names('phamani');
});
