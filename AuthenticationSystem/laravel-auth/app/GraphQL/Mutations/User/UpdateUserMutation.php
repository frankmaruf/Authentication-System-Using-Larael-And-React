<?php
namespace App\GraphQl\Mutations\User;


use App\Models\User;
use GraphQl\Type\Definition\Type;
use Rebing\GraphQL\Support\Facades\GraphQL;
use Rebing\GraphQL\Support\Mutation;

class UpdateUserMutation extends Mutation
{
    protected $attributes = [
        'name' => 'updateUser',
        'description' => 'Updates a user'
    ];
    public function type(): Type
    {
        return GraphQL::type('User');
    }
    public function args(): array
    {
        return[
            'id' => [
                'name' => 'id',
                'type' => Type::nonNull(Type::int())
            ],
            'first_name' => [
                'name' => 'first_name',
                'type' => Type::nonNull(Type::string())
            ],
            'last_name' => [
                'name' => 'last_name',
                'type' => Type::nonNull(Type::string())
            ],
            'email'=> [
                'name' => 'email',
                'type' => Type::nonNull(Type::string())
            ]
        ];
    }
    public function resolve($root, $args)
    {
        $user = User::findOrFail($args['id']);
        $user->fill($args);
        $user->save();

        return $user;
    }
}