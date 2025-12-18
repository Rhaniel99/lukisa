<?php

use Illuminate\Support\Facades\Route;
use Modules\Memories\Http\Controllers\CommentController;
use Modules\Memories\Http\Controllers\LikeController;
use Modules\Memories\Http\Controllers\MemoriesController;

Route::middleware(['auth', 'check.profile'])->group(function () {
    Route::get('/memories-maps', [MemoriesController::class, 'index'])->name('memo.maps.index');
    // Route::get('/memories-maps/{memory}', [MemoriesController::class, 'show'])->name('memo.maps.show');
    Route::post('/memories-maps', [MemoriesController::class, 'store'])->name('memo.maps.store');
    Route::delete('/memories-maps/{memory}', [MemoriesController::class, 'destroy'])->name('memo.maps.destroy');

    // Route::inertia('/memories-maps', 'Auth/Memories/Index')->name('memo.maps.index');

    // Route::resource('memories', MemoriesController::class)->names('memories');

    Route::post('/memories-maps/{memory}/like', [LikeController::class, 'store'])->name('memories.like');
    Route::delete('/memories-maps/{memory}/unlike', [LikeController::class, 'destroy'])->name('memories.unlike');

    Route::post('/memories-maps/{memory}/comments', [CommentController::class, 'store'])->name('memo.comments.store');
});
