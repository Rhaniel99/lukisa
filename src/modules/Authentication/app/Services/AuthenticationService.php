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
use Modules\Authentication\DTOs\CompleteProfileData;
use Modules\Authentication\DTOs\UpdateProfileData;
use Modules\Authentication\Interfaces\Repositories\IAuthenticationRepository;
use Modules\Authentication\Interfaces\Services\IAuthenticationService;

class AuthenticationService implements IAuthenticationService
{
    protected IAuthenticationRepository $repository;

    public function __construct(IAuthenticationRepository $repository)
    {
        $this->repository = $repository;
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
        $newUser = $this->repository->create($userData);

        return $newUser;
    }

    public function findByEmailAndBirthDate(CheckUserData $data): ?User
    {
        $birth = Carbon::parse($data->birth_date);
        return $this->repository->findByEmailAndBirthDate($data->email, $birth);
    }

    public function resetPassword(ResetPasswordData $data): bool
    {
        $hashedPassword = Hash::make($data->password);

        return $this->repository->updatePasswordByEmail(
            $data->email,
            $hashedPassword
        );
    }

    public function completeProfile(string $userId, CompleteProfileData $data): bool
    {
        $user = $this->repository->find($userId);

        if (!$user) {
            return false;
        }

        $discriminator = $this->genUniqueDiscriminator($data->username);

        $this->repository->update($userId, [
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

    public function updateProfile(string $userId, UpdateProfileData $dto): bool
    {
        $user = $this->repository->find($userId);

        if (!$user) {
            throw new \Exception('Usuário não encontrado.');
        }

        // 1. Pega os dados limpos do DTO
        $incoming = $dto->toArray();
        $updateData = [];

        // 2. Definição de Mapeamento e Regras
        // [Campo DTO] => [Coluna Banco]
        $map = [
            'fullname' => 'name',
        ];

        foreach ($incoming as $dtoField => $value) {
            // 2. LÓGICA INTELIGENTE:
            // Tenta pegar do mapa. Se não existir, assume que o nome da coluna 
            // é igual ao nome do campo no DTO (ex: email -> email).
            $dbColumn = $map[$dtoField] ?? $dtoField;

            // Verifica se o valor mudou (exceto senha, que sempre processamos se vier)
            if ($dtoField !== 'password' && $user->{$dbColumn} === $value) {
                continue;
            }

            // --- REGRAS ESPECIAIS ---
            if ($dtoField === 'username') {
                $updateData['discriminator'] = $this->genUniqueDiscriminator($value);
            }

            if ($dtoField === 'password') {
                $value = \Illuminate\Support\Facades\Hash::make($value);
            }

            $updateData[$dbColumn] = $value;
        }

        // 4. Lógica de Avatar (Mantida)
        if ($dto->avatar) {
            $user->addMedia($dto->avatar)->toMediaCollection('avatars');
        } elseif ($dto->media_id) {
            $mediaItem = $user->getMedia('avatars')->where('id', $dto->media_id)->first();
            if ($mediaItem) {
                $mediaItem->created_at = now();
                $mediaItem->save();
            }
        }

        // 5. Se não tiver nada para atualizar no banco, retorna true
        if (empty($updateData)) {
            return true;
        }

        return $this->repository->update($userId, $updateData);
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
            $exists = $this->repository->findUserByUsernameAndDiscriminator($username, $discriminator);
        } while ($exists);

        return $discriminator;
    }
}
