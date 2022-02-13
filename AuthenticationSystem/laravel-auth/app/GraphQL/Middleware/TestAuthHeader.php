<?php

declare(strict_types=1);

namespace App\GraphQL\Middleware;

use Closure;
use GraphQL\Type\Definition\ResolveInfo;
use Illuminate\Support\Facades\Cookie;
use Rebing\GraphQL\Support\Middleware;

class TestAuthHeader extends Middleware
{
    public function handle( $root, array $args, $context, ResolveInfo $info, Closure $next)
    {
        $cookie = Cookie::get('token');
        if(!$cookie){
            $message = "Invalid credentials";
            $response = [
                'message' => $message,
            ];
            return $response;
        }

        return $next($root, $args, $context, $info);
    }
    //     $headers = $context['request']->headers->all();
    //     $cookie = Cookie::get('token');
    //     if(!$cookie){
    //         $message = "Invalid credentials";
    //         $response = [
    //             'message' => $message,
    //         ];
    //         return $response;
    //     }
    //     $args['headers']['Authorization'] = $cookie;
    //     $args['headers']['X-CSRF-TOKEN'] = $cookie;
    //     $args['headers']['Authorization'] = 'Bearer '.$cookie;
    //     return $next($root, $args, $context, $info,$headers);
}
