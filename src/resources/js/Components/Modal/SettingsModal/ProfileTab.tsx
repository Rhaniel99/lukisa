import { useForm } from "@inertiajs/react";
import { AuthUser as UserData } from "@/Types/models";
import { Form } from "@/Components/UI/Form";
import { Label } from "@/Components/ui/label";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import { AvatarUploader } from "@/Components/Shared/Avatar/AvatarUploader";
// import { AvatarUploader } from "./AvatarUploader";

interface ProfileTabProps {
    user: UserData & { avatar_history?: { id: number; url: string }[] };
}

export const ProfileTab = ({ user }: ProfileTabProps) => {
    const {
        data,
        setData,
        post,
        errors,
        processing,
        recentlySuccessful,
        isDirty,
    } = useForm({
        fullname: user.fullname || "",
        username: user.username || "",
        avatar: null as File | null,
        media_id: null as number | null,
        _method: "PATCH",
    });

    const submit = () => {
        post(route("profile.update"), {
            preserveScroll: true,
            forceFormData: true,
        });
    };

    return (
        <Form onSubmit={submit} className="space-y-6">
            <h3 className="text-xl font-bold" style={{ color: "#0D0000" }}>
                Meu Perfil
            </h3>

            {/* Componente isolado para lidar com a imagem */}
            <AvatarUploader
                currentAvatarUrl={user.avatar_url}
                username={user.username}
                history={user.avatar_history || []}
                selectedHistoryId={data.media_id}
                onAvatarChange={(file) => {
                    setData("avatar", file);
                    setData("media_id", null); // Reseta histórico se subir novo
                }}
                onHistorySelect={(id: number | null) => {
                    setData("media_id", id);
                    setData("avatar", null); // Reseta upload se escolher histórico
                }}
            />

            <div className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="profile-fullName" style={{ color: "#0D0000" }}>
                        Nome Completo
                    </Label>
                    <Input
                        id="profile-fullName"
                        value={data.fullname}
                        onChange={(e) => setData("fullname", e.target.value)}
                        className="border-2 focus-visible:ring-[#403E34]"
                        style={{ borderColor: "#737065" }}
                    />
                    {errors.fullname && <span className="text-red-500 text-sm">{errors.fullname}</span>}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="profile-username" style={{ color: "#0D0000" }}>
                        Nome de Usuário
                    </Label>
                    <Input
                        id="profile-username"
                        value={data.username}
                        onChange={(e) => setData("username", e.target.value)}
                        className="border-2 focus-visible:ring-[#403E34]"
                        style={{ borderColor: "#737065" }}
                    />
                    {errors.username && <span className="text-red-500 text-sm">{errors.username}</span>}
                </div>

                <Button
                    type="submit"
                    // Habilita se: está processando OU (tem texto alterado OU tem avatar novo OU tem histórico selecionado)
                    disabled={processing || (!isDirty && !data.avatar && !data.media_id)}
                    style={{
                        backgroundColor: processing || (!isDirty && !data.avatar && !data.media_id) ? "#737065" : "#403E34",
                        color: "#D9D7C5",
                        cursor: processing || (!isDirty && !data.avatar && !data.media_id) ? "not-allowed" : "pointer",
                    }}
                >
                    {processing ? "Salvando..." : "Salvar Alterações"}
                </Button>

                {recentlySuccessful && (
                    <span className="text-sm text-[#8B9A7E] ml-2 font-medium">
                        Salvo com sucesso!
                    </span>
                )}
            </div>
        </Form>
    );
};