<?php
namespace App\Services;

use App\Interfaces\Services\UserServiceInterface;
use App\Interfaces\Repositories\UserRepositoryInterface;
use App\Models\User;
use UserDTO;

class UserService implements UserServiceInterface
{
    public function __construct(protected UserRepositoryInterface $userRepository)
    {
    }

    public function create(UserDTO $dto): User
    {
        return $this->userRepository->create($dto->toArray());
    }
}
