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

        // Dados vindos do DTO (já sem nulos)
        $incoming = $dto->toArray();

        // Campos que realmente mudaram
        $changed = collect($incoming)
            ->filter(fn($value, $field) => $user->{$field} !== $value)
            ->toArray();

        // Nenhuma mudança? retorna direto
        if (empty($changed)) {
            return true;
        }

        /**
         * Mapeia nomes lógicos -> colunas do banco
         */
        $map = [
            'fullname' => 'name',
            'username' => 'username',
        ];

        /**
         * Regras especiais por campo (dinâmicas e fáceis de expandir)
         */
        $rules = [
            'username' => function ($value, &$data) {
                $data['discriminator'] = $this->genUniqueDiscriminator($value);
                return $value;
            },
            // Exemplo futuro:
            // 'email' => fn($value, &$data) => strtolower($value),
        ];

        // Aplica o mapeamento e as regras especiais automaticamente
        $updateData = collect($changed)->mapWithKeys(function ($value, $key) use ($map, $rules, &$changed) {
            $dbField = $map[$key] ?? $key;

            // Se existir uma regra especial, aplica
            if (isset($rules[$key])) {
                $value = $rules[$key]($value, $changed);
            }

            return [$dbField => $value];
        })->merge($changed)->toArray();

        if ($dto->avatar) {
            $user->addMedia($dto->avatar)->toMediaCollection('avatars');
        } elseif ($dto->media_id) {
            // Busca a mídia específica
            $mediaItem = $user->getMedia('avatars')->where('id', $dto->media_id)->first();

            if ($mediaItem) {
                // Atualiza a data de criação para o momento atual.
                $mediaItem->created_at = now();
                $mediaItem->save();
            }
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
