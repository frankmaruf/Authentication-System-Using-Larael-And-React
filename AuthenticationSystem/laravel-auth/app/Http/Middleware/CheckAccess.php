<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Auth\Middleware\Authenticate as Middleware;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;

class CheckAccess extends Middleware
{
    // middleware for graphql user query to check if user is logged in via token

    // it's working without extends Middleware
    // public function handle(Request $request, Closure $next )
    // {
    //     $cookie = Cookie::get('token');
    //     if (!$cookie) {
    //         $message = "Invalid credentials";
    //         $response = [
    //             'message' => $message,
    //         ];
    //         return $response;
    //     }
    //     if($cookie){
    //         $request->headers->set('Authorization', 'Bearer '.$cookie);
    //     }
    //     return $next($request);

    // }
    public function handle($request, Closure $next, ...$guards)
    {
        if ($token = $request->cookie('token')) {
            $request->headers->set('Authorization', 'Bearer ' . $token);
        }
        $user = Auth::user();
        if (!$user) {
            $message = "Invalid credentials";
            $response = [
                'message' => $message,
            ];
            return $response;
        }
        $this->authenticate($request, $guards);
        $use = Auth::user();
        if ($use) {
            $message = "Invalid credentials";
            $response = [
                'message' => $message,
            ];
            return $response;
        }
        return $next($request);
    }

    // $request->headers->set('Authorization', 'Bearer '.$cookie);
    // $this->authenticate($request, $guards);
    // if($cookie){
    //     $request->headers->set('Authorization', 'Bearer '.$cookie);
    // }
    // if(!$request->user()){
    //     return response()->json([
    //         'message' => 'Unauthenticated'
    //     ], 401);
    // }
    // public function handle($request, Closure $next)
    // {
    //     if($token = $request->cookie('token') ){
    //         $request->headers->set('Authorization', 'Bearer '.$token);
    //     }
    //     return $next($request);
    // }
}
