<?php

use Illuminate\Support\Facades\Route;
use Modules\Authentication\Http\Controllers\AuthenticationController;

// ? GET
Route::get('/login', [AuthenticationController::class, 'formLogin'])->name('form.login');
Route::get('/signup', [AuthenticationController::class, 'formSignup'])->name('form.signup');
Route::get('/forgot', [AuthenticationController::class, 'formForgot'])->name('form.forgot');
// ? POST
Route::post('/login', [AuthenticationController::class, 'authLogin'])->name('auth.login');
Route::post('/register', [AuthenticationController::class, 'regSignup'])->name('auth.register');
Route::post('/logout', [AuthenticationController::class, 'logout'])->name('auth.logout');
Route::post('/forgot/verify', [AuthenticationController::class, 'forgotVerify'])->name('forgot.verify');
Route::post('/forgot/password', [AuthenticationController::class, 'forgotPassword'])->name('forgot.password');


