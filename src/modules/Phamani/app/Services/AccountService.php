<?php

namespace Modules\Phamani\Services;

use Illuminate\Database\Eloquent\Collection;
use Modules\Phamani\DTOs\Account\StoreAccountData;
use Modules\Phamani\Interfaces\Repositories\IAccountRepository;
use Modules\Phamani\Interfaces\Services\IAccountService;

class AccountService implements IAccountService
{
    public function __construct(
        protected IAccountRepository $repository
    ) {}


    public function create(string $userId, StoreAccountData $dto)
    {
        return $this->repository->create([
            'user_id' => $userId,
            'name'    => $dto->name,
            'type'    => $dto->type,
            'balance' => 0,
        ]);
    }

    public function listForUser(string $userId): Collection
    {
        return $this->repository
            ->query()
            ->where('user_id', $userId)
            ->orderBy('name')
            ->get(['id', 'name', 'type', 'balance']);
    }
}
