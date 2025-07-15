import { PropsWithChildren } from "react";
import { Link, usePage } from "@inertiajs/react";
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
import { PageProps } from "@/Types/models";

export default function AuthLayout({ children }: PropsWithChildren) {
    const { auth } = usePage<PageProps>().props;
    const user = auth.user;

    return (
        <>
            <NotificationHandler />
            <div
                className="flex flex-col h-screen"
                style={{ backgroundColor: "#D9D7C5" }}
            >
                <Header>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="text-lukisa-brown hover:bg-lukisa-light/70"
                    >
                        <Bell className="w-5 h-5" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="text-lukisa-brown hover:bg-lukisa-light/70"
                    >
                        <Users className="w-5 h-5 " />
                    </Button>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                                className="relative h-9 w-9 rounded-full focus-visible:ring-lukisa-sage"
                            >
                                <Avatar className="h-9 w-9 border-2 border-lukisa-sage">
                                    <AvatarImage
                                        src={user.avatar_url || ""}
                                        alt={user.username}
                                    />
                                    <AvatarFallback className="bg-lukisa-sage text-white font-semibold">
                                        {user.username.charAt(0).toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            className="w-56 bg-white border-lukisa-cream shadow-lg"
                            align="end"
                        >
                            <DropdownMenuLabel className="font-semibold text-lukisa-dark">
                                {user.username}
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator className="bg-lukisa-cream/50" />
                            <DropdownMenuItem
                                asChild
                                className="cursor-pointer hover:bg-lukisa-light/70 focus:bg-lukisa-light/70"
                            >
                                <Link
                                    href={route("account.settings")}
                                    className="flex items-center" // Garante o alinhamento do ícone e texto
                                >
                                    <Settings className="mr-2 h-4 w-4 text-lukisa-brown" />
                                    <span>Configurações</span>
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator className="bg-lukisa-cream/50" />
                            <DropdownMenuItem
                                asChild
                                className="cursor-pointer text-red-600 hover:!text-red-600 hover:!bg-red-50 focus:!bg-red-50"
                            >
                                <Link
                                    href={route("auth.logout")}
                                    method="post"
                                    as="button"
                                    className="w-full"
                                >
                                    <LogOut className="mr-2 h-4 w-4" />
                                    <span>Sair</span>
                                </Link>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </Header>

                <main className="flex-grow relative z-0">{children}</main>
            </div>
        </>
    );
}
