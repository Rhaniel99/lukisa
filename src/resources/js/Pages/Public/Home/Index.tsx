import { Link, Head } from "@inertiajs/react";
import { Coffee, Users, Heart, ArrowRight, MapPin, Wallet, Bot } from 'lucide-react';
import logo from "/public/img/cat-l.svg";

export default function Index() {

    return (
        <>
            <Head title="Bem-vindo" />
            
            <div className="min-h-screen bg-gradient-to-br from-[#E8DCC4] via-[#D4C5A9] to-[#C9B59A]">
                {/* Header */}
                <header className="container mx-auto px-4 py-6 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <img src={logo} alt="Lukisa Logo" className="w-12 h-12 rounded-full  bg-[#F5EFE6]" />
                    </div>
                    <nav className="hidden md:flex items-center gap-8">
                        <a href="#features" className="text-[#6B4E3D] hover:text-[#3D2817] transition-colors">
                            Recursos
                        </a>
                        <a href="#about" className="text-[#6B4E3D] hover:text-[#3D2817] transition-colors">
                            Sobre
                        </a>

                        <Link
                            href={route("form.login")}
                            className="text-[#6B4E3D] hover:text-[#3D2817] transition-colors"
                        >
                            Entrar
                        </Link>

                        <Link
                            href={route("form.signup")}
                            className="bg-[#6B4E3D] text-[#F5EFE6] px-6 py-2 rounded-full hover:bg-[#3D2817] transition-colors"
                        >
                            Cadastrar
                        </Link>
                    </nav>
                </header>

                {/* Hero Section */}
                <section className="container mx-auto px-4 py-20 md:py-24">
                    <div className="max-w-4xl mx-auto text-center mb-16 space-y-6">
                        <div className="inline-block bg-[#F5EFE6] px-4 py-2 rounded-full text-[#6B4E3D]">
                            ☕ Bem-vindo ao seu espaço
                        </div>
                        <h1 className="text-[#3D2817] text-5xl md:text-6xl font-bold leading-tight">
                            Lukisa: Seu Ecossistema Pessoal
                        </h1>
                        <p className="text-[#6B4E3D] text-xl max-w-2xl mx-auto">
                            Acesse projetos de Memórias, Finanças e Inteligência Artificial em um ambiente acolhedor.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">

                            <Link
                                href={route("form.signup")}
                                className="bg-[#6B4E3D] text-[#F5EFE6] px-8 py-4 rounded-full hover:bg-[#3D2817] transition-colors flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transform duration-200"
                            >
                                Começar agora
                                <ArrowRight className="w-5 h-5" />
                            </Link>

                            <Link
                                href={route("form.login")}
                                className="bg-[#F5EFE6] text-[#6B4E3D] px-8 py-4 rounded-full hover:bg-[#E8DCC4] transition-colors shadow-sm hover:shadow-md"
                            >
                                Entrar
                            </Link>
                        </div>
                    </div>

                    {/* Product Cards Section */}
                    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {/* Memories Card */}
                        <div className="bg-[#F5EFE6] p-8 rounded-[2rem] shadow-xl border-2 border-[#E8DCC4] hover:border-[#6B4E3D]/20 transition-all hover:-translate-y-1 group cursor-pointer">
                            <div className="w-16 h-16 bg-[#6B4E3D] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                <MapPin className="w-8 h-8 text-[#F5EFE6]" />
                            </div>
                            <h3 className="text-2xl font-bold text-[#3D2817] mb-3">Memories</h3>
                            <p className="text-[#6B4E3D] leading-relaxed">
                                Mapeie e compartilhe seus momentos especiais em um mapa interativo.
                            </p>
                        </div>

                        {/* Phamani Card */}
                        <div className="bg-[#F5EFE6] p-8 rounded-[2rem] shadow-xl border-2 border-[#E8DCC4] hover:border-[#6B4E3D]/20 transition-all hover:-translate-y-1 group cursor-pointer">
                            <div className="w-16 h-16 bg-[#6B4E3D] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                <Wallet className="w-8 h-8 text-[#F5EFE6]" />
                            </div>
                            <h3 className="text-2xl font-bold text-[#3D2817] mb-3">Phamani</h3>
                            <p className="text-[#6B4E3D] leading-relaxed">
                                Organize sua vida financeira com simplicidade e clareza.
                            </p>
                        </div>

                        {/* Marvin Card */}
                        <div className="bg-[#F5EFE6] p-8 rounded-[2rem] shadow-xl border-2 border-[#E8DCC4] hover:border-[#6B4E3D]/20 transition-all hover:-translate-y-1 group cursor-pointer">
                            <div className="w-16 h-16 bg-[#6B4E3D] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                <Bot className="w-8 h-8 text-[#F5EFE6]" />
                            </div>
                            <h3 className="text-2xl font-bold text-[#3D2817] mb-3">Marvin</h3>
                            <p className="text-[#6B4E3D] leading-relaxed">
                                Converse com seu assistente inteligente sempre que precisar.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section id="features" className="container mx-auto px-4 py-20">
                    <div className="text-center mb-16">
                        <h2 className="text-[#3D2817] mb-4">Por que escolher o Lukisa?</h2>
                        <p className="text-[#6B4E3D]">
                            Design pensado no seu bem-estar e produtividade
                        </p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-[#F5EFE6] p-8 rounded-3xl hover:shadow-lg transition-shadow">
                            <div className="w-14 h-14 bg-[#6B4E3D] rounded-2xl flex items-center justify-center mb-6">
                                <Coffee className="w-7 h-7 text-[#F5EFE6]" />
                            </div>
                            <h3 className="text-[#3D2817] mb-3">Estética Cozy</h3>
                            <p className="text-[#6B4E3D]">
                                Cores quentes e design limpo para que você se sinta confortável enquanto usa seus apps.
                            </p>
                        </div>
                        <div className="bg-[#F5EFE6] p-8 rounded-3xl hover:shadow-lg transition-shadow">
                            <div className="w-14 h-14 bg-[#6B4E3D] rounded-2xl flex items-center justify-center mb-6">
                                <Users className="w-7 h-7 text-[#F5EFE6]" />
                            </div>
                            <h3 className="text-[#3D2817] mb-3">Tudo Integrado</h3>
                            <p className="text-[#6B4E3D]">
                                Acesse todas as suas ferramentas essenciais a partir de um único painel centralizado.
                            </p>
                        </div>
                        <div className="bg-[#F5EFE6] p-8 rounded-3xl hover:shadow-lg transition-shadow">
                            <div className="w-14 h-14 bg-[#6B4E3D] rounded-2xl flex items-center justify-center mb-6">
                                <Heart className="w-7 h-7 text-[#F5EFE6]" />
                            </div>
                            <h3 className="text-[#3D2817] mb-3">Simplicidade</h3>
                            <p className="text-[#6B4E3D]">
                                Interface intuitiva e direta ao ponto, sem complicações desnecessárias.
                            </p>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="container mx-auto px-4 py-20">
                    <div className="bg-[#6B4E3D] rounded-[3rem] p-12 md:p-16 text-center">
                        <h2 className="text-[#F5EFE6] mb-6">
                            Pronto para começar sua jornada?
                        </h2>
                        <p className="text-[#E8DCC4] text-lg mb-8 max-w-2xl mx-auto">
                            Junte-se a milhares de pessoas que já fazem parte da nossa comunidade cozy.
                        </p>
                        <Link
                            href={route("form.signup")}
                            className="bg-[#F5EFE6] text-[#6B4E3D] px-8 py-4 rounded-full hover:bg-[#E8DCC4] transition-colors inline-flex items-center gap-2"
                        >
                            Criar minha conta
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                </section>

                {/* Footer */}
                <footer className="container mx-auto px-4 py-8 text-center text-[#6B4E3D]">
                    <p>© 2024 Lukisa. Feito com ❤️ e muito café.</p>
                </footer>
            </div>
        </>
    );
};
