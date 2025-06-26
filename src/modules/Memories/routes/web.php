<?php

use Illuminate\Support\Facades\Route;
use Modules\Memories\Http\Controllers\MemoriesController;

Route::middleware(['auth', 'check.profile'])->group(function () {
    Route::get('/memories-maps', [MemoriesController::class, 'index'])->name('memo.maps.index');
    // Route::inertia('/memories-maps', 'Auth/Memories/Index')->name('memo.maps.index');

    Route::resource('memories', MemoriesController::class)->names('memories');
});
