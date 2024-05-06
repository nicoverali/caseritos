<?php

use Illuminate\Support\Facades\Route;

Route::middleware('guest')
    ->group(__DIR__ . '/guest.php');

Route::middleware('auth')
    ->group(__DIR__ . '/auth.php');
