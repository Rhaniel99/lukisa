<?php

use App\Http\Controllers\AvatarController;
use App\Http\Controllers\NotificationController;
use App\Models\User;
use App\Notifications\MessageTestNotification;
use Illuminate\Support\Facades\Route;

Route::middleware('guest')->group(function () {
    Route::get('/', fn() => inertia('Public/Home'))->name('home');
});

Route::middleware('auth', 'check.profile')->group(function () {
    // Rotas de Notificação
    Route::post('/notifications/mark-all-read', [NotificationController::class, 'markAllRead'])
        ->name('notifications.mark-all-read');
    
    Route::patch('/notifications/{id}/read', [NotificationController::class, 'markAsRead'])
        ->name('notifications.mark-as-read');

    // Rotas de Avatar
    Route::get('/users/{user}/avatar', [AvatarController::class, 'show'])->name('users.avatar');
    Route::get('/media/{media}/avatar', [AvatarController::class, 'showFromMedia'])->name('media.avatar');
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
