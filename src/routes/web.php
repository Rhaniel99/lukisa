<?php

use Illuminate\Support\Facades\Route;

Route::get('/', fn() => inertia('Public/Home'))->name('home');

Route::get('send', function () {
    $message['status'] = request()->query('status', 'success');
    $message['body'] = 'Mensagem padrao notificação...';

    $u = \App\Models\User::first();

    $u->notify(new \App\Notifications\MessageTestNotification($message));

    return 'Notificacao enviada';
});
