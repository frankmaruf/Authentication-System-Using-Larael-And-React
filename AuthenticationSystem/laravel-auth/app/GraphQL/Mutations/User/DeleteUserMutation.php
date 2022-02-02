<?php

namespace App\GraphQL\Mutations\User;


use App\Models\User;
use Rebing\GraphQL\Support\Mutation;
use GraphQL\Type\Definition\Type;


class DeleteUserMutation extends Mutation
{
    protected $attributes = [
        'name' => 'deleteUser',
        'description' => 'Deletes a user'
    ];

    public function type(): Type
    {
        return Type::boolean();
    }
    public function args(): array
    {
        return[
            'id' => [
                'name' => 'id',
                'type' => Type::int(),
                'rules' => ['required']
            ]
        ];
    }
    public function resolve($root, $args)
    {
        $category = User::findOrFail($args['id']);

        return  $category->delete() ? true : false;
    }
}