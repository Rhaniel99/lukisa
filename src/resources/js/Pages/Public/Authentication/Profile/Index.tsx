import logo from "/public/img/cat-l.svg";
import { Head, Link } from "@inertiajs/react"; 
import ProfileForm from './components/ProfileForm';
import { LogOut } from "lucide-react"; 

export default function Profile() {
    return (
        <>
            <Head title="Perfil" />
            <div className="min-h-screen bg-gradient-to-br from-[#E8DCC4] via-[#D4C5A9] to-[#C9B59A] flex items-center justify-center p-4">
                <div className="w-full max-w-md">
                    {/* Card Principal */}
                    <div className="bg-[#F5EFE6] rounded-3xl shadow-2xl p-8 md:p-10 relative overflow-hidden">
                        
                        <Link
                            href={route("auth.logout")}
                            method="post"
                            as="button"
                            className="absolute top-6 right-6 p-2 text-[#8B7355] hover:text-[#6B4E3D] hover:bg-[#E8DCC4]/40 rounded-full transition-all duration-300"
                            title="Sair"
                        >
                            <LogOut className="w-5 h-5" />
                        </Link>

                        {/* Logo Animado */}
                        <div className="flex justify-center mb-8">
                            <div className="w-20 h-20 bg-[#6B4E3D] rounded-2xl flex items-center justify-center shadow-xl transform hover:scale-105 transition-transform duration-300">
                                <img
                                    src={logo}
                                    alt="Lukisa Logo"
                                    className="w-12 h-12 object-contain brightness-0 invert"
                                />
                            </div>
                        </div>

                        {/* Conteúdo com Animação de Entrada */}
                        <div className="animate-in fade-in slide-in-from-right duration-500">
                            <div className="text-center mb-2">
                                <h1 className="text-[#3D2817] text-2xl font-semibold mb-2">Complete seu perfil</h1>
                                <p className="text-[#6B4E3D] text-sm">
                                    Configure seu nome de usuário e foto de perfil
                                </p>
                            </div>

                            {/* Formulário Integrado */}
                            <ProfileForm />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}