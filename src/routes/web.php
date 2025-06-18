<?php

use Illuminate\Support\Facades\Route;

Route::get('/', fn() => inertia('Public/Home'))->name('home');

