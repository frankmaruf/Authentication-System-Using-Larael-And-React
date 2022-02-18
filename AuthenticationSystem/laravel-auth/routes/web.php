<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Mail;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('send-mail', function () {
    $details = [
        'title' => 'Mail from Maruf',
        'body' => 'This is for testing email using smtp'
    ];
    Mail::send(
        'mail.myTestMail',
        ['details'=>$details],
        function ($message) {
            $message->subject('Mail from Maruf');
            $message->to('mdakashbigboss@gmail.com');
        }
    );
    return view('mail.myTestMail' , ['details'=>$details]);
});