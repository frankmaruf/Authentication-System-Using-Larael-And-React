<?php

namespace App\GraphQL\Queries\User;

use App\GraphQL\Middleware\ResolvePage;
use App\Models\User;
use Doctrine\DBAL\Driver\Middleware;
use GraphQL\Type\Definition\Type;
use Rebing\GraphQL\Support\Facades\GraphQL;
use Rebing\GraphQL\Support\Query;

class UsersQuery extends Query{
    protected $middleware = [
        \App\GraphQl\Middleware\ResolvePage::class,
        // 'auth' => [
        //     'except' => ['all']
        // ]
    ];
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