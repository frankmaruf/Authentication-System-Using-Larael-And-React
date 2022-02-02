<?php
namespace App\GraphQL\Types;
use App\Models\User;
use GraphQL\Type\Definition\Type;
use Rebing\GraphQL\Support\Facades\GraphQL;
use Rebing\GraphQL\Support\Type as GraphQLType;

class UserType extends GraphQLType
{
    protected $attributes = [
        'name' => 'User',
        'description' => 'Collection of Users',
        'model' => User::class
    ];
    public function fields(): array
    {
        return[
            'id' => [
                'type' => Type::nonNull(Type::int()),
                'description' => 'ID of User'
            ],
            'first_name' => [
                'type' => Type::nonNull(Type::string()),
                'description' => 'First Name of User'
            ],
            'last_name' => [
                'type' => Type::nonNull(Type::string()),
                'description' => 'Last Name of User'
            ],
            'email' => [
                'type' => Type::nonNull(Type::string()),
                'description' => 'Email of User'
            ],
        ];
    }
}