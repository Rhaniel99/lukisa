import React, { FormEvent } from "react";
import { useForm } from "@inertiajs/react";
import { Form } from "@/Components/UI/Form";

export const ForgotForm: React.FC = () => {
    // ? O hook useForm gerencia o estado do formulário para nós.
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    // ? Função que é chamada quando o formulário é enviado.
    const submit = () => {
        // post(route("auth.login"), {
        //     onError: () => {
        //         reset("password");
        //     },
        // });
    };

    return (
        <Form onSubmit={submit} className="w-full max-w-sm">

            Ainda falta
        </Form>
    );
};
