import React, { FormEvent } from "react";
import { Link, useForm } from "@inertiajs/react";
import { Form } from "@/Components/UI/Form";
import { Label } from "@/Components/ui/label";
import { Loader2, Lock, Mail } from "lucide-react";
import { Input } from "@/Components/ui/input";
import { Checkbox } from "@/Components/ui/checkbox";
import { Button } from "@/Components/ui/button";
import type { CheckedState } from "@radix-ui/react-checkbox";

export const LoginForm: React.FC = () => {
    // ? O hook useForm gerencia o estado do formulário para nós.
    const { data, setData, post, processing, errors, reset } = useForm<{
        email: string;
        password: string;
        remember: boolean;
    }>({
        email: "",
        password: "",
        remember: false,
    });

    // ? Função que é chamada quando o formulário é enviado.
    const submit = () => {
        post(route("auth.login"), {
            onError: () => {
                reset("password");
            },
        });
    };

    return (
        <Form onSubmit={submit} className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="email" className="text-lukisa-dark">
                    Email
                </Label>
                <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-lukisa-sage" />
                    <Input
                        id="email"
                        type="email"
                        placeholder="Digite seu e-mail"
                        value={data.email}
                        autoComplete="email"
                        onChange={(e) => setData("email", e.target.value)}
                        className="pl-10 border-lukisa-cream focus:border-lukisa-sage"
                        required
                    />
                    {/* {errors.email && (
                    <p className="mt-2 text-xs text-red-600">{errors.email}</p>
                )} */}
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="password" className="text-lukisa-dark">
                    Senha
                </Label>
                <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-lukisa-sage" />
                    <Input
                        id="password"
                        type="password"
                        placeholder="Digite sua senha"
                        autoComplete="new-password"
                        value={data.password}
                        onChange={(e) => setData("password", e.target.value)}
                        className="pl-10 border-lukisa-cream focus:border-lukisa-sage"
                        required
                    />
                    {/* {errors.password && (
                    <p className="mt-2 text-xs text-red-600">
                        {errors.password}
                    </p>
                )} */}
                </div>
            </div>

            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <Checkbox
                        id="remember"
                        checked={data.remember}
                        onCheckedChange={(checked: CheckedState) =>
                            setData("remember", checked === true)
                        }
                    />
                    <Label
                        htmlFor="remember"
                        className="text-sm text-lukisa-brown"
                    >
                        Lembrar-me
                    </Label>
                </div>

                <Link
                    href={route("form.forgot")}
                    className="text-sm text-lukisa-sage hover:text-lukisa-brown transition-colors"
                >
                    Esqueceu sua senha?
                </Link>
            </div>

            <Button
                type="submit"
                className="w-full bg-lukisa-sage hover:bg-lukisa-brown text-white"
                size="lg"
                disabled={processing} // 2. Desabilita o botão durante o processamento
            >
                {/* 3. Mostra um ícone e um texto diferente se estiver processando */}
                {processing ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Entrando...
                    </>
                ) : (
                    "Entrar"
                )}
            </Button>
        </Form>
    );
};
