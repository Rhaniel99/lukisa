<?php

namespace Modules\Authentication\Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class UserLoginTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Testa se um usuário existente consegue fazer login com as credenciais corretas.
     *
     * @return void
     */
    public function test_user_can_login_with_correct_credentials(): void
    {
        // 1. Arrange (Preparar)
        // Criamos uma senha conhecida.
        $password = 'Password123!';

        // Criar um usuário no banco de dados de teste.
        $user = User::factory()->create([
            'email' => 'test@example.com',
            'password' => Hash::make($password),
        ]);

        // 2. Act (Agir)
        // Envio do formulário de login com os dados corretos.
        $response = $this->post(route('auth.login'), [
            'email' => $user->email,
            'password' => $password,
        ]);

        // 3. Assert (Verificar)
        // Verificamos se o resultado foi o esperado.
        $response->assertRedirect(route('lukisa.index'));

        // A asserção mais importante: verifica se o usuário correto está autenticado.
        $this->assertAuthenticatedAs($user);
    }

    /**
     * Testa se o login falha com uma senha incorreta.
     *
     * @return void
     */
    public function test_user_cannot_login_with_incorrect_password(): void
    {
        // Arrange: Cria um usuário
        $user = User::factory()->create([
            'password' => Hash::make('correct-password'),
        ]);

        // Act: Loga com a senha errada
        $response = $this->post(route('auth.login'), [
            'email' => $user->email,
            'password' => 'wrong-password',
        ]);

        // Assert:
        // Verifica se a sessão contém um erro para o campo 'email' (onde colocamos a mensagem genérica)
        $response->assertSessionHasErrors('email');

        // Garante que nenhum usuário foi autenticado
        $this->assertGuest();
    }

    /**
     * Testa se o login falha com um e-mail que não existe no banco.
     *
     * @return void
     */
    public function test_user_cannot_login_with_a_non_existent_email(): void
    {
        // Act: Tenta logar com um e-mail que não foi cadastrado
        $response = $this->post(route('auth.login'), [
            'email' => 'nonexistent@example.com',
            'password' => 'any-password',
        ]);

        // Assert:
        // O comportamento deve ser o mesmo do erro de senha incorreta para não vazar informação.
        $response->assertSessionHasErrors('email');
        $this->assertGuest();
    }
}
