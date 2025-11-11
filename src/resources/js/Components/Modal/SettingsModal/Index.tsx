"use client";

import { useState } from "react";
import { AuthUser as UserData } from "@/Types/models";
import { User, Settings, Lock, Bell } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/Components/ui/dialog";
import { cn } from "@/Lib/Utils";

// Imports dos novos componentes
import { NavItem } from "./NavItem";
import { ProfileTab } from "./ProfileTab";
import { AccountTab } from "./AccountTab";
import { PrivacyTab } from "./PrivacyTab";
import { NotificationsTab } from "./NotificationsTab";

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

    const renderTabContent = () => {
        switch (activeTab) {
            case "profile":
                return <ProfileTab user={user} />;
            case "account":
                return <AccountTab user={user} />;
            case "privacy":
                return <PrivacyTab />;
            case "notifications":
                return <NotificationsTab />;
            default:
                return null;
        }
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
                        {renderTabContent()}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}