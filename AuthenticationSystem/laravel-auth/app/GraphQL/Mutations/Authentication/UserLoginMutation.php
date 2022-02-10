<?php

namespace App\GraphQL\Mutations\Authentication;


use App\Models\User;
use Closure;
use Exception;
use GraphQL\Type\Definition\ResolveInfo;
use GraphQL\Type\Definition\Type;
use Rebing\GraphQL\Support\Mutation;
use Rebing\GraphQL\Support\Facades\GraphQL;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
// import Graphqltype
use Rebing\GraphQL\Support\Type as GraphQLType;

class UserLoginMutation extends Mutation
{
    protected $attributes = [
        'name' => 'userLogin',
        'description' => 'Login user',
    ];
    public function type(): Type
    {
        return GraphQL::type('LoginResponse');
    }
    /** @var \App\Models\MyUserModel $user **/

    public function args(): array
    {
        return [
            'email' => [
                'name' => 'email',
                'type' => Type::nonNull(Type::string())
            ],
            "password" => [
                'name' => 'password',
                'type' => Type::nonNull(Type::string())
            ],
        ];
    }
    public function resolve($root, $args, $context, ResolveInfo $resolveInfo, Closure $getSelectFields)
    {
        $user = Auth::attempt([
            'email' => $args['email'],
            'password' => $args['password']
        ]);
        if (!$user) {
            return null;
        }
        // if(Auth::user()->is_active == 0){
        //     return null;
        // }
        // if($user && !Hash::check($args['password'], !Auth::user()->password)){
        //     throw new Exception('Error login');
        //     return null;
        // }
            $user = User::where('email', $args['email'])->first();
            $token = $user->createToken('authToken')->plainTextToken;
            $user->save();
            $cookie = Cookie::make('token', $token, 60*24*30);
            $response = [
                'user' => $user,
                'access_token' => $token,
                'cookie' => $cookie
            ];
            return $response;
    }
}