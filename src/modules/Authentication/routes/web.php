<?php

use Illuminate\Support\Facades\Route;
use Modules\Authentication\Http\Controllers\AuthenticationController;

// ? GET
Route::get('/login', [AuthenticationController::class, 'formLogin'])->name('form.login');
Route::get('/signup', [AuthenticationController::class, 'formSignup'])->name('form.signup');

// ? POST
Route::post('/login', [AuthenticationController::class, 'authLogin'])->name('auth.login');
Route::post('/register', [AuthenticationController::class, 'regSignup'])->name('auth.register');
Route::post('/logout', [AuthenticationController::class, 'logout'])->name('auth.logout');


