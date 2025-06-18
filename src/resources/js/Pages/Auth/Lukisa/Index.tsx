import React from "react";
import { Link, Head, usePage } from "@inertiajs/react";

const Index: React.FC = () => {
    const { auth } = usePage().props;

    return (
        <>
            <Head title="Bem-vindo" />

            {/* Container principal para centralizar o conteúdo na tela */}
            <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 dark:bg-gray-900">
                <div className="text-center">
                    {/* Mensagem de boas-vindas */}
                    <h1 className="mb-8 text-4xl font-bold text-gray-800 dark:text-gray-200">
                        Bem-vindo usuário autenticado ao Lukisa: {auth.user.name}
                    </h1>
                </div>
            </div>
        </>
    );
};

export default Index;
