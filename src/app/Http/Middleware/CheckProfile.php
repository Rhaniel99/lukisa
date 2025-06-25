<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class CheckProfile
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Verifica se o usuário está autenticado E se o status dele é nulo
        if (Auth::check() && is_null(Auth::user()->status)) {
            // Verifica se a rota atual NÃO é a página de completar o perfil
            // para evitar um loop de redirecionamento.
            if (!$request->routeIs('profile.complete')) {
                // Se as condições forem verdadeiras, redireciona para a página de completar o perfil.
                return to_route('profile.complete');
            }
        }

        // Se nenhuma das condições for atendida, permite que a requisição continue normalmente.
        return $next($request);
    }
}
