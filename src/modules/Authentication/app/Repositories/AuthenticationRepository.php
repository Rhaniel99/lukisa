<?php

namespace Modules\Authentication\Repositories;

use App\Models\User;
use App\Repositories\Base\CoreRepository;
use Carbon\Carbon;
use Modules\Authentication\Interfaces\Repositories\IAuthenticationRepository;

class AuthenticationRepository extends CoreRepository implements IAuthenticationRepository
{
    public function __construct(User $model)
    {
        parent::__construct($model);
    }

    public function findUserByUsernameAndDiscriminator(string $username, string $discriminator): ?User
    {
        return $this->model
            ->where('username', $username)
            ->where('discriminator', $discriminator)
            ->first();
    }

    public function create(array $data): User
    {
        return $this->model->create($data);
    }

    public function findByEmailAndBirthDate(string $email, Carbon $birthDate): ?User
    {
        return $this->model->where('email', $email)
            ->whereDate('birth_date', $birthDate->toDateString())
            ->first();
    }

    public function updatePasswordByEmail(string $email, string $hashedPassword): bool
    {
        return $this->model->where('email', $email)->update(['password' => $hashedPassword]) > 0;
    }

}
