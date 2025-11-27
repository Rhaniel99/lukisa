import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import logo from "/public/img/cat-l.svg";
import { Button } from "@/Components/ui/button";
import { Head } from "@inertiajs/react";
import ProfileForm from './components/ProfileForm';

export default function Profile() {

    return (
        <>
            <Head title="Perfil" />

            <div className="min-h-screen flex items-center justify-center p-4">
                <div className="w-full max-w-md animate-fade-in">
                    {/* Header */}
                    <div className="text-center mb-8">
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
                                Complete seu perfil
                            </CardTitle>
                            <CardDescription className="text-lukisa-brown">
                                Configure seu nome de usuário e foto de perfil
                            </CardDescription>
                        </CardHeader>

                        <CardContent className="space-y-6">

                            <ProfileForm />

                            <div className="text-center">
                                <Button
                                    variant="ghost"
                                    className="text-lukisa-brown hover:text-lukisa-dark"
                                    onClick={() => (window.location.href = "/")}
                                >
                                    Pular por enquanto
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
}
