import React from "react";
import { Link, Head } from "@inertiajs/react";
import { Button } from "@/Components/ui/button";
import { Shield, Users, Zap } from "lucide-react";
import { Card, CardContent } from "@/Components/ui/card";
import { Header } from "@/Components/Shared/Header";

const Home: React.FC = () => {
    return (
        <>
            <Head title="Bem-vindo" />

            <div className="min-h-screen">

                <Header>
                    <Button variant="ghost" asChild>
                        <Link href={route("form.login")}>Entrar</Link>
                    </Button>
                    <Button asChild>
                        <Link href={route("form.signup")}>Crie sua conta</Link>
                    </Button>
                </Header>

                <main className="container mx-auto px-4 py-16">
                    {/* Seção de Heróis */}
                    <div className="text-center mb-16 animate-fade-in">
                        <h1 className="text-5xl md:text-6xl font-bold text-lukisa-dark mb-6">
                            Bem-vindo ao{" "}
                            <span className="text-lukisa-sage">Lukisa</span>
                        </h1>
                        <p className="text-xl text-lukisa-brown mb-8 max-w-2xl mx-auto">
                            Sua plataforma segura para autenticacao sem emenda e
                            gerenciamento de usuarios. Junte-se a milhares de
                            usuarios que confiam no Lukisa para sua identidade
                            digital.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button asChild size="lg">
                                <Link href={route("form.signup")}>
                                    Comece Gratis
                                </Link>
                            </Button>
                            <Button asChild variant="outline" size="lg">
                                <Link href={route("form.login")}>Entrar</Link>
                            </Button>
                        </div>
                    </div>

                    {/* Seção de Recursos */}
                    <div className="grid md:grid-cols-3 gap-8 mb-16">
                        <Card className="transition-all duration-300 animate-slide-in-left hover:shadow-lg">
                            <CardContent className="p-6 text-center">
                                <Shield className="w-12 h-12 text-lukisa-sage mx-auto mb-4" />
                                <h3 className="text-xl font-semibold text-lukisa-dark mb-2">
                                    Autenticacao Segura
                                </h3>
                                <p className="text-lukisa-brown">
                                    Medidas de seguranca avancadas para proteger
                                    sua conta e informacoes pessoais.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="transition-all duration-300 animate-fade-in hover:shadow-lg">
                            <CardContent className="p-6 text-center">
                                <Users className="w-12 h-12 text-lukisa-sage mx-auto mb-4" />
                                <h3 className="text-xl font-semibold text-lukisa-dark mb-2">
                                    Facil de Usar
                                </h3>
                                <p className="text-lukisa-brown">
                                    Interface intuitiva desenhada para uma
                                    experiencia de usuario sem emenda em todos
                                    os dispositivos.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="transition-all duration-300 animate-slide-in-right hover:shadow-lg">
                            <CardContent className="p-6 text-center">
                                <Zap className="w-12 h-12 text-lukisa-sage mx-auto mb-4" />
                                <h3 className="text-xl font-semibold text-lukisa-dark mb-2">
                                    Rapido e Confiavel
                                </h3>
                                <p className="text-lukisa-brown">
                                    Autenticacao ultrarapida com garantia de
                                    disponibilidade de 99.9%.
                                </p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Seção de CTA */}
                    <div className="text-center bg-white/40 backdrop-blur-sm rounded-2xl p-8 border border-lukisa-cream">
                        <h2 className="text-3xl font-bold text-lukisa-dark mb-4">
                            Pronto para comecar?
                        </h2>
                        <p className="text-lukisa-brown mb-6">
                            Junte-se ao Lukisa hoje e experimente a autenticacao
                            segura e sem emenda.
                        </p>
                        <Button asChild size="lg">
                            <Link href="/register">Crie Sua Conta</Link>
                        </Button>
                    </div>
                </main>
            </div>
        </>
    );
};

export default Home;
