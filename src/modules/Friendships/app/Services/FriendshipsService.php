<?php

namespace Modules\Friendships\Services;

use App\Models\User;
use Exception;
use Illuminate\Database\Eloquent\Collection;
use Modules\Friendships\Events\FriendRequestReceived;
use Modules\Friendships\Interfaces\Repositories\IFriendshipsRepository;
use Modules\Friendships\Interfaces\Services\IFriendshipsService;
use Modules\Friendships\Models\Friendship;

class FriendshipsService implements IFriendshipsService
{
    protected $repository;
    public function __construct(
        IFriendshipsRepository $repository
    ) {
        $this->repository = $repository;
    }

    public function sendRequest(string $user_id, string $receiverTag): Friendship
    {
        $receiver = $this->repository->findUserByTag($receiverTag);

        if (!$receiver) {
            throw new Exception('O usuário com esta tag não foi encontrado.');
        }

        if ($user_id === $receiver->id) {
            throw new Exception('Você não pode adicionar a si mesmo como amigo.');
        }

        // === NOVA REGRA DE PRIVACIDADE ===
        if ($receiver->allow_friend_requests === false) {
            throw new Exception('Este usuário optou por não receber pedidos de amizade.');
        }

        // Verifica se já existe uma amizade ou pedido entre os dois
        $existingFriendship = $this->repository->findExistingFriendship($user_id, $receiver->id);

        if ($existingFriendship) {
            if ($existingFriendship->status === 'pending') {
                throw new Exception('Um pedido de amizade já está pendente.');
            }
            throw new Exception('Você já é amigo deste usuário.');
        }
        $friendship = $this->repository->createRequest($user_id,  $receiver->id);
        $newCount = $this->repository->getPendingRequestsCountFor($receiver);
        
        FriendRequestReceived::dispatch($receiver->id, $newCount);

        return $friendship;
        // return $this->repository->createRequest($user_id, $receiver->id);
    }

    public function getPendingRequests(User $user): Collection
    {
        return $this->repository->getPendingRequestsFor($user);
    }

    public function getPendingRequestsCount(User $user): int
    {
        return $this->repository->getPendingRequestsCountFor($user);
    }


    public function acceptRequest(string $friendship_id): bool
    {
        $friendship = $this->repository->findPendingRequestById($friendship_id);

        if (!$friendship) {
            throw new Exception("Pedido de amizade não encontrado ou já respondido.");
        }

        return $this->repository->update($friendship->id, ['status' => 'accepted']);
    }

    public function rejectRequest(string $friendship_id): bool
    {
        $friendship = $this->repository->findPendingRequestById($friendship_id);

        if (!$friendship) {
            throw new Exception("Pedido de amizade não encontrado ou já respondido.");
        }

        return $this->repository->delete($friendship->id);
    }

    public function removeFriendToFriend(string $friend_id, string $user_id): bool
    {
        $friendship = $this->repository->findExistingFriendship($user_id, $friend_id);

        if (!$friendship) {
            throw new Exception("Pedido de amizade não encontrado ou já respondido.");
        }

        return $this->repository->delete($friendship->id);
    }

    public function setFriendBlock(string $friend_id, string $user_id): bool
    {
        $friendship = $this->repository->findExistingFriendship($user_id, $friend_id);
        if ($friendship) {
            // 2. Atualiza o status
            return $this->repository->update($friendship->id, ['status' => 'blocked']);
        }

        return false;
    }

    public function getAcceptedFriends(User $user, int $limit = 20, int $offset = 0): Collection
    {
        return $this->repository->getAcceptedFriendsFor($user, $limit, $offset);
    }

    public function getAcceptedFriendsCount(User $user): int
    {
        return $this->repository->getAcceptedFriendsCountFor($user);
    }
}
