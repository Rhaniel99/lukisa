import React from 'react';
import { Head } from '@inertiajs/react';
// import { ForgoutForm } from './Components/ForgoutForm';

const Forgout: React.FC = () => {
    return (
        <>
            {/* O componente Head do Inertia gerencia a tag <title> da página */}
            <Head title="Forgout" />

            {/* Container principal para centralizar o conteúdo na tela */}
            <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 dark:bg-gray-900">
                <div className="text-center">

                    {/* Mensagem de boas-vindas */}
                    <h1 className="mb-8 text-4xl font-bold text-gray-800 dark:text-gray-200">
                       Esqueceu sua senha?
                    </h1>

                    {/* <ForgoutForm /> */}

                </div>
            </div>
        </>
    );
};

export default Forgout;
