import React, { useEffect } from "react";
import { useForm, usePage } from "@inertiajs/react";
import { AnimatePresence, motion } from "framer-motion";
import { Form } from "@/Components/UI/Form";
import { Label } from "@/components/ui/label";
import { Calendar, Loader2, Lock, Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import type { PageProps as InertiaPageProps } from "@inertiajs/core";

interface ForgotPageSpecificProps {
    user_verified?: boolean;
    verified_email?: string;
    errors: { email?: string };
}

type PageProps = InertiaPageProps & ForgotPageSpecificProps;

export const ForgotForm: React.FC = () => {
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

    return (
        <>
            {/* Header dinâmico */}
            <CardHeader className="text-center">
                <CardTitle className="text-2xl text-lukisa-dark">
                    {title}
                </CardTitle>
                <CardDescription className="text-lukisa-brown">
                    {description}
                </CardDescription>
            </CardHeader>

            {/* Form com animação na troca de etapa */}
            <AnimatePresence initial={false} mode="wait">
                {isUserVerified ? (
                    <motion.div
                        key="step2"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        {/* ETAPA 2 */}
                        <Form
                            onSubmit={handleResetPassword}
                            className="space-y-4"
                        >
                            <input
                                type="email" // Usar o tipo correto ajuda o navegador
                                name="email"
                                autoComplete="username" // <-- A CORREÇÃO PRINCIPAL
                                value={data.email}
                                readOnly
                                className="hidden" // Mantemos o campo oculto para o usuário
                            />

                            {/* campo senha */}
                            <div className="space-y-2">
                                <Label
                                    htmlFor="password"
                                    className="text-lukisa-dark"
                                >
                                    Nova Senha
                                </Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-3 h-4 w-4 text-lukisa-sage" />
                                    <Input
                                        id="password"
                                        type="password"
                                        placeholder="Digite a nova senha"
                                        autoComplete="new-password"
                                        value={data.password}
                                        onChange={(e) =>
                                            setData("password", e.target.value)
                                        }
                                        className="pl-10 border-lukisa-cream focus:border-lukisa-sage"
                                        required
                                    />
                                    {errors.password && (
                                        <p className="mt-2 text-xs text-red-600">
                                            {errors.password}
                                        </p>
                                    )}
                                </div>
                            </div>
                            {/* confirmar senha */}
                            <div className="space-y-2">
                                <Label
                                    htmlFor="password_confirmation"
                                    className="text-lukisa-dark"
                                >
                                    Confirmar Senha
                                </Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-3 h-4 w-4 text-lukisa-sage" />
                                    <Input
                                        id="password_confirmation"
                                        type="password"
                                        autoComplete="new-password"
                                        placeholder="Confirme a nova senha"
                                        value={data.password_confirmation}
                                        onChange={(e) =>
                                            setData(
                                                "password_confirmation",
                                                e.target.value
                                            )
                                        }
                                        className="pl-10 border-lukisa-cream focus:border-lukisa-sage"
                                        required
                                    />
                                </div>
                            </div>
                            <Button
                                type="submit"
                                className="w-full bg-lukisa-sage hover:bg-lukisa-brown text-white"
                                size="lg"
                                disabled={processing}
                            >
                                {processing ? "Salvando..." : "Redefinir Senha"}
                            </Button>
                        </Form>
                    </motion.div>
                ) : (
                    <motion.div
                        key="step1"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        {/* ETAPA 1 */}
                        <Form onSubmit={handleCheckUser} className="space-y-4">
                            {/* campo email */}
                            <div className="space-y-2">
                                <Label
                                    htmlFor="email"
                                    className="text-lukisa-dark"
                                >
                                    Email
                                </Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-3 h-4 w-4 text-lukisa-sage" />
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="Digite seu e-mail"
                                        value={data.email}
                                        onChange={(e) =>
                                            setData("email", e.target.value)
                                        }
                                        className="pl-10 border-lukisa-cream focus:border-lukisa-sage"
                                        required
                                    />
                                    {pageErrors.email && (
                                        <p className="mt-2 text-xs text-red-600">
                                            {pageErrors.email}
                                        </p>
                                    )}
                                </div>
                            </div>
                            {/* campo data de nascimento */}
                            <div className="space-y-2">
                                <Label
                                    htmlFor="birth_date"
                                    className="text-lukisa-dark"
                                >
                                    Data de Nascimento
                                </Label>
                                <div className="relative">
                                    <Calendar className="absolute left-3 top-3 h-4 w-4 text-lukisa-sage" />
                                    <Input
                                        id="birth_date"
                                        type="date"
                                        value={data.birth_date}
                                        onChange={(e) =>
                                            setData(
                                                "birth_date",
                                                e.target.value
                                            )
                                        }
                                        className="pl-10 border-lukisa-cream focus:border-lukisa-sage"
                                        required
                                    />
                                </div>
                            </div>
                            <Button
                                type="submit"
                                className="w-full bg-lukisa-sage hover:bg-lukisa-brown text-white"
                                size="lg"
                                disabled={processing}
                            >
                                {processing ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Processando...
                                    </>
                                ) : (
                                    "Prosseguir"
                                )}
                            </Button>
                        </Form>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
