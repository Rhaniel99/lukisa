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
    public function __construct(protected IFriendshipsService $friendshipService)
    {
    }

    public function store(AddFriendData $data)
    {
        try {
            $this->friendshipService->sendRequest(Auth::user(), $data->tag);
        } catch (Exception $e) {
            // Retorna para a página anterior com uma mensagem de erro
            return back()->with('error', $e->getMessage());
        }

        // Retorna para a página anterior com uma mensagem de sucesso
        return back()->with('success', 'Pedido de amizade enviado com sucesso!');
    }

    public function accept(string $id)
    {
        try {
            $this->friendshipService->acceptRequest($id, Auth::user());
        } catch (Exception $e) {
            return back()->with('error', $e->getMessage());
        }
        return back()->with('success', 'Amigo adicionado!');
    }

    public function destroy(string $id)
    {
        try {
            // No futuro, este método pode ser usado para remover amigos também
            $this->friendshipService->rejectRequest($id, Auth::user());
            
        } catch (Exception $e) {
            return back()->with('error', $e->getMessage());
        }
        return back()->with('success', 'Pedido recusado.');
    }

    public function index()
    {
        $user = Auth::user();
        
        // Carrega dados iniciais (primeiros 20 amigos aceitos e todos os pendentes)
        $pendingRequests = $this->friendshipService->getPendingRequests($user);
        $acceptedFriends = $this->friendshipService->getAcceptedFriends($user, 20, 0);
        
        $pendingData = PendingFriendData::collect($pendingRequests);
        $acceptedData = FriendData::collect($acceptedFriends);
        
        return inertia()->share([
            'pending_friends' => $pendingData,
            'accepted_friends' => $acceptedData,
            'pending_count' => $pendingRequests->count(),
            'accepted_count' => $this->friendshipService->getAcceptedFriendsCount($user)
        ]);
    }

    public function getPending(Request $request)
    {
        $user = Auth::user();
        $pendingRequests = $this->friendshipService->getPendingRequests($user);
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
        
        $acceptedFriends = $this->friendshipService->getAcceptedFriends($user, $limit, $offset);
        $acceptedData = FriendData::collect($acceptedFriends);
        $totalCount = $this->friendshipService->getAcceptedFriendsCount($user);

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
