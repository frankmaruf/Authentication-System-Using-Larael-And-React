<?php

namespace App\Http\Controllers;

use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Mail\Message;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class PasswordController extends Controller
{
    //
    public function forget(Request $request)
    {
        $email = $request->input('email');
        $token = Str::random(12);
        DB::table('password_resets')->insert([
            'email' => $email,
            'token' => $token
        ]);
        // Mail::send('reset', $data = ['token' => $token], function ($message) use ($email) {
        Mail::send('reset', $data = ['token' => $token], function ($message) {
            $message->subject('Reset your password!');
            $message->to('mdakashbigboss@gmail.com');
        });
        $details = [
            'token' => $token,
        ];
        return view('reset',['details'=>$details]);
        // return response([
        //     'message' => 'Check your email!',
        //     'status' => 'success',
        //     'data' => $data,
        // ]);
    }
    public function reset(Request $request)
    {
        $passwordReset = DB::table('password_resets')
            ->where('token', $request->input('token'))->first();

        if (!$user = User::where('email', $passwordReset->email)->first()) {
            throw new NotFoundHttpException('User not found!');
        }

        $user->password = Hash::make($request->input('password'));
        DB::table('password_resets')->where('email', $passwordReset->email)->delete();
        $user->save();

        return response([
            'message' => 'success'
        ]);
    }
}
