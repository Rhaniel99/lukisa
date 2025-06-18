import React from 'react';
import { Head } from '@inertiajs/react';
import { SignupForm } from './Components/SignupForm';

const Signup: React.FC = () => {
    return (
        <>
            <Head title="Signup" />

            <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 dark:bg-gray-900">
                <div className="text-center">

                    <h1 className="mb-8 text-4xl font-bold text-gray-800 dark:text-gray-200">
                       Registre-se
                    </h1>

                    <SignupForm />

                </div>
            </div>
        </>
    );
};

export default Signup;
