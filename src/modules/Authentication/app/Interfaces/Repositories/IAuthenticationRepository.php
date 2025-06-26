<?php

namespace Modules\Authentication\Interfaces\Repositories;

use App\Models\User;
use Carbon\Carbon;

interface IAuthenticationRepository {
    public function create(array $data): User;

    public function findByEmailAndBirthDate(string $email, Carbon $birthDate): ?User;

    public function updatePasswordByEmail(string $email, string $hashedPassword): bool;

    public function update(int $userId, array $data): bool;

}
