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
    public function __construct(
        protected IFriendshipsRepository $friendshipRepository
    ) {
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
        $receiver = $this->friendshipRepository->findUserByTag($receiverTag);

        if (!$receiver) {
            throw new Exception('O usuário com esta tag não foi encontrado.');
        }

        if ($sender->id === $receiver->id) {
            throw new Exception('Você não pode adicionar a si mesmo como amigo.');
        }

        // Verifica se já existe uma amizade ou pedido entre os dois
        $existingFriendship = $this->friendshipRepository->findExistingFriendship($sender, $receiver);

        if ($existingFriendship) {
            if ($existingFriendship->status === 'pending') {
                throw new Exception('Um pedido de amizade já está pendente.');
            }
            throw new Exception('Você já é amigo deste usuário.');
        }

        return $this->friendshipRepository->createRequest($sender, $receiver);
    }

    public function getPendingRequests(User $user): Collection
    {
        return $this->friendshipRepository->getPendingRequestsFor($user);
    }

    public function acceptRequest(string $friendshipId, User $user): bool
    {
        $friendship = $this->friendshipRepository->findPendingRequestById($friendshipId, $user);

        if (!$friendship) {
            throw new Exception("Pedido de amizade não encontrado ou já respondido.");
        }

        return $this->friendshipRepository->update($friendship->id, ['status' => 'accepted']);
    }

    public function rejectRequest(string $friendshipId, User $user): bool
    {
        $friendship = $this->friendshipRepository->findPendingRequestById($friendshipId, $user);

        if (!$friendship) {
            throw new Exception("Pedido de amizade não encontrado ou já respondido.");
        }

        return $this->friendshipRepository->delete($friendship->id);
    }

}