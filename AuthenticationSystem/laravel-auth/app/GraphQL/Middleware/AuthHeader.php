<?php
namespace App\GraphQL\Middleware;
use Closure;
use GraphQL\Type\Definition\ResolveInfo;
use Illuminate\Support\Facades\Cookie;
use Rebing\GraphQL\Support\Middleware;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class AuthHeader extends Middleware
{
    public function handle($root, array $args, $context, ResolveInfo $info, Closure $next)
    {
        $cookie = Cookie::get('token');
        if (!$cookie) {
            $message = "Invalid credentials";
            $response = [
                'message' => $message,
            ];
            return $response;
        }
        // if($cookie != $args['headers']['Authorization']){
        //     $message = "Invalid credentials";
        //     $response = [
        //         'message' => $message,
        //     ];
        //     return $response;
        // }
        // if(!Auth::check()){
        //     $message = "Invalid credentials";
        //     $response = [
        //         'message' => $message,
        //     ];
        //     return $response;
        // }
        if($cookie){
            $context['request']->headers->all();
            $request = new Request();
            $request->headers->set('Authorization', $cookie);
            $request->headers->set('X-CSRF-TOKEN', $cookie);
            $request->headers->set('Authorization', 'Bearer '.$cookie);
            $context['request'] = $request;
            $args['headers']['Authorization'] = $cookie;
            $args['headers']['X-CSRF-TOKEN'] = $cookie;
            $args['headers']['Authorization'] = 'Bearer ' . $cookie;
            $args['headers']['Authorization'] = 'Bearer '.$cookie;
        }
        return $next($root, $args, $context, $info);
    }
}
