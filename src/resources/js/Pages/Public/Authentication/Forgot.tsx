import React from "react";
import { Head, Link } from "@inertiajs/react";
import { ForgotForm } from "./Components/ForgotForm";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import logo from "/public/img/cat-l.svg";
import { Header } from './Components/Header';

const Forgot: React.FC = () => {
    return (
        <>
            <Head title="Esqueci a senha" />

            {/* Container principal para centralizar o conteúdo na tela */}
            <div className="min-h-screen flex items-center justify-center p-4">
                <div className="w-full max-w-md animate-fade-in">
                    {/* Header */}
                    <Header />

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
