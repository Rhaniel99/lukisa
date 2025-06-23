<?php

namespace Modules\Authentication\Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class UserRegistrationTest extends TestCase
{
    // Este trait mágico cuida de resetar nosso banco de dados para cada teste
    use RefreshDatabase;

    /**
     * Testa se um usuário pode se registrar com sucesso com dados válidos.
     * O nome do método deve começar com 'test_'.
     *
     * @return void
     */
    public function test_a_user_can_register_successfully(): void
    {
        // 1. Arrange (Preparar)
        // Preparamos os dados que seriam enviados pelo formulário.
        $userData = [
            'name' => 'John Doe',
            'email' => 'johndoe@example.com',
            'birth_date' => '1990-01-15',
            'password' => 'password123',
            'password_confirmation' => 'password123',
        ];

        // 2. Act (Agir)
        // Simula uma requisição POST a rota de registro.
        $response = $this->post(route('auth.register'), $userData);

        // 3. Assert (Verificar)
        // Verifica se foi redirecionado com sucesso.
        $response->assertRedirect();

        // Verifica se agora existe um usuário autenticado na sessão.
        $this->assertAuthenticated();

        // Verifica se um registro com este e-mail foi realmente criado no banco.
        $this->assertDatabaseHas('users', [
            'email' => 'johndoe@example.com',
            'name' => 'John Doe',
        ]);

        // Verifica se a senha salva no banco NÃO é a senha em texto plano.
        $user = User::first();
        $this->assertNotEquals('password123', $user->password);
    }

    /**
     * Testa se o registro falha se a confirmação de senha não bater.
     *
     * @return void
     */
    public function test_registration_fails_if_passwords_do_not_match(): void
    {
        // 1. Arrange (Preparar)
        $userData = [
            'name' => 'Jane Doe',
            'email' => 'janedoe@example.com',
            'birth_date' => '1992-05-20',
            'password' => 'password123',
            'password_confirmation' => 'password_diferente', // Senha incorreta
        ];

        // 2. Act (Agir)
        $response = $this->post(route('auth.register'), $userData);

        // 3. Assert (Verificar)

        // Verifica se a sessão contém um erro de validação para o campo 'password'.
        $response->assertSessionHasErrors('password');

        // Garante que nenhum usuário foi criado no banco.
        $this->assertDatabaseMissing('users', [
            'email' => 'janedoe@example.com',
        ]);

        // Garante que o usuário não foi autenticado.
        $this->assertGuest();
    }
}
