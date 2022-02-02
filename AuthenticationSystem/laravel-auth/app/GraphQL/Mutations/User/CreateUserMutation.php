<?php
namespace App\GraphQL\Mutations\User;

use App\Models\User;
use Rebing\GraphQL\Support\Mutation;
use GraphQL\Type\Definition\Type;
use Rebing\GraphQL\Support\Facades\GraphQL;



class CreateUserMutation extends Mutation
{
    protected $attributes = [
        'name' => 'createUser',
        'description' => 'Creates a user'
    ];
    public function type(): Type
    {
        return GraphQL::type('User');
    }
    public function args(): array
    {
        return[
            'first_name' => [
                'name' => 'first_name',
                'type' => Type::nonNull(Type::string())
            ],
            "last_name" => [
                'name' => 'last_name',
                'type' => Type::nonNull(Type::string())
            ],
            "email" => [
                'name' => 'email',
                'type' => Type::nonNull(Type::string())
            ],
            "password" => [
                'name' => 'password',
                'type' => Type::nonNull(Type::string())
            ],
            ];
    }
    public function resolve($root, $args)
    {
        $user = new User();
        $user->fill($args);
        $user->save();

        return $user;
    }
}