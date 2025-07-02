<?php

use App\Events\TesteReverbEvent;
use Illuminate\Support\Facades\Route;

Route::get('/', fn() => inertia('Public/Home'))->name('home');

Route::get('/teste-reverb', function () {
    broadcast(new TesteReverbEvent());
    return 'Evento de teste disparado!';
});
