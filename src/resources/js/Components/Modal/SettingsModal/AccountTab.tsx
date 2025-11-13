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
        password_confirmation: "", // Padrão Laravel é password_confirmation
        _method: "PATCH",
    });

    // Lógica de Validação
    const emailChanged = data.email !== user.email;
    const hasPasswordInput = data.password.length > 0 || data.password_confirmation.length > 0;
    const passwordsMatch = data.password === data.password_confirmation && data.password.length > 0;
    
    // O formulário é válido se:
    // 1. O email mudou (e as senhas estão vazias OU batem)
    // 2. OU se as senhas foram preenchidas e batem
    const isFormValid = (emailChanged && (!hasPasswordInput || passwordsMatch)) || passwordsMatch;

    const submit = () => {
        post(route("profile.update"), {
            preserveScroll: true,
            onSuccess: () => {
                // Limpa os campos de senha após salvar com sucesso
                reset("password", "password_confirmation");
            }
        });
    };

    return (
        <div className="space-y-6">
            <h3 className="text-xl font-bold" style={{ color: "#0D0000" }}>
                Configurações da Conta
            </h3>
            <Form onSubmit={submit} className="space-y-4">
                
                {/* Campo de Email */}
                <div className="space-y-2">
                    <Label htmlFor="account-email" style={{ color: "#0D0000" }}>
                        Email
                    </Label>
                    <Input
                        id="account-email"
                        value={data.email}
                        onChange={(e) => setData("email", e.target.value)}
                        type="email"
                        className="border-2"
                        style={{ borderColor: "#737065" }}
                    />
                    {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                </div>

                {/* Campo de Senha */}
                <div className="space-y-2">
                    <Label htmlFor="account-password" style={{ color: "#0D0000" }}>
                        Nova Senha
                    </Label>
                    <Input
                        id="account-password"
                        value={data.password}
                        onChange={(e) => setData("password", e.target.value)}
                        type="password"
                        placeholder="********"
                        className="border-2"
                        style={{ borderColor: "#737065" }}
                    />
                    {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
                </div>

                {/* Campo de Confirmação */}
                <div className="space-y-2">
                    <Label htmlFor="account-confirm-password" style={{ color: "#0D0000" }}>
                        Confirmar Nova Senha
                    </Label>
                    <Input
                        id="account-confirm-password"
                        value={data.password_confirmation}
                        onChange={(e) => setData("password_confirmation", e.target.value)}
                        type="password"
                        placeholder="********"
                        className={`border-2 ${
                            hasPasswordInput && !passwordsMatch ? "border-red-500 focus-visible:ring-red-500" : ""
                        }`}
                        style={{ borderColor: hasPasswordInput && !passwordsMatch ? undefined : "#737065" }}
                    />
                    {/* Feedback visual se as senhas não baterem */}
                    {hasPasswordInput && !passwordsMatch && (
                        <p className="text-sm text-red-500">As senhas não coincidem.</p>
                    )}
                </div>

                {/* Botão de Ação */}
                <div className="flex items-center gap-4">
                    <Button
                        type="submit"
                        disabled={processing || !isFormValid}
                        style={{
                            backgroundColor: processing || !isFormValid ? "#737065" : "#403E34",
                            color: "#D9D7C5",
                            cursor: processing || !isFormValid ? "not-allowed" : "pointer",
                        }}
                    >
                        {processing ? "Salvando..." : "Atualizar Conta"}
                    </Button>

                    {recentlySuccessful && (
                        <span className="text-sm text-[#8B9A7E] font-medium animate-pulse">
                            Salvo com sucesso!
                        </span>
                    )}
                </div>
            </Form>

            <div className="border-t pt-6 mt-6" style={{ borderColor: "#737065" }}>
                <h4 className="font-semibold mb-2" style={{ color: "#0D0000" }}>
                    Deletar Conta
                </h4>
                <p className="text-sm mb-4" style={{ color: "#737065" }}>
                    Esta ação é irreversível. Todas as suas informações serão permanentemente excluídas.
                </p>
                <Button
                    variant="destructive"
                    style={{ backgroundColor: "#D9534F", color: "#D9D7C5" }}
                >
                    Deletar Minha Conta
                </Button>
            </div>
        </div>
    );
};