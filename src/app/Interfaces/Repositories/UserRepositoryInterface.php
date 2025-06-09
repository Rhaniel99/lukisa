<?php

namespace App\Interfaces\Repositories;

use App\Models\User;

interface UserRepositoryInterface
{
    public function findById(int $id): ?User;
    public function all(): array;
    public function create(array $data): User;
}
