<?php

namespace Modules\Authentication\Http\Controllers;

use App\Http\Controllers\Controller;
use Auth;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Modules\Authentication\DTOs\LoginData;
use Modules\Authentication\DTOs\RegisterData;
use Modules\Authentication\Interfaces\Services\IAuthenticationService;


class AuthenticationController extends Controller
{
    protected IAuthenticationService $authService;

    public function __construct(IAuthenticationService $authService)
    {
        $this->authService = $authService;
    }

    public function formLogin(): Response
    {
        return Inertia::render('Public/Authentication/Login');
    }

    public function authLogin(LoginData $r)
    {
        $success = $this->authService->login($r);

        if (!$success) {
            // O Inertia irá automaticamente colocar essa mensagem no objeto 'errors'.
            return back()->withErrors(['errors' => "Email ou senha inválidos."]);
        }

        return to_route('lukisa.index')->with(['success' => "Seja bem vindo novamente!"]);
    }

    public function formSignup()
    {
        return Inertia::render('Public/Authentication/Signup');
    }

    public function regSignup(RegisterData $r)
    {
        $user = $this->authService->register($r);
        Auth::login($user);
        request()->session()->regenerate();
        return to_route('lukisa.index')->with(['success' => "Bem vindo! Sua conta foi criada com sucesso."]);
    }

    public function logout()
    {
        Auth::logout();
        return to_route('home');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        return view('authentication::edit');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
    }
}
