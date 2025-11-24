import { AuthUser as UserData } from "@/Types/models";
import { Label } from "@/Components/ui/label";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import { useForm } from "@inertiajs/react";
import { Form } from "@/Components/UI/Form";

interface AccountTabProps {
    user: UserData;
}

export const AccountTab = ({ user }: AccountTabProps) => {
    const {
        data,
        setData,
        post,
        errors,
        processing,
        recentlySuccessful,
        reset,
    } = useForm({
        email: user.email || "",
        password: "",
        password_confirmation: "",
        _method: "PATCH",
    });

    // Validações
    const emailChanged = data.email.trim() !== user.email;
    const hasPasswordInput =
        data.password.length > 0 || data.password_confirmation.length > 0;
    const passwordsMatch =
        data.password === data.password_confirmation && data.password.length >= 6;

    // Form é válido se:
    // 1. Email mudou (senhas vazias ou válidas)
    // 2. Senhas foram preenchidas e conferem
    const isFormValid =
        (emailChanged && (!hasPasswordInput || passwordsMatch)) ||
        (hasPasswordInput && passwordsMatch);

    const submit = () => {
        post(route("profile.update"), {
            preserveScroll: true,
            onSuccess: () => reset("password", "password_confirmation"),
        });
    };

    return (
        <div className="space-y-8 py-2">
            {/* Título */}
            <h3
                className="text-2xl font-bold tracking-tight"
                style={{ color: "#0D0000" }}
            >
                Configurações da Conta
            </h3>

            {/* Formulário */}
            <Form onSubmit={submit} className="space-y-6">

                {/* EMAIL */}
                <div className="space-y-2">
                    <Label
                        htmlFor="account-email"
                        className="font-semibold"
                        style={{ color: "#0D0000" }}
                    >
                        Email
                    </Label>

                    <Input
                        id="account-email"
                        type="email"
                        value={data.email}
                        onChange={(e) => setData("email", e.target.value)}
                        className="border-2"
                        style={{ borderColor: "#737065" }}
                    />

                    {errors.email && (
                        <p className="text-sm text-red-600">{errors.email}</p>
                    )}
                </div>

                {/* NOVA SENHA */}
                <div className="space-y-2">
                    <Label
                        htmlFor="account-password"
                        className="font-semibold"
                        style={{ color: "#0D0000" }}
                    >
                        Nova Senha
                    </Label>

                    <Input
                        id="account-password"
                        type="password"
                        placeholder="********"
                        value={data.password}
                        onChange={(e) => setData("password", e.target.value)}
                        className="border-2"
                        style={{ borderColor: "#737065" }}
                    />

                    {errors.password && (
                        <p className="text-sm text-red-600">{errors.password}</p>
                    )}
                </div>

                {/* CONFIRMAR SENHA */}
                <div className="space-y-2">
                    <Label
                        htmlFor="account-password-confirm"
                        className="font-semibold"
                        style={{ color: "#0D0000" }}
                    >
                        Confirmar Nova Senha
                    </Label>

                    <Input
                        id="account-password-confirm"
                        type="password"
                        placeholder="********"
                        value={data.password_confirmation}
                        onChange={(e) =>
                            setData("password_confirmation", e.target.value)
                        }
                        className={`border-2 ${
                            hasPasswordInput && !passwordsMatch
                                ? "border-red-500 ring-red-500"
                                : ""
                        }`}
                        style={{
                            borderColor:
                                hasPasswordInput && !passwordsMatch
                                    ? undefined
                                    : "#737065",
                        }}
                    />

                    {hasPasswordInput && !passwordsMatch && (
                        <p className="text-sm text-red-600">
                            As senhas não coincidem.
                        </p>
                    )}
                </div>

                {/* BOTÕES */}
                <div className="flex items-center gap-4">
                    <Button
                        type="submit"
                        disabled={processing || !isFormValid}
                        className="px-6 py-2 rounded-md font-medium"
                        style={{
                            backgroundColor:
                                processing || !isFormValid
                                    ? "#737065"
                                    : "#403E34",
                            color: "#D9D7C5",
                            cursor:
                                processing || !isFormValid
                                    ? "not-allowed"
                                    : "pointer",
                        }}
                    >
                        {processing ? "Salvando..." : "Atualizar Conta"}
                    </Button>

                    {/* Feedback de sucesso */}
                    {recentlySuccessful && (
                        <span className="text-sm font-semibold animate-pulse"
                            style={{ color: "#8B9A7E" }}
                        >
                            Dados atualizados com sucesso!
                        </span>
                    )}
                </div>
            </Form>

            {/* DIVISÃO */}
            <div
                className="border-t pt-6 mt-4"
                style={{ borderColor: "#737065" }}
            ></div>

            {/* DELETAR CONTA */}
            <div className="space-y-4">
                <h4
                    className="text-lg font-semibold"
                    style={{ color: "#0D0000" }}
                >
                    Deletar Conta
                </h4>

                <p className="text-sm leading-relaxed" style={{ color: "#737065" }}>
                    Esta ação é irreversível. Todas as suas informações, memórias,
                    dados pessoais e configurações serão permanentemente apagadas
                    e não poderão ser recuperadas.
                </p>

                <Button
                    variant="destructive"
                    className="mt-2 px-6 py-2 text-sm font-semibold rounded-md shadow-sm"
                    style={{
                        backgroundColor: "#D9534F",
                        color: "#D9D7C5",
                    }}
                >
                    Deletar Minha Conta
                </Button>
            </div>
        </div>
    );
};
