<?php

use Illuminate\Support\Facades\Route;
use Modules\Authentication\Http\Controllers\AuthenticationController;

// Route::middleware(['auth', 'verified'])->group(function () {
//     Route::resource('authentications', AuthenticationController::class)->names('authentication');
// });

Route::get('/login', [AuthenticationController::class, 'formLogin'])->name('form.login');
Route::post('/login', [AuthenticationController::class, 'authLogin'])->name('auth.login');

//
