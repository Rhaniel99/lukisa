<?php

namespace Modules\Friendships\Http\Controllers;

use App\Http\Controllers\Controller;
use Auth;
use Exception;
use Modules\Friendships\DTOs\AddFriendData;
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

}
