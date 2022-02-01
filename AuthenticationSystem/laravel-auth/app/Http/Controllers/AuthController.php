<?php

namespace App\Http\Controllers;

use App\Http\Requests\RegisterRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Hash;
use Symfony\Component\HttpFoundation\Response;

class AuthController extends Controller
{
    public function signup(RegisterRequest $request)
    {
        $user = User::create([
            // $request->all()
            // $request->only(['name', 'email', 'password'])
            // 'name' => $request->name,
            // 'email' => $request->email,
            // 'password' => bcrypt($request->password)
            'first_name' => $request->input('first_name'),
            'last_name' => $request->input('last_name'),
            'email' => $request->input('email'),
            'password' => Hash::make($request->input('password')),
            // 'password' => bcrypt($request->input('password'))
        ]);
        return response()->json([
            'message' => 'User created successfully',
            'user' => $user
        ], 201);
        return response($user, Response::HTTP_CREATED);
    }
    public function signin(Request $request)
    {
        if (!Auth::attempt($request->only('email', 'password'))) {
            return response()->json([
                'message' => 'Invalid credentials'
            ], 401);
        }
        /** @var \App\Models\MyUserModel $user **/
        $user = Auth::user();
        $token = $user->createToken('authToken')->plainTextToken;
        return response()->json([
            'message' => 'User logged in successfully',
            'user' => $user,
            'token' => $token
        ], 200)->withCookie(cookie('token', $token, 60 * 24 * 7, '/', 'localhost', false, true));
    }
    public function user(Request $request)
    {
        return response()->json(Auth::user());
    }
    public function logout()
    {
        Auth::user()->tokens->each(function ($token, $key) {
            $token->delete();
        });
        $cookie = Cookie::forget('token');
        return response()->json([
            'message' => 'User logged out successfully'
        ], 200)->withCookie($cookie);
    }
}
