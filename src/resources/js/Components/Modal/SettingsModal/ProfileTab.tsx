import { useForm } from "@inertiajs/react";
import { AuthUser as UserData } from "@/Types/models";
import { Form } from "@/Components/UI/Form";
import { Label } from "@/Components/ui/label";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";

interface ProfileTabProps {
    user: UserData;
}

export const ProfileTab = ({ user }: ProfileTabProps) => {
    const {
        data,
        setData,
        patch,
        errors,
        processing,
        recentlySuccessful,
        isDirty,
    } = useForm({
        fullname: user.fullname || "",
        username: user.username || "",
    });

    const submit = () => {
        patch(route("profile.update"), {
            preserveScroll: true,
        });
    };

    return (
        <Form onSubmit={submit} className="space-y-6">
            <div className="space-y-6">
                <h3 className="text-xl font-bold" style={{ color: "#0D0000" }}>
                    Meu Perfil
                </h3>
                <div className="flex items-center space-x-6">
                    <Avatar className="w-24 h-24">
                        <AvatarImage src={user.avatar_url || ""} />
                        <AvatarFallback
                            style={{
                                backgroundColor: "#403E34",
                                color: "#D9D7C5",
                            }}
                        >
                            {user.username.charAt(0).toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                    <Button
                        variant="outline"
                        className="border-2 bg-transparent"
                        style={{
                            borderColor: "#403E34",
                            color: "#403E34",
                        }}
                    >
                        Alterar Foto
                    </Button>
                </div>

                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label
                            htmlFor="profile-fullName"
                            style={{ color: "#0D0000" }}
                        >
                            Nome Completo
                        </Label>
                        <Input
                            id="profile-fullName"
                            type="text"
                            value={data.fullname}
                            onChange={(e) =>
                                setData("fullname", e.target.value)
                            }
                            className="border-2"
                            style={{
                                borderColor: "#737065",
                            }}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label
                            htmlFor="profile-username"
                            style={{ color: "#0D0000" }}
                        >
                            Nome de Usuário
                        </Label>
                        <Input
                            id="profile-username"
                            type="text"
                            value={data.username}
                            onChange={(e) =>
                                setData("username", e.target.value)
                            }
                            className="border-2"
                            style={{
                                borderColor: "#737065",
                            }}
                        />
                    </div>
                    <Button
                        type="submit"
                        disabled={processing || !isDirty}
                        style={{
                            backgroundColor:
                                processing || !isDirty ? "#737065" : "#403E34",
                            color: "#D9D7C5",
                            cursor:
                                processing || !isDirty
                                    ? "not-allowed"
                                    : "pointer",
                        }}
                    >
                        {processing ? "Salvando..." : "Salvar Alterações"}
                    </Button>
                    {recentlySuccessful && (
                        <span className="text-sm text-lukisa-sage ml-2">
                            Salvo!
                        </span>
                    )}
                </div>
            </div>
        </Form>
    );
};
