<?php

use Illuminate\Support\Facades\Route;
use Modules\Lukisa\Http\Controllers\LukisaController;

Route::middleware(['auth', 'check.profile'])->group(function () {
    Route::resource('lukisa', LukisaController::class)->names('lukisa');
});
