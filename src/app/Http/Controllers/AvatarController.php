<?php

namespace App\Http\Controllers;

use App\Models\User;
use Spatie\MediaLibrary\MediaCollections\Models\Media;
use Symfony\Component\HttpFoundation\Response;

class AvatarController extends Controller
{
    /**
     * Retorna o avatar atual de um usuário.
     *
     * @param User $user
     * @return Response
     */
    public function show(User $user)
    {
        $avatar = $user->getMedia('avatars')
            ->sortByDesc('created_at')
            ->first();

        if (!$avatar) {
            // Futuramente, podemos retornar uma imagem padrão.
            abort(404, 'Avatar not found.');
        }

        // A Spatie/MediaLibrary cuida de retornar a imagem com os headers corretos.
        return $avatar;
    }

    /**
     * Retorna uma imagem específica da coleção de mídia,
     * usado para o histórico de avatares.
     *
     * @param Media $media
     * @return Media
     */
    public function showFromMedia(Media $media)
    {
        // Aqui, poderíamos adicionar uma verificação de política para garantir
        // que o usuário logado tem permissão para ver esta mídia.
        // Por enquanto, está aberto para simplificar.
        return $media;
    }
}
