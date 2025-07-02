<?php

use App\Models\User;
use App\Notifications\MessageTestNotification;
use Illuminate\Support\Facades\Route;

Route::middleware('guest')->group(function () {
    Route::get('/', fn() => inertia('Public/Home'))->name('home');
});

Route::get('send', function () {
    $message['status'] = request()->query('status', 'success');
    $message['body'] = 'Esta é uma mensagem de teste para todos os usuários!';

    // 1. Pega todos os usuários
    $users = User::all();

    // 2. Envia a notificação para cada um deles
    foreach ($users as $user) {
        $user->notify(new MessageTestNotification($message));
    }

    return 'Notificação enviada para todos os usuários.';
});
