<?php

namespace App\Interfaces\Services;

use App\Models\User;
use UserDTO;

interface UserServiceInterface
{
    public function create(UserDTO $dto): User;
}
