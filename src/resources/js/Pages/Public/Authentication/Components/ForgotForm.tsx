import React, { useEffect } from 'react';
import { useForm, usePage, Head } from '@inertiajs/react';
import { Form } from '@/Components/UI/Form';
// Importa o tipo base de PageProps do Inertia para estendê-lo
import type { PageProps as InertiaPageProps } from '@inertiajs/core';

// Define uma interface APENAS para as props específicas desta página
interface ForgotPageSpecificProps {
    user_verified?: boolean;
    verified_email?: string;
    errors: {
        email?: string;
    };
}

// O tipo final da nossa página é a INTERSEÇÃO das props globais (que contêm 'auth') com as específicas
type PageProps = InertiaPageProps & ForgotPageSpecificProps;

export const ForgotForm: React.FC = () => {
    // 1. Acessamos TODAS as props da página aqui, uma única vez.
    const { user_verified, verified_email, errors: pageErrors } = usePage<PageProps>().props;

    // 2. O estado da UI é DERIVADO diretamente das props. Sem useState!
    const isUserVerified = user_verified === true;

    // 3. O useForm gerencia o estado interno do formulário.
    const { data, setData, post, processing, errors, reset } = useForm({
        email: verified_email || '', // Pré-preenche o e-mail se ele vier nas props
        birth_date: '',
        password: '',
        password_confirmation: '',
    });

    // 4. Usamos useEffect para reagir a mudanças nas props e causar "efeitos colaterais"
    useEffect(() => {
        // Se a prop 'verified_email' mudar (após a Etapa 1), atualizamos o estado do formulário.
        if (verified_email) {
            console.log('verified_email', verified_email);
            setData('email', verified_email);
        }
    }, [verified_email]); // Este efeito roda sempre que 'verified_email' mudar.

    // ETAPA 1: Envia os dados de verificação.
    const handleCheckUser = () => {
        post(route('forgot.verify'));
    };

    // ETAPA 2: Envia a nova senha.
    const handleResetPassword = () => {
        post(route('forgot.password'), {
            onSuccess: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <div className="w-full max-w-sm">
            <Head title="Esqueci a Senha" />

            {!isUserVerified ? (
                // --- ETAPA 1: VERIFICAÇÃO ---
                <Form onSubmit={handleCheckUser}>
                     <h1 className="mb-4 text-2xl font-bold text-center">Recuperar Senha</h1>
                     <p className="mb-4 text-sm text-center text-gray-600">
                        Informe seu e-mail e data de nascimento para continuar.
                    </p>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">E-mail</label>
                        <input
                            type="email"
                            id="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                            required
                        />
                        {/* Usamos o 'pageErrors' para o erro genérico que vem do controller */}
                        {pageErrors.email && <p className="mt-2 text-xs text-red-600">{pageErrors.email}</p>}
                    </div>

                    <div className="mb-6">
                        <label htmlFor="birth_date" className="block text-sm font-medium text-gray-700">Data de Nascimento</label>
                        <input
                            type="date"
                            id="birth_date"
                            value={data.birth_date}
                            onChange={(e) => setData('birth_date', e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                            required
                        />
                    </div>

                    <button type="submit" disabled={processing} className="w-full rounded-lg bg-blue-600 px-6 py-2 font-semibold text-white shadow-md disabled:opacity-50">
                        {processing ? 'Verificando...' : 'Verificar'}
                    </button>
                </Form>
            ) : (
                // --- ETAPA 2: REDEFINIÇÃO DE SENHA ---
                <Form onSubmit={handleResetPassword}>
                    <h1 className="mb-4 text-2xl font-bold text-center">Crie uma Nova Senha</h1>
                     <p className="mb-4 text-sm text-center text-green-700">
                        Usuário verificado com sucesso para o e-mail: <strong>{data.email}</strong>
                    </p>
                    <input type="hidden" name="email" value={data.email} />

                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Nova Senha</label>
                        <input
                            type="password"
                            id="password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                            required
                            autoFocus
                        />
                        {/* Usamos o 'errors' do useForm para erros de campo específicos da Etapa 2 */}
                        {errors.password && <p className="mt-2 text-xs text-red-600">{errors.password}</p>}
                    </div>

                    <div className="mb-6">
                        <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700">Confirmar Senha</label>
                        <input
                            type="password"
                            id="password_confirmation"
                            value={data.password_confirmation}
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                            required
                        />
                    </div>

                    <button type="submit" disabled={processing} className="w-full rounded-lg bg-blue-600 px-6 py-2 font-semibold text-white shadow-md disabled:opacity-50">
                        {processing ? 'Salvando...' : 'Redefinir Senha'}
                    </button>
                </Form>
            )}
        </div>
    );
};
