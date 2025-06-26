<?php

namespace Modules\Authentication\Services;

use App\Models\User;
use Auth;
use Carbon\Carbon;
use Hash;
use Modules\Authentication\DTOs\CheckUserData;
use Modules\Authentication\DTOs\LoginData;
use Modules\Authentication\DTOs\RegisterData;
use Modules\Authentication\DTOs\ResetPasswordData;
use Modules\Authentication\DTOs\UpdateProfileData;
use Modules\Authentication\Interfaces\Repositories\IAuthenticationRepository;
use Modules\Authentication\Interfaces\Services\IAuthenticationService;
use Storage;

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

        $remember = $data->remember;

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

    public function findByEmailAndBirthDate(CheckUserData $data): ?User
    {
        $birth = Carbon::parse($data->birth_date);
        return $this->authRepository->findByEmailAndBirthDate($data->email, $birth);
    }

    public function resetPassword(ResetPasswordData $data): bool
    {
        $hashedPassword = Hash::make($data->password);

        return $this->authRepository->updatePasswordByEmail(
            $data->email,
            $hashedPassword
        );
    }

    public function updateUserProfile(int $userId, UpdateProfileData $r): bool
    {
        $avatarPath = $this->uploadAvatar($userId, $r->avatar);

        if (!$avatarPath) {
            // Poderíamos lançar uma exceção customizada aqui se quiséssemos
            return false;
        }

        // 2. Preparar dados para o banco
        $userData = [
            'username' => $r->username,
            'avatar' => $avatarPath,
            'status' => 0
        ];

        // 3. Chamar o repositório para persistir os dados
        return $this->authRepository->update($userId, $userData);
    }

    private function uploadAvatar(int $userId, $avatarFile): string|false
    {
        $extension = $avatarFile->getClientOriginalExtension();
        $path = "profiles/{$userId}/avatar.{$extension}";

        // O método `put` do Storage já retorna true ou false.
        $success = Storage::disk('s3')->put($path, $avatarFile->get());

        return $success ? $path : false;
    }
}
