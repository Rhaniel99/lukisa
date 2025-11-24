<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;

class NotificationController extends Controller
{
    /**
     * Marca todas as notificações não lidas do usuário como lidas.
     */
    public function markAllRead()
    {
        // O trait Notifiable no User model nos dá acesso direto a este método
        Auth::user()->unreadNotifications->markAsRead();

        return back()->with('success', 'Todas as notificações foram marcadas como lidas.');
    }

    /**
     * Marca uma notificação específica como lida.
     */
    public function markAsRead(string $id)
    {
        // Buscamos a notificação específica dentro das notificações do usuário
        // para garantir que ele só possa marcar as suas próprias.
        $notification = Auth::user()
            ->notifications()
            ->where('id', $id)
            ->first();

        if ($notification) {
            $notification->markAsRead();
        }

        return back();
    }
}
