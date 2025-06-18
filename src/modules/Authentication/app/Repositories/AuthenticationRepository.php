<?php

namespace Modules\Authentication\Repositories;

use App\Models\User;
use Modules\Authentication\Interfaces\Repositories\IAuthenticationRepository;

class AuthenticationRepository implements IAuthenticationRepository
{
    public function create(array $data): User
    {
        return User::create($data);
    }
}
