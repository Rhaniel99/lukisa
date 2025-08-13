<?php

use Illuminate\Support\Facades\Route;
use Modules\Marvin\Http\Controllers\MarvinController;

Route::get('/marvin', fn() => inertia('Auth/Marvin/Index'))->name('marvin.index');
