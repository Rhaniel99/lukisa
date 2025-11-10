<?php

namespace Modules\Friendships\Services;

use App\Models\User;
use Exception;
use Illuminate\Database\Eloquent\Collection;
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

    /**
     * Envia um novo pedido de amizade.
     *
     * @param User $sender O usuário que está enviando o pedido.
     * @param string $receiverTag A tag do usuário que receberá o pedido (ex: "rhaniel#1234").
     * @return Friendship O registro da amizade criada.
     * @throws Exception Se uma regra de negócio for violada.
     */
    public function sendRequest(User $sender, string $receiverTag): Friendship
    {
        $receiver = $this->repository->findUserByTag($receiverTag);

        if (!$receiver) {
            throw new Exception('O usuário com esta tag não foi encontrado.');
        }

        if ($sender->id === $receiver->id) {
            throw new Exception('Você não pode adicionar a si mesmo como amigo.');
        }

        // Verifica se já existe uma amizade ou pedido entre os dois
        $existingFriendship = $this->repository->findExistingFriendship($sender, $receiver);

        if ($existingFriendship) {
            if ($existingFriendship->status === 'pending') {
                throw new Exception('Um pedido de amizade já está pendente.');
            }
            throw new Exception('Você já é amigo deste usuário.');
        }

        return $this->repository->createRequest($sender, $receiver);
    }

    public function getPendingRequests(User $user): Collection
    {
        return $this->repository->getPendingRequestsFor($user);
    }

    public function getPendingRequestsCount(User $user): int
    {
        return $this->repository->getPendingRequestsCountFor($user);
    }


    public function acceptRequest(string $friendshipId, User $user): bool
    {
        $friendship = $this->repository->findPendingRequestById($friendshipId, $user);

        if (!$friendship) {
            throw new Exception("Pedido de amizade não encontrado ou já respondido.");
        }

        return $this->repository->update($friendship->id, ['status' => 'accepted']);
    }

    public function rejectRequest(string $friendshipId, User $user): bool
    {
        $friendship = $this->repository->findPendingRequestById($friendshipId, $user);

        if (!$friendship) {
            throw new Exception("Pedido de amizade não encontrado ou já respondido.");
        }

        return $this->repository->delete($friendship->id);
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
