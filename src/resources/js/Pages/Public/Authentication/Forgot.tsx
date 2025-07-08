import React from "react";
import { Head, Link } from "@inertiajs/react";
import { ForgotForm } from "./Components/ForgotForm";
import { ArrowLeft } from "lucide-react";
import logo from "/public/img/logo.svg";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";

const Forgot: React.FC = () => {
    return (
        <>
            <Head title="Esqueci a senha" />

            {/* Container principal para centralizar o conteúdo na tela */}
            <div className="min-h-screen flex items-center justify-center p-4">
                <div className="w-full max-w-md animate-fade-in">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <Link
                            href={route("form.login")}
                            className="inline-flex items-center space-x-2 text-lukisa-brown hover:text-lukisa-dark transition-colors mb-6"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            <span>Voltar para Entrar</span>
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
                        <CardContent className="space-y-6">
                            <ForgotForm />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
};

export default Forgot;
