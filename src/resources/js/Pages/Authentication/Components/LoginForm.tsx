import React, { FormEvent } from "react";
import { useForm } from "@inertiajs/react";
import { Form } from "@/Components/UI/Form";

export const LoginForm: React.FC = () => {
    // ? O hook useForm gerencia o estado do formulário para nós.
    const { data, setData, post, processing, errors } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    // ? Função que é chamada quando o formulário é enviado.
    const submit = () => {
        post(route("auth.login"));
    };

    return (
        <Form onSubmit={submit} className="w-full max-w-sm">
            {/* Campo de E-mail */}
            <div className="mb-4">
                <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                    Email
                </label>
                <input
                    id="email"
                    type="email"
                    value={data.email}
                    onChange={(e) => setData("email", e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                    required
                    autoFocus
                />
                {/* Exibe o erro de validação para o campo 'email', se houver */}
                {errors.email && (
                    <p className="mt-2 text-xs text-red-600">{errors.email}</p>
                )}
            </div>

            {/* Campo de Senha */}
            <div className="mb-6">
                <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                    Senha
                </label>
                <input
                    id="password"
                    type="password"
                    value={data.password}
                    onChange={(e) => setData("password", e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                    required
                />
                {errors.password && (
                    <p className="mt-2 text-xs text-red-600">
                        {errors.password}
                    </p>
                )}
            </div>

            {/* Botão de Envio */}
            <div className="flex items-center">
                <button
                    type="submit"
                    className="w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white shadow-md transition duration-300 ease-in-out hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 disabled:opacity-50"
                    disabled={processing} // O botão é desativado enquanto o Formulário está sendo enviado
                >
                    {processing ? "Enviando..." : "Entrar"}
                </button>
            </div>
        </Form>
    );
};
