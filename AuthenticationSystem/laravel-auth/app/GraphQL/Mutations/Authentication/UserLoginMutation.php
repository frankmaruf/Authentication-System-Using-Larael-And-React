<?php

namespace App\GraphQL\Mutations\Authentication;


use App\Models\User;
use Closure;
use GraphQL\Type\Definition\ResolveInfo;
use GraphQL\Type\Definition\Type;
use Rebing\GraphQL\Support\Mutation;
use Rebing\GraphQL\Support\Facades\GraphQL;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Http\Request;

class UserLoginMutation extends Mutation
{
    protected $attributes = [
        'name' => 'userLogin',
        'description' => 'Login user'
    ];
    public function type(): Type
    {
        return GraphQL::type('User');
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
        else{
            $user = User::where('email', $args['email'])->first();
            $token = $user->createToken('authToken')->accessToken;
            $cookie = Cookie::make('token', $token, 60*24*30);
            $user = User::where('email', $args['email'])->first();
            // save user token at database
            return $user;
        }
        // $user = User::where('email', $args['email'])->first();
        // if (!$user) {
        //     return null;
        // }
        // if (!$user->isActive()) {
        //     return null;
        // }
        // if (!$user->isPassword($args['password'])) {
        //     return null;
        // }
        // $token = $user->createToken('authToken')->plainTextToken;
        // $response = ['token' => $token];
        // $cookie = Cookie::make('token', $token, 60 * 24 * 30);
        // $response['cookie'] = $cookie;
        // $response['user'] = $user;
        // $response['user_id'] = $user->id;
        // $response['user_first_name'] = $user->first_name;
        // $response['user_email'] = $user->email;
        // return $response;
    }
}


// if it's not work then try with Auth