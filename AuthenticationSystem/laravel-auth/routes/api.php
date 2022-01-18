<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\PasswordController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::post('register',[
    AuthController::class,
    "signup"
]);
Route::post('login',[
    AuthController::class,
    "signin"
]);
Route::post('forget',[
    PasswordController::class,
    "forget"
]);
Route::post('reset',[
    PasswordController::class,
    "reset"
]);
// Route::middleware('auth:sanctum')->get('user',[
//     AuthController::class,
//     "user"
// ]);
Route::middleware('auth:sanctum')->group(function(){
    Route::get('user',[
        AuthController::class,
        "user"
    ]);
    Route::post('logout',[
        AuthController::class,
        "logout"
    ]);
});