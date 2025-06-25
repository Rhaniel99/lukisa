import React, { useState } from "react";
import { useForm, Link, Head } from "@inertiajs/react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Form } from "@/Components/UI/Form";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import logo from "/public/img/logo.svg";
import { Header } from "@/Components/Shared/Header";

const Home: React.FC = () => {
    const [showPassword, setShowPassword] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const submit = () => {
        post(route("auth.login"), {
            onError: () => {
                reset("password");
            },
        });
    };

    return (
        <>
            <Head title="Bem-vindo" />

            <div className="min-h-screen">
            <Header />

            <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
                <div className="text-center">
                    <h1 className="mb-8 text-4xl font-bold text-gray-800 dark:text-gray-200">
                        Bem-vindo à Aplicação
                    </h1>
                    </div>
            </div>

            {/*
            <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 dark:bg-gray-900">
                <div className="text-center">
                    <h1 className="mb-8 text-4xl font-bold text-gray-800 dark:text-gray-200">
                        Bem-vindo à Aplicação Lukisa
                    </h1>

                    <Link
                        href={route("form.login")}
                        className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white shadow-md transition duration-300 ease-in-out hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
                    >
                        Login
                    </Link>

                    <br />

                    <Link
                        href={route("form.signup")}
                        className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white shadow-md transition duration-300 ease-in-out hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
                    >
                        Signup
                    </Link>

                    <br />

                    <Link
                        href={route("form.forgot")}
                        className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white shadow-md transition duration-300 ease-in-out hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
                    >
                        Forgot
                    </Link>
                </div>
            </div>
            */}

            </div>
        </>
    );
};

export default Home;
