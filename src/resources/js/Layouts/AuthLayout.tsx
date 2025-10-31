import { PropsWithChildren, useState } from "react";
import { Link, router, usePage } from "@inertiajs/react";
import NotificationHandler from "@/Components/Notifications/NotificationHandler";
import { Button } from "@/Components/ui/button";
import { Bell, LogOut, Settings, Users } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { Header } from "@/Components/Shared/Header";
import { PageProps, AuthUser } from "@/Types/models";
import { SettingsModal } from "@/Components/Modal/SettingsModal";
import { FriendsSubmenu } from "@/Components/Shared/Menu/FriendsSubmenu";

export default function AuthLayout({ children }: PropsWithChildren) {
    const { auth, settings_user, friendships } = usePage<PageProps & { settings_user: AuthUser }>().props;
    const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
    const user = auth.user;


    const openSettingsModal = () => {
        router.reload({
            only: ["settings_user"],
            onSuccess: () => {
                setIsSettingsModalOpen(true);
            },
        });
    };

    return (
        <>
            <NotificationHandler />
            <div className="flex flex-col h-screen" style={{ backgroundColor: "#D9D7C5" }}>
                <Header>
                    <Button variant="ghost" size="icon" className="text-[#5C4A3A] hover:bg-[#E8E6D4]/70">
                        <Bell className="w-5 h-5" />
                    </Button>

                    <FriendsSubmenu pendingCount={friendships?.count || 0} />

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="relative h-9 w-9 rounded-full focus-visible:ring-[#8B9A7E]">
                                <Avatar className="h-9 w-9 border-2 border-[#8B9A7E]">
                                    <AvatarImage src={user.avatar_url || "/placeholder.svg"} alt={user.username} />
                                    <AvatarFallback className="bg-[#8B9A7E] text-white font-semibold">
                                        {user.username.charAt(0).toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            align="end"
                            className="w-56 bg-white border-[#E8E6D4] shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out"
                        >
                            <DropdownMenuLabel className="font-semibold text-[#3A3A3A]">
                                {user.username} #{user.discriminator}
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator className="bg-[#E8E6D4]/50" />
                            <DropdownMenuItem onSelect={openSettingsModal} className="cursor-pointer hover:bg-[#E8E6D4]/70 focus:bg-[#E8E6D4]/70">
                                <span>Configurações</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator className="bg-[#E8E6D4]/50" />
                            <DropdownMenuItem className="cursor-pointer text-red-600 hover:!text-red-600 hover:!bg-red-50 focus:!bg-red-50">
                                <Link
                                    href={route("auth.logout")}
                                    method="post"
                                    as="button"
                                >
                                    <span>Sair</span>
                                </Link>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </Header>
                <main className="flex-grow flex items-center justify-center">{children}</main>
            </div>

            <SettingsModal
                isOpen={isSettingsModalOpen}
                onOpenChange={setIsSettingsModalOpen}
                user={settings_user}
            />
        </>
    );
}
