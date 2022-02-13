<?php
declare(strict_types=1);
namespace App\GraphQL\Middleware;
use Closure;
use GraphQL\Type\Definition\ResolveInfo;
use Illuminate\Support\Facades\Cookie;
use Rebing\GraphQL\Support\Middleware;
class AuthHeader  extends Middleware
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
}