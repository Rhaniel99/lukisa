<?php

namespace Modules\Authentication\Interfaces\Services;

use App\Models\User;
use Modules\Authentication\DTOs\CheckUserData;
use Modules\Authentication\DTOs\LoginData;
use Modules\Authentication\DTOs\RegisterData;
use Modules\Authentication\DTOs\ResetPasswordData;

interface IAuthenticationService
{
    /**
     * Tenta autenticar um usuário e iniciar uma sessão.
     *
     * @param LoginData $data
     * @return bool True em caso de sucesso, false em caso de falha.
     */
    public function login(LoginData $data): bool;

    public function register(RegisterData $data): User;

    public function findByEmailAndBirthDate(CheckUserData $data):  ?User;

    public function resetPassword(ResetPasswordData $data): bool;

}
