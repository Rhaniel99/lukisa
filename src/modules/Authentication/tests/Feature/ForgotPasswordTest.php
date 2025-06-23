<?php

namespace Modules\Authentication\Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class ForgotPasswordTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Testa se um usuário pode ser verificado com sucesso na primeira etapa.
     *
     * @return void
     */
    public function test_user_can_be_verified_with_correct_data(): void
    {
        // 1. Arrange (Preparar)
        // Cria um usuário com dados conhecidos no banco de teste.
        User::factory()->create([
            'email' => 'test@example.com',
            'birth_date' => '1990-05-15',
        ]);

        // 2. Act (Agir)
        // Simula o envio do formulário da primeira etapa.
        $response = $this->post(route('forgot.verify'), [
            'email' => 'test@example.com',
            'birth_date' => '1990-05-15',
        ]);

        // 3. Assert (Verificar)
        // Verifica se o backend re-renderizou a página com as props corretas.
        $response->assertOk();
        $response->assertInertia(
            fn(Assert $page) => $page
                ->component('Public/Authentication/Forgot')
                ->where('user_verified', true)
                ->where('verified_email', 'test@example.com')
        );
    }

    /**
     * Testa se a verificação falha com dados incorretos.
     *
     * @return void
     */
    public function test_user_verification_fails_with_incorrect_data(): void
    {
        // Arrange: Cria um usuário.
        User::factory()->create([
            'email' => 'test@example.com',
            'birth_date' => '1990-05-15',
        ]);

        // Act: Envia uma data de nascimento errada.
        $response = $this->post(route('forgot.verify'), [
            'email' => 'test@example.com',
            'birth_date' => '1999-12-31',
        ]);

        // Assert: Verifica se ele foi redirecionado de volta com um erro.
        $response->assertSessionHasErrors();
    }

    /**
     * Testa se a senha pode ser redefinida com sucesso na segunda etapa.
     *
     * @return void
     */
    public function test_password_can_be_reset_successfully(): void
    {
        // Arrange: Cria o usuário.
        $user = User::factory()->create(['email' => 'test@example.com']);
        $newPassword = 'NewSecurePassword123!';

        // Act: Simula o envio do formulário da segunda etapa.
        $response = $this->post(route('forgot.password'), [
            'email' => $user->email,
            'password' => $newPassword,
            'password_confirmation' => $newPassword,
        ]);

        // Assert:
        // Verifica se foi redirecionado para a página de home.
        $response->assertRedirect(route('home'));

        // Verifica se a sessão flash tem a mensagem de sucesso.
        $response->assertSessionHas('success', 'Sua senha foi redefinida com sucesso! Você já pode fazer o login.');

        // Pega o usuário do banco novamente para verificar se a senha mudou.
        $updatedUser = User::find($user->id);

        // Verifica se a nova senha funciona e é diferente da antiga.
        $this->assertTrue(Hash::check($newPassword, $updatedUser->password));
        $this->assertNotEquals($user->password, $updatedUser->password);
    }
}
