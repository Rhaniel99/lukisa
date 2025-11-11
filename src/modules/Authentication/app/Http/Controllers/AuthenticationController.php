<?php

namespace Modules\Authentication\Http\Controllers;

use App\Http\Controllers\Controller;
use Auth;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Modules\Authentication\DTOs\CheckUserData;
use Modules\Authentication\DTOs\LoginData;
use Modules\Authentication\DTOs\RegisterData;
use Modules\Authentication\DTOs\ResetPasswordData;
use Modules\Authentication\DTOs\UpdateProfileData;
use Modules\Authentication\Interfaces\Services\IAuthenticationService;


class AuthenticationController extends Controller
{
    protected IAuthenticationService $service;

    public function __construct(IAuthenticationService $service)
    {
        $this->service = $service;
    }

    public function profileRegister(UpdateProfileData $r): RedirectResponse
    {
        $userId = Auth::id();
        $success = $this->service->updateProfile($userId, $r);

        if (!$success) {
            return back()->with('error', 'Ocorreu um erro ao atualizar seu perfil. Por favor, tente novamente.');
        }

        return to_route('lukisa.index')
            ->with('success', 'Perfil atualizado com sucesso!');
    }

    public function authLogin(LoginData $r)
    {
        $success = $this->service->login($r);

        if (!$success) {
            throw ValidationException::withMessages([
                'email' => 'O e-mail ou a senha informados estão incorretos.',
            ]);
        }

        return to_route('lukisa.index')->with(['success' => "Seja bem vindo novamente!"]);
    }

    public function userRegister(RegisterData $r)
    {
        $user = $this->service->register($r);
        Auth::login($user);
        request()->session()->regenerate();
        return to_route('lukisa.index')->with(['success' => "Bem vindo! Sua conta foi criada com sucesso."]);
    }

    public function forgotVerify(CheckUserData $r)
    {
        $user = $this->service->findByEmailAndBirthDate($r);

        if ($user) {
            return inertia('Public/Authentication/Forgot', [
                'verified_email' => $user->email,
                'user_verified' => true,
            ]);
        }

        return back()->withErrors(['errors' => "Os dados informados não correspondem a nenhuma conta."]);
    }

    public function forgotPassword(ResetPasswordData $r): RedirectResponse
    {
        $success = $this->service->resetPassword($r);

        if (!$success) {
            return back()->with('errors', 'Os dados informados não correspondem a nenhuma conta.');
        }

        return to_route('home')->with('success', 'Sua senha foi redefinida com sucesso! Você já pode fazer o login.');
    }
    
    public function updateProfile(Request $request, $id)
    {
        dd($id);
        dd($request->all());
    }

    public function logout()
    {
        Auth::logout();
        return to_route('home');
    }

}
