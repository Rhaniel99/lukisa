import { useEffect } from "react";
import { useForm, usePage } from "@inertiajs/react";
import { AnimatePresence, motion } from "motion/react";
import { Form } from "@/Components/Shared/Form/Form";
import { Label } from "@/Components/ui/label";
import { Calendar, Loader2, Lock, Mail } from "lucide-react";
import type { PageProps as InertiaPageProps } from "@inertiajs/core";

interface ForgotPageSpecificProps {
    user_verified?: boolean;
    verified_email?: string;
    errors: { email?: string };
}

type PageProps = InertiaPageProps & ForgotPageSpecificProps;

export default function ForgotForm() {
    const {
        user_verified,
        verified_email,
        errors: pageErrors,
    } = usePage<PageProps>().props;
    const isUserVerified = user_verified === true;

    const { data, setData, post, processing, errors, reset } = useForm({
        email: verified_email || "",
        birth_date: "",
        password: "",
        password_confirmation: "",
    });

    useEffect(() => {
        if (verified_email) {
            setData("email", verified_email);
        }
    }, [verified_email]);

    const handleCheckUser = () => post(route("forgot.verify"));
    const handleResetPassword = () =>
        post(route("forgot.password"), {
            onSuccess: () => reset("password", "password_confirmation"),
        });

    // Títulos dinâmicos
    const title = isUserVerified ? "Nova Senha" : "Esqueceu a Senha";
    const description = isUserVerified
        ? "Digite sua nova senha abaixo"
        : "Insira seu e-mail e data de nascimento para redefinir sua senha";

    const animationProps = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -20 },
        transition: { duration: 0.3 }
    };

    return (
        <>
            {/* Header dinâmico */}
            <div className="text-center mb-8">
                <h1 className="text-[#3D2817] mb-2">{title}</h1>
                <p className="text-[#6B4E3D]">{description}</p>
            </div>

            {/* Form com animação na troca de etapa */}
            <AnimatePresence initial={false} mode="wait">
                {isUserVerified ? (
                    <motion.div
                        key="step2"
                        {...animationProps}
                        className="space-y-5"
                    >
                        {/* ETAPA 2 - Nova Senha */}
                        <Form onSubmit={handleResetPassword} className="space-y-5">
                            <input
                                type="email"
                                name="email"
                                autoComplete="username"
                                value={data.email}
                                readOnly
                                className="hidden"
                            />

                            {/* Campo senha */}
                            <div>
                                <Label htmlFor="password" className="block text-[#3D2817] mb-2">
                                    Nova Senha
                                </Label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8B7355]" />
                                    <input
                                        id="password"
                                        type="password"
                                        placeholder="Digite a nova senha"
                                        autoComplete="new-password"
                                        value={data.password}
                                        onChange={(e) => setData("password", e.target.value)}
                                        className="w-full pl-12 pr-4 py-3 bg-white border-2 border-[#E8DCC4] rounded-xl focus:outline-none focus:border-[#6B4E3D] transition-colors text-[#3D2817] placeholder:text-[#A69580]"
                                        required
                                    />
                                </div>
                                {errors.password && (
                                    <p className="mt-2 text-xs text-red-600">{errors.password}</p>
                                )}
                            </div>

                            {/* Campo confirmar senha */}
                            <div>
                                <Label htmlFor="password_confirmation" className="block text-[#3D2817] mb-2">
                                    Confirmar Senha
                                </Label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8B7355]" />
                                    <input
                                        id="password_confirmation"
                                        type="password"
                                        autoComplete="new-password"
                                        placeholder="Confirme a nova senha"
                                        value={data.password_confirmation}
                                        onChange={(e) => setData("password_confirmation", e.target.value)}
                                        className="w-full pl-12 pr-4 py-3 bg-white border-2 border-[#E8DCC4] rounded-xl focus:outline-none focus:border-[#6B4E3D] transition-colors text-[#3D2817] placeholder:text-[#A69580]"
                                        required
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full bg-[#6B4E3D] text-[#F5EFE6] py-4 rounded-xl hover:bg-[#3D2817] transition-colors shadow-lg disabled:bg-[#A69580] disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {processing ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        Salvando...
                                    </>
                                ) : (
                                    "Redefinir Senha"
                                )}
                            </button>
                        </Form>
                    </motion.div>
                ) : (
                    <motion.div
                        key="step1"
                        {...animationProps}
                        className="space-y-5"
                    >
                        {/* ETAPA 1 - Verificação */}
                        <Form onSubmit={handleCheckUser} className="space-y-5">
                            {/* Campo email */}
                            <div>
                                <Label htmlFor="email" className="block text-[#3D2817] mb-2">
                                    Email
                                </Label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8B7355]" />
                                    <input
                                        id="email"
                                        type="email"
                                        placeholder="Digite seu e-mail"
                                        value={data.email}
                                        onChange={(e) => setData("email", e.target.value)}
                                        className="w-full pl-12 pr-4 py-3 bg-white border-2 border-[#E8DCC4] rounded-xl focus:outline-none focus:border-[#6B4E3D] transition-colors text-[#3D2817] placeholder:text-[#A69580]"
                                        required
                                    />
                                </div>
                                {pageErrors.email && (
                                    <p className="mt-2 text-xs text-red-600">{pageErrors.email}</p>
                                )}
                            </div>

                            {/* Campo data de nascimento */}
                            <div>
                                <Label htmlFor="birth_date" className="block text-[#3D2817] mb-2">
                                    Data de Nascimento
                                </Label>
                                <div className="relative">
                                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8B7355]" />
                                    <input
                                        id="birth_date"
                                        type="date"
                                        value={data.birth_date}
                                        onChange={(e) => setData("birth_date", e.target.value)}
                                        className="w-full pl-12 pr-4 py-3 bg-white border-2 border-[#E8DCC4] rounded-xl focus:outline-none focus:border-[#6B4E3D] transition-colors text-[#3D2817] placeholder:text-[#A69580]"
                                        required
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full bg-[#6B4E3D] text-[#F5EFE6] py-4 rounded-xl hover:bg-[#3D2817] transition-colors shadow-lg disabled:bg-[#A69580] disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {processing ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        Processando...
                                    </>
                                ) : (
                                    "Prosseguir"
                                )}
                            </button>
                        </Form>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};