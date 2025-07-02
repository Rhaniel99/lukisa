<?php

use Illuminate\Support\Facades\Broadcast;

Broadcast::channel('App.Models.User.{id}', function ($user, $id) {
    return (int) $user->id === (int) $id;
});

Broadcast::channel('memories.{memoryId}', function ($user, $memoryId) {
    // Retornar `true` significa que este é um canal público
    // e qualquer pessoa pode se inscrever, autenticada ou não.
    return true;
});
