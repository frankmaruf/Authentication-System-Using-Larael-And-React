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
        $message = "";
        $user = Auth::attempt([
            'email' => $args['email'],
            'password' => $args['password']
        ]);
        if (!$user) {
            $message = "Invalid credentials";
            $response = [
                'message' => $message,
            ];
            return $response;
        }
        // $user = User::where('email', $args['email'])->first();
        /** @var \App\Models\MyUserModel $user **/
        $user = Auth::user();
        $token = $user->createToken('authToken')->plainTextToken;
        $expires_in = 60 * 24 * 7;
        $message = 'Login Successfully';
        $cookie = Cookie::make('token', $token, $expires_in, '/', 'localhost', false, true);
        Cookie::queue($cookie);
        $response = [
            'user' => $user,
            'access_token' => $token,
            'expires_in' => $expires_in,
            'token_type' => 'Bearer',
            'message' => $message,
        ];
        return $response;
    }
}
