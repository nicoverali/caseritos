<?php

use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;

Route::get('/sales', [OrderController::class, 'sellerIndex'])
    ->name('sales');

Route::get('/products', [ProductController::class, 'sellerIndex'])
    ->name('products');

Route::get('create/products', [ProductController::class, 'create'])
    ->name('create-product');

Route::post('create/products', [ProductController::class, 'store'])
    ->name('create-product-save');

Route::get('edit/products/{product}', [ProductController::class, 'edit'])
    ->name('edit-product');

Route::post('edit/products/{product}', [ProductController::class, 'update'])
    ->name('edit-product-save');

Route::post('delete/products/{product}', [ProductController::class, 'destroy'])
    ->name('edit-product-delete');

Route::get('/sales/{order}/client', [OrderController::class, 'showClient'])
    ->name('sale-client');
