import React, { FormEvent } from "react";
import { useForm } from "@inertiajs/react";
import { Form } from "@/Components/UI/Form";

export const SignupForm: React.FC = () => {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        birth_date: "",
        password_confirmation: "",
    });

    const submit = () => {
        post(route("auth.register"), {
            onError: () => {
                reset("password", "password_confirmation");
            },
        });
    };

    return (
        <Form onSubmit={submit} className="w-full max-w-sm">
            {/* Campo de Nome */}

            <div className="mb-4">
                <label htmlFor="name" className="...">
                    Nome Completo
                </label>
                <input
                    id="name"
                    type="text"
                    value={data.name}
                    onChange={(e) => setData("name", e.target.value)}
                    className="..."
                    required
                    autoFocus
                />
                {errors.name && (
                    <p className="mt-2 text-xs text-red-600">{errors.name}</p>
                )}
            </div>

            {/* Campo de E-mail */}
            <div className="mb-4">
                <label htmlFor="email" className="...">
                    Email
                </label>
                <input
                    id="email"
                    type="email"
                    value={data.email}
                    onChange={(e) => setData("email", e.target.value)}
                    className="..."
                    required
                    autoFocus
                />
                {errors.email && (
                    <p className="mt-2 text-xs text-red-600">{errors.email}</p>
                )}
            </div>

            {/* Campo de Data de Nascimento */}
            <div className="mb-4">
                <label htmlFor="birth_date" className="...">
                    Data de Nascimento
                </label>
                <input
                    id="birth_date"
                    type="date"
                    value={data.birth_date}
                    onChange={(e) => setData("birth_date", e.target.value)}
                    className="..."
                    required
                />
                {errors.birth_date && (
                    <p className="mt-2 text-xs text-red-600">
                        {errors.birth_date}
                    </p>
                )}
            </div>

            {/* Campo de Senha */}
            <div className="mb-6">
                <label htmlFor="password" className="...">
                    Senha
                </label>
                <input
                    id="password"
                    type="password"
                    value={data.password}
                    onChange={(e) => setData("password", e.target.value)}
                    className="..."
                    required
                />
                {errors.password && (
                    <p className="mt-2 text-xs text-red-600">
                        {errors.password}
                    </p>
                )}
            </div>

            {/* Campo de Confirme Senha */}
            <div className="mb-6">
                <label
                    htmlFor="password_confirmation"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                    Confirmar Senha
                </label>
                <input
                    id="password_confirmation"
                    type="password"
                    value={data.password_confirmation}
                    onChange={(e) =>
                        setData("password_confirmation", e.target.value)
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                    required
                />

                {errors.password_confirmation && (
                    <p className="mt-2 text-xs text-red-600">
                        {errors.password_confirmation}
                    </p>
                )}
            </div>

            {/* Botão de Envio */}
            <div className="flex items-center">
                <button
                    type="submit"
                    className="w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white shadow-md transition duration-300 ease-in-out hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 disabled:opacity-50"
                    disabled={processing}
                >
                    {processing ? "Enviando..." : "Cadastrar"}
                </button>
            </div>
        </Form>
    );
};
