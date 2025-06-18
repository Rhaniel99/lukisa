<?php

use Illuminate\Support\Facades\Route;
use Modules\Lukisa\Http\Controllers\LukisaController;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::resource('lukisa', LukisaController::class)->names('lukisa');
});
