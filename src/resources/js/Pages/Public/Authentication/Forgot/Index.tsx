import { Head, Link } from "@inertiajs/react";
import ForgotForm from "./components/ForgotForm";
import logo from "/public/img/cat-l.svg";
import { ArrowLeft } from 'lucide-react';

export default function Forgot() {
    return (
        <>
            <Head title="Recuperar Senha" />

            {/* Container principal para centralizar o conteúdo na tela */}
            <div className="min-h-screen bg-gradient-to-br from-[#E8DCC4] via-[#D4C5A9] to-[#C9B59A] flex items-center justify-center p-4">
                <div className="w-full max-w-md">
                    {/* Back Button */}
                    <button
                        onClick={() => window.history.back()}
                        className="flex items-center gap-2 text-[#6B4E3D] hover:text-[#3D2817] mb-8 transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Voltar
                    </button>

                    {/* Card */}
                    <div className="bg-[#F5EFE6] rounded-3xl shadow-2xl p-8 md:p-10">
                        {/* Logo */}
                        <div className="flex justify-center mb-8">
                            <div className="w-20 h-20 bg-[#6B4E3D] rounded-2xl flex items-center justify-center shadow-xl transform hover:scale-105 transition-transform duration-300">
                                <img
                                    src={logo}
                                    alt="Lukisa Logo"
                                    className="w-12 h-12 object-contain brightness-0 invert"
                                />
                            </div>
                        </div>

                        {/* Formulário */}
                        <ForgotForm />

                        {/* Back to login link */}
                        <p className="text-center mt-8 text-[#6B4E3D]">
                            Lembrou sua senha?{' '}
                            <Link
                                href={route("form.login")}
                                className="text-[#3D2817] hover:underline"
                            >
                                Fazer login
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};