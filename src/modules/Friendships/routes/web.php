<?php

use Illuminate\Support\Facades\Route;
use Modules\Friendships\Http\Controllers\FriendshipsController;

Route::middleware(['auth', 'check.profile'])->group(function () {
    // Rota para buscar todos os dados de amizade (incluindo pendentes)
    Route::get('/friends', [FriendshipsController::class, 'index'])->name('friends.index');

    // Rota para enviar um pedido de amizade
    Route::post('/friends', [FriendshipsController::class, 'store'])->name('friends.store');

    // Rota para ACEITAR um pedido de amizade
    Route::patch('/friends/{id}/accept', [FriendshipsController::class, 'accept'])->name('friends.accept');

    // Rota para RECUSAR/CANCELAR um pedido de amizade
    Route::delete('/friends/{id}', [FriendshipsController::class, 'destroy'])->name('friends.destroy');
});
