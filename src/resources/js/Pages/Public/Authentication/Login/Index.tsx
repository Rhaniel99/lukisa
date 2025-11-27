import { Head, Link } from "@inertiajs/react";
import LoginForm  from "./components/LoginForm";
import { ArrowLeft } from 'lucide-react';
import logo from "/public/img/cat-l.svg";

export default function Login() {

    return (
        <>
            <Head title="Entrar" />

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

                        {/* Header */}
                        <div className="text-center mb-8">
                            <h1 className="text-[#3D2817] mb-2">Bem-vindo de volta</h1>
                            <p className="text-[#6B4E3D]">
                                Faça login na sua conta para continuar
                            </p>
                        </div>

                        {/* Form */}
                        <LoginForm />


                        {/* Divider */}
                        <div className="relative my-8">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-[#D4C5A9]"></div>
                            </div>
                            <div className="relative flex justify-center">
                                <span className="bg-[#F5EFE6] px-4 text-[#8B7355]">
                                    Ou continue com
                                </span>
                            </div>
                        </div>

                        {/* Social Login */}
                        <div className="grid grid-cols-2 gap-4">
                            <button
                                type="button"
                                // onClick={handleGoogleLogin}
                                className="flex items-center justify-center gap-2 py-3 border-2 border-[#E8DCC4] rounded-xl hover:bg-white transition-colors"
                            >
                                <svg className="w-5 h-5" viewBox="0 0 24 24">
                                    <path
                                        fill="#4285F4"
                                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                    />
                                    <path
                                        fill="#34A853"
                                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                    />
                                    <path
                                        fill="#FBBC05"
                                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                    />
                                    <path
                                        fill="#EA4335"
                                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                    />
                                </svg>
                                <span className="text-[#3D2817]">Google</span>
                            </button>
                            <button
                                type="button"
                                // onClick={handleFacebookLogin}
                                className="flex items-center justify-center gap-2 py-3 border-2 border-[#E8DCC4] rounded-xl hover:bg-white transition-colors"
                            >
                                <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                </svg>
                                <span className="text-[#3D2817]">Facebook</span>
                            </button>
                        </div>

                        {/* Sign up link */}
                        <p className="text-center mt-8 text-[#6B4E3D]">
                            Não tem uma conta?{' '}
                            <Link
                                href={route("form.signup")}
                                className="text-[#3D2817] hover:underline"
                            >
                                Cadastre-se
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};