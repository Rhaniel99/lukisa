import React, { FormEvent } from "react";
import { useForm } from "@inertiajs/react";
import { Form } from "@/Components/UI/Form";
import { Label } from "@/Components/ui/label";
import { Calendar, Loader2, Lock, Mail, User } from "lucide-react";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";

export const SignupForm: React.FC = () => {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        birth_date: "",
        password_confirmation: "",
    });

    const submit = () => {
        post(route("auth.register"), {
            onError: () => {
                reset("password", "password_confirmation");
            },
        });
    };

    return (
        <Form onSubmit={submit} className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="name" className="text-lukisa-dark">
                    Nome Completo
                </Label>
                <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-lukisa-sage" />
                    <Input
                        id="name"
                        name="name"
                        autoComplete="name"
                        type="text"
                        placeholder="Digite seu nome completo"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        className="pl-10 border-lukisa-cream focus:border-lukisa-sage"
                        required
                    />
                    {/* {errors.name && (
                        <p className="mt-2 text-xs text-red-600">
                            {errors.name}
                        </p>
                    )} */}
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="email" className="text-lukisa-dark">
                    Email
                </Label>
                <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-lukisa-sage" />
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        placeholder="Digite seu e-mail"
                        value={data.email}
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
                <Label htmlFor="dateOfBirth" className="text-lukisa-dark">
                    Data de Nascimento
                </Label>
                <div className="relative">
                    <Calendar className="absolute left-3 top-3 h-4 w-4 text-lukisa-sage" />
                    <Input
                        id="birth_date"
                        type="date"
                        autoComplete="bday"
                        value={data.birth_date}
                        onChange={(e) => setData("birth_date", e.target.value)}
                        className="pl-10 border-lukisa-cream focus:border-lukisa-sage"
                        required
                    />
                    {/* {errors.birth_date && (
                    <p className="mt-2 text-xs text-red-600">
                        {errors.birth_date}
                    </p>
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
                        placeholder="Crie uma senha"
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

            <div className="space-y-2">
                <Label htmlFor="password_confirmation" className="text-lukisa-dark">
                    Confirmar Senha
                </Label>
                <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-lukisa-sage" />
                    <Input
                        id="password_confirmation"
                        type="password"
                        autoComplete="new-password"
                        placeholder="Confirme sua senha"
                        value={data.password_confirmation}
                        onChange={(e) =>
                            setData("password_confirmation", e.target.value)
                        }
                        className="pl-10 border-lukisa-cream focus:border-lukisa-sage"
                        required
                    />

                    {/* {errors.password_confirmation && (
                    <p className="mt-2 text-xs text-red-600">
                        {errors.password_confirmation}
                    </p>
                )} */}
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
                        Criando...
                    </>
                ) : (
                    "Criar Conta"
                )}
            </Button>
        </Form>
    );
};
