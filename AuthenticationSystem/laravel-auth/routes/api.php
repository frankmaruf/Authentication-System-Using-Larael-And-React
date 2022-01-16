<?php

use App\Http\Controllers\AuthController;
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