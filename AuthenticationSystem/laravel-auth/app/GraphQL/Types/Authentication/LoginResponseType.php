<?php

namespace App\GraphQL\Types\Authentication;

use Rebing\GraphQL\Support\Type as GraphQLType;
use GraphQL\Type\Definition\Type;
use Rebing\GraphQL\Support\Facades\GraphQL;

class LoginResponseType extends GraphQLType
{
    protected $attributes = [
        'name' => 'LoginResponse',
        'description' => 'A type of Authentication Response',
        // 'model' => \App\Models\User::class,
    ];

    public function fields(): array
    {
        return [
            'access_token' => [
                'type' => Type::nonNull(Type::string()),
                'description' => 'Access Token'
            ],
            // 'token_type' => [
            //     'type' => Type::nonNull(Type::string()),
            //     'description' => 'Token Type'
            // ],
            // 'expires_in' => [
            //     'type' => Type::nonNull(Type::int()),
            //     'description' => 'Expires In'
            // ],
            'user' => [
                'type' => Type::nonNull(GraphQL::type('User')),
                'description' => 'User'
            ],
        ];
    }
}
