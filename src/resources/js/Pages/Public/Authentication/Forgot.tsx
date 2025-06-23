import React from 'react';
import { Head } from '@inertiajs/react';
import { ForgotForm } from './Components/ForgotForm';

const Forgot: React.FC = () => {
    return (
        <>
            {/* O componente Head do Inertia gerencia a tag <title> da página */}
            <Head title="Forgot" />

            {/* Container principal para centralizar o conteúdo na tela */}
            <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 dark:bg-gray-900">
                <div className="text-center">

                    <ForgotForm />

                </div>
            </div>
        </>
    );
};

export default Forgot;
