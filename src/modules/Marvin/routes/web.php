<?php

use Illuminate\Support\Facades\Route;
use Modules\Marvin\Http\Controllers\MarvinController;

// Route::get('/marvin', fn() => inertia('Auth/Marvin/Index'))->name('marvin.index');
Route::get('/marvin', [MarvinController::class, 'index'])->name('marvin.index');
Route::post('/marvin/ask', [MarvinController::class, 'ask'])->name('marvin.ask');
