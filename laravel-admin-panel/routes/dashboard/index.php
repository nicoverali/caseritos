<?php

use Illuminate\Support\Facades\Route;

Route::middleware('resumeRegisterIfNotClient')
    ->group(__DIR__ . '/client.php');

Route::middleware('role:seller')
    ->group(__DIR__ . '/seller.php');

Route::middleware('role:admin')
    ->prefix('/admin')
    ->group(__DIR__ . '/admin.php');
