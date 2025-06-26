<?php

use Illuminate\Support\Facades\Route;
use Modules\Memories\Http\Controllers\MemoriesController;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::resource('memories', MemoriesController::class)->names('memories');
});
