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
        $userData = $data->toArray();
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

    public function updateProfile(string $userId, UpdateProfileData $data): bool
    {
        $user = $this->authRepository->find($userId);

        if (!$user) {
            return false;
        }

        $discriminator = $this->genUniqueDiscriminator($data->username);

        $this->authRepository->update($userId, [
            'username' => $data->username,
            'discriminator' => $discriminator,
            'status' => 0
        ]);

        if ($data->avatar) {
            /** @var \App\Models\User $user */ //
            $user->addMedia($data->avatar)
                ->toMediaCollection('avatars');
        }
        return true;
    }


    /**
     * Gera um discriminator único de 4 dígitos para um determinado username.
     *
     * @param string $username
     * @return string
     */
    private function genUniqueDiscriminator(string $username): string
    {
        do {
            // Gera um número aleatório de 4 dígitos, preenchendo com zeros à esquerda
            $discriminator = str_pad(rand(1, 9999), 4, '0', STR_PAD_LEFT);

            // Verifica no banco se a combinação já existe
            $exists = $this->authRepository->findUserByUsernameAndDiscriminator($username, $discriminator);

        } while ($exists);

        return $discriminator;
    }
}
