<?php

use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;

Route::get('/home', [ProductController::class, 'index'])
    ->name('home');

Route::get('/orders', [OrderController::class, 'clientIndex'])
    ->name('orders');

Route::get('/products/{product}', [ProductController::class, 'show'])
    ->name('product');

Route::post('/products/{product}', [OrderController::class, 'store'])
    ->name('product-buy');
