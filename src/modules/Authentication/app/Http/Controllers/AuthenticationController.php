<?php

namespace Modules\Authentication\Http\Controllers;

use App\Http\Controllers\Controller;
use Auth;
use Illuminate\Http\RedirectResponse;
use Illuminate\Validation\ValidationException;
use Modules\Authentication\DTOs\CheckUserData;
use Modules\Authentication\DTOs\LoginData;
use Modules\Authentication\DTOs\RegisterData;
use Modules\Authentication\DTOs\ResetPasswordData;
use Modules\Authentication\DTOs\UpdateProfileData;
use Modules\Authentication\Interfaces\Services\IAuthenticationService;


class AuthenticationController extends Controller
{
    protected IAuthenticationService $authService;

    public function __construct(IAuthenticationService $authService)
    {
        $this->authService = $authService;
    }

    

    public function regProfile(UpdateProfileData $r): RedirectResponse
    {
        $userId = Auth::id();

        $success = $this->authService->updateUserProfile($userId, $r);

        if (!$success) {
            return back()->with('error', 'Ocorreu um erro ao atualizar seu perfil. Por favor, tente novamente.');
        }

        return to_route('lukisa.index')
            ->with('success', 'Perfil atualizado com sucesso!');
    }

    public function authLogin(LoginData $r)
    {
        $success = $this->authService->login($r);

        if (!$success) {
            throw ValidationException::withMessages([
                'email' => 'O e-mail ou a senha informados estão incorretos.',
            ]);
        }

        return to_route('lukisa.index')->with(['success' => "Seja bem vindo novamente!"]);
    }

    public function regSignup(RegisterData $r)
    {
        $user = $this->authService->register($r);
        Auth::login($user);
        request()->session()->regenerate();
        return to_route('lukisa.index')->with(['success' => "Bem vindo! Sua conta foi criada com sucesso."]);
    }

    public function forgotVerify(CheckUserData $r)
    {
        $user = $this->authService->findByEmailAndBirthDate($r);

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
        $success = $this->authService->resetPassword($r);

        if (!$success) {
            return back()->with('errors', 'Os dados informados não correspondem a nenhuma conta.');
        }

        return to_route('home')->with('success', 'Sua senha foi redefinida com sucesso! Você já pode fazer o login.');
    }

    public function logout()
    {
        Auth::logout();
        return to_route('home');
    }

}
