<?php

use Illuminate\Support\Facades\Route;
use Modules\Phamani\Http\Controllers\AccountController;
use Modules\Phamani\Http\Controllers\CategoryController;
use Modules\Phamani\Http\Controllers\PhamaniController;
use Modules\Phamani\Http\Controllers\TransactionController;

Route::middleware(['auth', 'check.profile'])->group(function () {
    Route::resource('phamani', PhamaniController::class)->names('phamani');
    Route::resource('transaction', TransactionController::class)->names('transaction');
    Route::resource('account', AccountController::class)->names('account');
    Route::resource('category', CategoryController::class)->names('category');
});
