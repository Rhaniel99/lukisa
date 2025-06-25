import React from "react";
import { Head, Link } from "@inertiajs/react";
import logo from "/public/img/logo.svg";
import { LoginForm } from "./Components/LoginForm";
import { ArrowLeft } from "lucide-react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

const Login: React.FC = () => {
    return (
        <>
            <Head title="Entrar" />

            <div className="min-h-screen flex items-center justify-center p-4">
                <div className="w-full max-w-md animate-fade-in">
                    <div className="text-center mb-8">
                        <Link
                            href={route("home")}
                            className="inline-flex items-center space-x-2 text-lukisa-brown hover:text-lukisa-dark transition-colors mb-6"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            <span>Voltar para home</span>
                        </Link>

                        <div className="flex items-center justify-center space-x-3 mb-4">
                            <img
                                src={logo}
                                alt="Lukisa Logo"
                                width={40}
                                height={40}
                                className="w-10 h-10"
                            />
                            <h1 className="text-2xl font-bold text-lukisa-dark">
                                Lukisa
                            </h1>
                        </div>
                    </div>

                    <Card className="bg-white/80 backdrop-blur-sm border-lukisa-cream shadow-xl">
                        <CardHeader className="text-center">
                            <CardTitle className="text-2xl text-lukisa-dark">
                                Bem-vindo de volta
                            </CardTitle>
                            <CardDescription className="text-lukisa-brown">
                                Faça login na sua conta para continuar
                            </CardDescription>
                        </CardHeader>

                        <CardContent className="space-y-6">

                            <LoginForm />

                            <div className="relative">
                                <Separator className="bg-lukisa-cream" />
                                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-sm text-lukisa-brown">
                                    Ou continue com
                                </span>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <Button
                                    variant="outline"
                                    className="border-lukisa-cream hover:bg-lukisa-light text-lukisa-brown"
                                >
                                    <svg
                                        className="w-4 h-4 mr-2"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            fill="currentColor"
                                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                        />
                                        <path
                                            fill="currentColor"
                                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                        />
                                        <path
                                            fill="currentColor"
                                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                        />
                                        <path
                                            fill="currentColor"
                                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                        />
                                    </svg>
                                    Google
                                </Button>

                                <Button
                                    variant="outline"
                                    className="border-lukisa-cream hover:bg-lukisa-light text-lukisa-brown"
                                >
                                    <svg
                                        className="w-4 h-4 mr-2"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                    </svg>
                                    Facebook
                                </Button>
                            </div>

                            <div className="text-center">
                                <span className="text-lukisa-brown">
                                    Não tem uma conta? {" "}
                                </span>
                                <Link
                                    href={route("form.signup")}
                                    className="text-lukisa-sage hover:text-lukisa-brown transition-colors font-medium"
                                >
                                    Cadastre-se
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
};

export default Login;
