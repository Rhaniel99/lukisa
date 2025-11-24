import { Label } from "@/Components/ui/label";
import { Button } from "@/Components/ui/button";
import { AuthUser } from "@/Types/models";
import { useForm } from "@inertiajs/react";
import { Form } from "@/Components/UI/Form";
import { RadioGroup, RadioGroupItem } from "@/Components/ui/radio-group";
import { Switch } from "@/Components/ui/switch";

interface PrivacyTabProps {
    user: AuthUser;
}

export const PrivacyTab = ({ user }: PrivacyTabProps) => {
    // Inicializa o form com os valores atuais do usuário (ou defaults)
    const { data, setData, patch, processing, isDirty, recentlySuccessful } = useForm({
        privacy: user.privacy || "public",
        allow_friend_requests: user.allow_friend_requests ?? true, // ?? true pois o valor pode ser false
        _method: "PATCH",
    });

    const submit = () => {
        patch(route("profile.update"), {
            preserveScroll: true,
        });
    };

    return (
        <Form onSubmit={submit} className="space-y-10">

            {/* Cabeçalho */}
            <div className="space-y-1">
                <h3 className="text-xl font-bold text-[#0D0000] tracking-tight">
                    Privacidade
                </h3>
                <p className="text-sm text-[#737065]">
                    Gerencie quem pode ver seu conteúdo e interagir com você.
                </p>
            </div>

            {/* Visibilidade das Memórias */}
            <div className="space-y-4">
                <Label className="text-base font-semibold text-[#0D0000]">
                    Quem pode ver minhas memórias?
                </Label>

                <div className="space-y-3 rounded-xl bg-[#F7F6F0] p-4 border border-[#403E34]/20">

                    <RadioGroup
                        defaultValue={data.privacy}
                        onValueChange={(val) => setData("privacy", val)}
                        className="space-y-3"
                    >
                        {[
                            { value: "public", label: "Público", desc: "Qualquer um pode ver" },
                            { value: "friends", label: "Amigos", desc: "Apenas seus amigos" },
                            { value: "private", label: "Somente Eu", desc: "Privado" },
                        ].map((opt) => (
                            <div
                                key={opt.value}
                                className="flex items-start space-x-3 rounded-lg hover:bg-[#e8e6dd] transition-colors p-2"
                            >
                                <RadioGroupItem
                                    value={opt.value}
                                    id={`privacy-${opt.value}`}
                                    className="border-[#403E34] text-[#403E34] mt-1"
                                />
                                <Label
                                    htmlFor={`privacy-${opt.value}`}
                                    className="cursor-pointer text-[#403E34] font-medium"
                                >
                                    {opt.label}
                                    <span className="block text-xs text-[#737065]">
                                        {opt.desc}
                                    </span>
                                </Label>
                            </div>
                        ))}
                    </RadioGroup>
                </div>
            </div>

            <div className="border-t border-[#737065]/20 my-4" />

            {/* Pedidos de amizade */}
            <div className="p-5 rounded-xl border border-[#403E34]/30 bg-[#F5F4ED] shadow-sm">
                <div className="flex items-center justify-between">
                    <div>
                        <Label className="text-base font-semibold text-[#0D0000]">
                            Pedidos de Amizade
                        </Label>
                        <p className="text-sm text-[#737065]">
                            Permitir que outros usuários enviem solicitações de amizade?
                        </p>
                    </div>

                    <Switch
                        checked={data.allow_friend_requests}
                        onCheckedChange={(checked) =>
                            setData("allow_friend_requests", checked)
                        }
                        className="data-[state=checked]:bg-[#403E34]"
                    />
                </div>
            </div>

            <div className="flex items-center gap-3">
                <Button
                    type="submit"
                    disabled={processing || !isDirty}
                    className="px-6 py-2 rounded-lg text-[#D9D7C5]"
                    style={{
                        backgroundColor: processing || !isDirty ? "#737065" : "#403E34",
                        cursor: processing || !isDirty ? "not-allowed" : "pointer",
                    }}
                >
                    {processing ? "Salvando..." : "Salvar Preferências"}
                </Button>

                {recentlySuccessful && (
                    <span className="text-sm text-[#8B9A7E] font-medium animate-pulse">
                        Salvo!
                    </span>
                )}
            </div>

        </Form>

    );
};
