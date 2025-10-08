"use client";

import { useState } from "react";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Checkbox } from "@/Components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import { AuthUser as UserData } from "@/Types/models";
import { User, Settings, Lock, Bell } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/Components/ui/dialog";
import { useForm } from "@inertiajs/react";
import { cn } from "@/Lib/Utils";
import { Form } from "../UI/Form";

interface NavItemProps {
    tab: string;
    icon: React.ComponentType<any>;
    label: string;
    activeTab: string;
    setActiveTab: (tab: string) => void;
}

const NavItem = ({
    tab,
    icon: Icon,
    label,
    activeTab,
    setActiveTab,
}: NavItemProps) => (
    <button
        onClick={() => setActiveTab(tab)}
        className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-left w-full transition-colors ${
            activeTab === tab ? "font-semibold" : "hover:bg-opacity-80"
        }`}
        style={{
            backgroundColor: activeTab === tab ? "#403E34" : "transparent",
            color: activeTab === tab ? "#D9D7C5" : "#0D0000",
        }}
    >
        <Icon className="w-5 h-5" />
        <span>{label}</span>
    </button>
);

export function SettingsModal({
    isOpen,
    onOpenChange,
    user,
}: {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
    user?: UserData;
}) {
    const [activeTab, setActiveTab] = useState("profile");

    if (!user) {
        return null;
    }

    const {
        data,
        setData,
        patch,
        errors,
        processing,
        reset,
        recentlySuccessful,
        isDirty,
    } = useForm({
        fullname: user.fullname || "",
        username: user.username || "",
    });

    const submit = () => {
        patch(route("profile.update", user.id), {
            preserveScroll: true,
            onSuccess: () => {
                // reset("content");
            },
        });
    };

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent
                className={cn(
                    "w-full sm:max-w-4xl h-[80vh] flex flex-col bg-[#BFBAA8] p-0"
                )}
            >
                <div className="flex flex-1">
                    <aside
                        className="w-72 p-4 rounded-l-lg shadow-md mr-6"
                        style={{ backgroundColor: "#BFBAA8" }}
                    >
                        <DialogHeader className="px-4 pt-4 pb-2">
                            <DialogTitle
                                className="text-lg font-semibold"
                                style={{ color: "#0D0000" }}
                            >
                                Configurações
                            </DialogTitle>

                            <DialogDescription className="text-lukisa-brown">
                                {/* Ajuste as configurações do seu perfil e da sua conta. */}
                            </DialogDescription>
                        </DialogHeader>
                        <nav className="space-y-2">
                            <NavItem
                                tab="profile"
                                icon={User}
                                label="Perfil"
                                activeTab={activeTab}
                                setActiveTab={setActiveTab}
                            />
                            <NavItem
                                tab="account"
                                icon={Settings}
                                label="Conta"
                                activeTab={activeTab}
                                setActiveTab={setActiveTab}
                            />
                            <NavItem
                                tab="privacy"
                                icon={Lock}
                                label="Privacidade"
                                activeTab={activeTab}
                                setActiveTab={setActiveTab}
                            />
                            <NavItem
                                tab="notifications"
                                icon={Bell}
                                label="Notificações"
                                activeTab={activeTab}
                                setActiveTab={setActiveTab}
                            />
                        </nav>
                    </aside>

                    <div
                        className="flex-1 p-6 rounded-r-lg shadow-md overflow-auto min-w-0"
                        style={{ backgroundColor: "#D9D7C5" }}
                    >
                        {activeTab === "profile" && (
                            <Form onSubmit={submit} className="space-y-6">
                                <div className="space-y-6">
                                    <h3
                                        className="text-xl font-bold"
                                        style={{ color: "#0D0000" }}
                                    >
                                        Meu Perfil
                                    </h3>
                                    <div className="flex items-center space-x-6">
                                        <Avatar className="w-24 h-24">
                                            <AvatarImage
                                                src={user.avatar_url || ""}
                                            />
                                            <AvatarFallback
                                                style={{
                                                    backgroundColor: "#403E34",
                                                    color: "#D9D7C5",
                                                }}
                                            >
                                                {user.username
                                                    .charAt(0)
                                                    .toUpperCase()}
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
                                                    setData(
                                                        "fullname",
                                                        e.target.value
                                                    )
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
                                                    setData(
                                                        "username",
                                                        e.target.value
                                                    )
                                                }
                                                className="border-2"
                                                style={{
                                                    borderColor: "#737065",
                                                }}
                                            />
                                        </div>
                                        <Button
                                            type="submit"
                                            // A MÁGICA ESTÁ AQUI:
                                            // Desabilita se estiver processando OU se o formulário não mudou
                                            disabled={processing || !isDirty}
                                            style={{
                                                // Muda a cor se estiver desabilitado
                                                backgroundColor:
                                                    processing || !isDirty
                                                        ? "#737065"
                                                        : "#403E34",
                                                color: "#D9D7C5",
                                                cursor:
                                                    processing || !isDirty
                                                        ? "not-allowed"
                                                        : "pointer",
                                            }}
                                        >
                                            {processing
                                                ? "Salvando..."
                                                : "Salvar Alterações"}
                                        </Button>
                                        {recentlySuccessful && (
                                            <span className="text-sm text-lukisa-sage ml-2">
                                                Salvo!
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </Form>
                        )}

                        {activeTab === "account" && (
                            <div className="space-y-6">
                                <h3
                                    className="text-xl font-bold"
                                    style={{ color: "#0D0000" }}
                                >
                                    Configurações da Conta
                                </h3>
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label
                                            htmlFor="account-email"
                                            style={{ color: "#0D0000" }}
                                        >
                                            Email
                                        </Label>
                                        <Input
                                            id="account-email"
                                            type="email"
                                            defaultValue={user.email}
                                            className="border-2"
                                            style={{ borderColor: "#737065" }}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label
                                            htmlFor="account-password"
                                            style={{ color: "#0D0000" }}
                                        >
                                            Nova Senha
                                        </Label>
                                        <Input
                                            id="account-password"
                                            type="password"
                                            placeholder="********"
                                            className="border-2"
                                            style={{ borderColor: "#737065" }}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label
                                            htmlFor="account-confirm-password"
                                            style={{ color: "#0D0000" }}
                                        >
                                            Confirmar Nova Senha
                                        </Label>
                                        <Input
                                            id="account-confirm-password"
                                            type="password"
                                            placeholder="********"
                                            className="border-2"
                                            style={{ borderColor: "#737065" }}
                                        />
                                    </div>
                                    <Button
                                        style={{
                                            backgroundColor: "#403E34",
                                            color: "#D9D7C5",
                                        }}
                                    >
                                        Atualizar Conta
                                    </Button>
                                </div>
                                <div
                                    className="border-t pt-6 mt-6"
                                    style={{ borderColor: "#737065" }}
                                >
                                    <h4
                                        className="font-semibold mb-2"
                                        style={{ color: "#0D0000" }}
                                    >
                                        Deletar Conta
                                    </h4>
                                    <p
                                        className="text-sm mb-4"
                                        style={{ color: "#737065" }}
                                    >
                                        Esta ação é irreversível. Todas as suas
                                        informações serão permanentemente
                                        excluídas.
                                    </p>
                                    <Button
                                        variant="destructive"
                                        style={{
                                            backgroundColor: "#D9534F",
                                            color: "#D9D7C5",
                                        }} // A different red for destructive action
                                    >
                                        Deletar Minha Conta
                                    </Button>
                                </div>
                            </div>
                        )}

                        {activeTab === "privacy" && (
                            <div className="space-y-6">
                                <h3
                                    className="text-xl font-bold"
                                    style={{ color: "#0D0000" }}
                                >
                                    Privacidade
                                </h3>
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label
                                            htmlFor="memory-visibility"
                                            className="block font-medium"
                                            style={{ color: "#0D0000" }}
                                        >
                                            Quem pode ver minhas memórias?
                                        </Label>
                                        <div className="flex flex-col space-y-2">
                                            <div className="flex items-center space-x-2">
                                                <input
                                                    type="radio"
                                                    id="memory-public"
                                                    name="memory-visibility"
                                                    value="public"
                                                    defaultChecked
                                                    className="form-radio"
                                                    style={{
                                                        accentColor: "#403E34",
                                                    }}
                                                />
                                                <Label
                                                    htmlFor="memory-public"
                                                    style={{ color: "#737065" }}
                                                >
                                                    Público (Qualquer um pode
                                                    ver)
                                                </Label>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <input
                                                    type="radio"
                                                    id="memory-friends"
                                                    name="memory-visibility"
                                                    value="friends"
                                                    className="form-radio"
                                                    style={{
                                                        accentColor: "#403E34",
                                                    }}
                                                />
                                                <Label
                                                    htmlFor="memory-friends"
                                                    style={{ color: "#737065" }}
                                                >
                                                    Amigos (Apenas seus amigos
                                                    podem ver)
                                                </Label>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <input
                                                    type="radio"
                                                    id="memory-private"
                                                    name="memory-visibility"
                                                    value="private"
                                                    className="form-radio"
                                                    style={{
                                                        accentColor: "#403E34",
                                                    }}
                                                />
                                                <Label
                                                    htmlFor="memory-private"
                                                    style={{ color: "#737065" }}
                                                >
                                                    Somente Eu (Privado)
                                                </Label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            id="add-friends"
                                            defaultChecked
                                            style={{
                                                borderColor: "#737065",
                                                backgroundColor: "#403E34",
                                            }}
                                        />
                                        <Label
                                            htmlFor="add-friends"
                                            style={{ color: "#0D0000" }}
                                        >
                                            Permitir que outros usuários me
                                            adicionem como amigo?
                                        </Label>
                                    </div>
                                    <Button
                                        style={{
                                            backgroundColor: "#403E34",
                                            color: "#D9D7C5",
                                        }}
                                    >
                                        Salvar Preferências
                                    </Button>
                                </div>
                            </div>
                        )}

                        {activeTab === "notifications" && (
                            <div className="space-y-6">
                                <h3
                                    className="text-xl font-bold"
                                    style={{ color: "#0D0000" }}
                                >
                                    Notificações
                                </h3>
                                <div className="space-y-4">
                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            id="like-notification"
                                            defaultChecked
                                            style={{
                                                borderColor: "#737065",
                                                backgroundColor: "#403E34",
                                            }}
                                        />
                                        <Label
                                            htmlFor="like-notification"
                                            style={{ color: "#0D0000" }}
                                        >
                                            Quando alguém curte minha memória
                                        </Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            id="comment-notification"
                                            defaultChecked
                                            style={{
                                                borderColor: "#737065",
                                                backgroundColor: "#403E34",
                                            }}
                                        />
                                        <Label
                                            htmlFor="comment-notification"
                                            style={{ color: "#0D0000" }}
                                        >
                                            Quando alguém comenta na minha
                                            memória
                                        </Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            id="friend-request-notification"
                                            style={{
                                                borderColor: "#737065",
                                                backgroundColor: "#403E34",
                                            }}
                                        />
                                        <Label
                                            htmlFor="friend-request-notification"
                                            style={{ color: "#0D0000" }}
                                        >
                                            Quando recebo um pedido de amizade
                                        </Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            id="system-updates-notification"
                                            defaultChecked
                                            style={{
                                                borderColor: "#737065",
                                                backgroundColor: "#403E34",
                                            }}
                                        />
                                        <Label
                                            htmlFor="system-updates-notification"
                                            style={{ color: "#0D0000" }}
                                        >
                                            Atualizações do sistema e Lukisa
                                        </Label>
                                    </div>
                                    <Button
                                        style={{
                                            backgroundColor: "#403E34",
                                            color: "#D9D7C5",
                                        }}
                                    >
                                        Salvar Notificações
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
