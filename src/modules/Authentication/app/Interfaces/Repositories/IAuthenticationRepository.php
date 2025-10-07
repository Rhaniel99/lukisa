<?php

namespace Modules\Authentication\Interfaces\Repositories;

use App\Interfaces\Repositories\ICoreRepository;
use App\Models\User;
use Carbon\Carbon;

interface IAuthenticationRepository extends ICoreRepository
{
    public function create(array $data): User;
    public function findUserByUsernameAndDiscriminator(string $username, string $discriminator): ?User;

    public function findByEmailAndBirthDate(string $email, Carbon $birthDate): ?User;

    public function updatePasswordByEmail(string $email, string $hashedPassword): bool;

}
