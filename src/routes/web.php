<?php

use Illuminate\Support\Facades\Route;

Route::get('/', fn() => inertia('Welcome'))->name('home');