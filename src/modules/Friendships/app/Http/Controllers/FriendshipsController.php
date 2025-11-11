<?php

namespace Modules\Friendships\Http\Controllers;

use App\Http\Controllers\Controller;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Modules\Friendships\DTOs\AddFriendData;
use Modules\Friendships\DTOs\FriendData;
use Modules\Friendships\DTOs\PendingFriendData;
use Modules\Friendships\Interfaces\Services\IFriendshipsService;

class FriendshipsController extends Controller
{
    private $service;
    public function __construct(IFriendshipsService $service)
    {
        $this->service = $service;
    }

    public function store(AddFriendData $data)
    {
        try {
            $this->service->sendRequest(Auth::user()->id, $data->tag);
        } catch (Exception $e) {
            // Retorna para a página anterior com uma mensagem de erro
            return back()->with('error', $e->getMessage());
        }

        // Retorna para a página anterior com uma mensagem de sucesso
        return back()->with('success', 'Pedido de amizade enviado com sucesso!');
    }

    public function accept(string $friendship_id)
    {
        try {
            $this->service->acceptRequest($friendship_id);
        } catch (Exception $e) {
            return back()->with('error', $e->getMessage());
        }
        return back()->with('success', 'Adicionado com sucesso!');
    }

    public function destroy(string $friendship_id)
    {
        try {
            $this->service->rejectRequest($friendship_id);
        } catch (Exception $e) {
            return back()->with('error', $e->getMessage());
        }
        return back()->with('success', 'Removido com sucesso!');
    }

    public function block(string $friend_id)
    {
        try {
            $this->service->setFriendBlock($friend_id, Auth::user()->id);
        } catch (Exception $e) {
            return back()->with('error', $e->getMessage());
        }
        return back()->with('success', 'Sucesso!');
    }

    public function removeFriendToFriend(string $friend_id)
    {
        try {
            // No futuro, este método pode ser usado para remover amigos também
            $this->service->removeFriendToFriend($friend_id, Auth::user()->id);
        } catch (Exception $e) {
            return back()->with('error', $e->getMessage());
        }
        return back()->with('success', 'Removido com sucesso!');
    }

    public function index()
    {
        $user = Auth::user();

        // Carrega dados iniciais (primeiros 20 amigos aceitos e todos os pendentes)
        $pendingRequests = $this->service->getPendingRequests($user);
        $acceptedFriends = $this->service->getAcceptedFriends($user, 20, 0);

        $pendingData = PendingFriendData::collect($pendingRequests);
        $acceptedData = FriendData::collect($acceptedFriends);

        return inertia()->share([
            'pending_friends' => $pendingData,
            'accepted_friends' => $acceptedData,
            'pending_count' => $pendingRequests->count(),
            'accepted_count' => $this->service->getAcceptedFriendsCount($user)
        ]);
    }

    public function getPending(Request $request)
    {
        $user = Auth::user();
        $pendingRequests = $this->service->getPendingRequests($user);
        $pendingData = PendingFriendData::collect($pendingRequests);

        if ($request->expectsJson()) {
            return response()->json([
                'pending_friends' => $pendingData,
                'count' => $pendingRequests->count()
            ]);
        }

        return inertia()->share(['pending_friends' => $pendingData]);
    }

    public function getAccepted(Request $request)
    {
        $user = Auth::user();
        $limit = $request->get('limit', 20);
        $offset = $request->get('offset', 0);

        $acceptedFriends = $this->service->getAcceptedFriends($user, $limit, $offset);
        $acceptedData = FriendData::collect($acceptedFriends);
        $totalCount = $this->service->getAcceptedFriendsCount($user);

        if ($request->expectsJson()) {
            return response()->json([
                'accepted_friends' => $acceptedData,
                'count' => $acceptedFriends->count(),
                'total_count' => $totalCount,
                'has_more' => ($offset + $limit) < $totalCount,
                'next_offset' => $offset + $limit
            ]);
        }

        return inertia()->share(['accepted_friends' => $acceptedData]);
    }
}
