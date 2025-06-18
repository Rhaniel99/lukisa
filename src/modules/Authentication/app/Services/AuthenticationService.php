<?php

namespace Modules\Authentication\Services;

use App\Models\User;
use Auth;
use Hash;
use Modules\Authentication\DTOs\LoginData;
use Modules\Authentication\DTOs\RegisterData;
use Modules\Authentication\Interfaces\Repositories\IAuthenticationRepository;
use Modules\Authentication\Interfaces\Services\IAuthenticationService;

class AuthenticationService implements IAuthenticationService
{
    protected IAuthenticationRepository $authRepository;

    public function __construct(IAuthenticationRepository $authRepository)
    {
        $this->authRepository = $authRepository;
    }

    public function login(LoginData $data): bool
    {
        $credentials = $data->only('email', 'password')->toArray();

        $remember = $data->remember ?? false;

        if (!Auth::attempt($credentials, $remember)) {
            return false;
        }

        request()->session()->regenerate();

        return true;
    }

    public function register(RegisterData $data): User
    {
        // Pega os dados validados do DTO
        $userData = $data->toArray();

        // Hasheia a senha antes de salvar - NUNCA salve senhas em texto plano
        $userData['password'] = Hash::make($userData['password']);

        // Chama o repositório para criar o usuário no banco
        $newUser = $this->authRepository->create($userData);

        return $newUser;
    }
}
