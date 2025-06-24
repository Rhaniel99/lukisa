import React, { useState } from "react";
import { useForm, Link, Head } from "@inertiajs/react";
import { Switch } from "@/components/ui/switch"


const Home: React.FC = () => {
    return (
        <>
            <Head title="Bem-vindo" />


            
            <div>
                aqui
            <Switch />

            </div>

            {/*
            <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 dark:bg-gray-900">
                <div className="text-center">
                    <h1 className="mb-8 text-4xl font-bold text-gray-800 dark:text-gray-200">
                        Bem-vindo à Aplicação Lukisa
                    </h1>

                    <Link
                        href={route("form.login")}
                        className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white shadow-md transition duration-300 ease-in-out hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
                    >
                        Login
                    </Link>

                    <br />

                    <Link
                        href={route("form.signup")}
                        className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white shadow-md transition duration-300 ease-in-out hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
                    >
                        Signup
                    </Link>

                    <br />

                    <Link
                        href={route("form.forgot")}
                        className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white shadow-md transition duration-300 ease-in-out hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
                    >
                        Forgot
                    </Link>
                </div>
            </div>
            */}
        </>
    );
};

export default Home;
