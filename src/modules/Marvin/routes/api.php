<?php

use Illuminate\Support\Facades\Route;
use Modules\Marvin\Http\Controllers\MarvinController;

Route::post('/ask', [MarvinController::class, 'ask']);
