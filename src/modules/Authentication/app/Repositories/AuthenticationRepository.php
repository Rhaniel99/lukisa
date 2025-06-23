<?php

namespace Modules\Authentication\Repositories;

use App\Models\User;
use Carbon\Carbon;
use Modules\Authentication\Interfaces\Repositories\IAuthenticationRepository;

class AuthenticationRepository implements IAuthenticationRepository
{
    public function create(array $data): User
    {
        return User::create($data);
    }


    public function findByEmailAndBirthDate(string $email, Carbon $birthDate): ?User
    {
        return User::where('email', $email)
            ->whereDate('birth_date', $birthDate->toDateString())
            ->first();
    }

    public function updatePasswordByEmail(string $email, string $hashedPassword): bool
    {
        // Se for > 0, a atualização foi bem-sucedida.
        return User::where('email', $email)->update(['password' => $hashedPassword]) > 0;
    }
}
