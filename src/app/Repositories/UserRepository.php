<?php

namespace App\Repositories;

use App\Interfaces\Repositories\UserRepositoryInterface;
use App\Models\User;

class UserRepository implements UserRepositoryInterface
{
    public function findById(int $id): ?User
    {
        return User::where('id', $id)->firstOrFail();

    }

    public function all(): array
    {
        return User::all()->toArray();
    }

    public function create(array $data): User
    {
        return User::create($data);
    }
}
