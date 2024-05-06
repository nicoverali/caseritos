<?php

use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::get('/users', [UserController::class, 'index'])
    ->name('users');

Route::get('edit/users/{user}', [UserController::class, 'edit'])
    ->name('edit-user');

Route::post('edit/users/{user}', [UserController::class, 'update'])
    ->name('edit-user-save');

Route::post('delete/users/{user}', [UserController::class, 'destroy'])
    ->name('edit-user-delete');
