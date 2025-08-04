<?php

use Illuminate\Support\Facades\Route;
use Modules\Authentication\Http\Controllers\AuthenticationController;

// ? GET
Route::middleware('guest')->group(function () {
    Route::inertia('/login', 'Public/Authentication/Login')->name('form.login');
    Route::inertia('/signup', 'Public/Authentication/Signup')->name('form.signup');
    Route::inertia('/forgot', 'Public/Authentication/Forgot')->name('form.forgot');
});

// ? POST
Route::post('/login', [AuthenticationController::class, 'authLogin'])->name('auth.login');
Route::post('/register', [AuthenticationController::class, 'regSignup'])->name('auth.register');
Route::post('/logout', [AuthenticationController::class, 'logout'])->name('auth.logout');
Route::post('/forgot/verify', [AuthenticationController::class, 'forgotVerify'])->name('forgot.verify');
Route::post('/forgot/password', [AuthenticationController::class, 'forgotPassword'])->name('forgot.password');

Route::middleware('auth')->group(function() {
    Route::inertia('/complete-profile', 'Public/Authentication/Profile')->name('profile.complete');
    Route::post('/complete-profile', [AuthenticationController::class, 'regProfile'])->name('profile.register');
});


