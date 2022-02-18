<?php

namespace App\GraphQL\Queries\User;

use App\GraphQL\Middleware\ResolvePage;
use App\Models\User;
use Closure;
use Doctrine\DBAL\Driver\Middleware;
use GraphQL\Type\Definition\ResolveInfo;
use GraphQL\Type\Definition\Type;
use Illuminate\Support\Facades\Auth;
use Rebing\GraphQL\Support\Facades\GraphQL;
use Rebing\GraphQL\Support\Query;

class UsersQuery extends Query
{
    protected $middleware = [
        // 'gqlauth'
        // 'check-auth' => [
        //     'except' => ['users']
        // ]
        // \App\GraphQL\Middleware\AuthHeader::class,
    ];
    public function authorize($root, array $args, $ctx, ResolveInfo $resolveInfo = null, Closure $getSelectFields = null): bool
    {
        return Auth::check();
    }
    // {
    //     if (isset($args['id'])) {
    //         return Auth::id() == $args['id'];
    //     }
    //     $response = [
    //         'message' => 'Unauthorized',
    //     ];
    //     return $response;
    // }

    public function getAuthorizationMessage(): string
    {
        return 'You are not authorized to perform this action';
    }

    protected $attributes = [
        'name' => 'users',
    ];
    public function type(): Type
    {
        return Type::listOf(GraphQL::type('User'));
    }
    public function resolve($root, $args)
    {
        return User::all();
    }
}
