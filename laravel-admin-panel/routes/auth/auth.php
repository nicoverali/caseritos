<?php

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Profiles\AdminController;
use App\Http\Controllers\Profiles\ClientController;
use App\Http\Controllers\Profiles\SellerController;
use Illuminate\Support\Facades\Route;

Route::get('/register-client', [ClientController::class, 'create'])
    ->name('register-client');

Route::post('/register-client', [ClientController::class, 'store'])
    ->name('register-client-save');

Route::get('/become-a-seller', [SellerController::class, 'create'])
    ->name('become-a-seller');

Route::post('/become-a-seller', [SellerController::class, 'store'])
    ->name('become-a-seller-save');

Route::get('/request-admin', [AdminController::class, 'create'])
    ->name('request-admin');

Route::post('/request-admin', [AdminController::class, 'store'])
    ->name('request-admin-save');

Route::post('/logout', [LoginController::class, 'destroy'])
    ->middleware('auth')
    ->name('logout');
