import { PropsWithChildren } from "react";
import { Link } from "@inertiajs/react";
import NotificationHandler from "@/Components/Notifications/NotificationHandler";
import logo from "/public/img/cat-l.svg";
import { Button } from "@/Components/ui/button";
import { Bell, LogOut, Search, Settings, Users } from "lucide-react";
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

export default function AuthLayout({ children }: PropsWithChildren) {
    return (
        <>
            <NotificationHandler />
            <div
                className="min-h-screen"
                style={{ backgroundColor: "#D9D7C5" }}
            >
                <Header>
                    <div className="flex items-center space-x-4">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="text-lukisa-brown hover:bg-lukisa-beige transition-colors"
                        >
                            <Bell className="w-5 h-5 animate-pulse" />{" "}
                            {/* Added subtle pulse animation */}
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="text-lukisa-brown hover:bg-lukisa-beige transition-colors"
                        >
                            <Users className="w-5 h-5 transition-transform hover:scale-110" />
                        </Button>

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="ghost"
                                    className="relative h-9 w-9 rounded-full transition-transform duration-200 hover:scale-105 focus-visible:ring-lukisa-brown"
                                >
                                    <Avatar className="h-9 w-9 border-2 border-lukisa-brown">
                                        <AvatarImage
                                            src="/placeholder.svg?height=36&width=36"
                                            alt="User Avatar"
                                        />
                                        <AvatarFallback className="bg-lukisa-brown text-lukisa-light font-semibold">
                                            JS
                                        </AvatarFallback>
                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56 bg-lukisa-beige border-lukisa-gray/50 text-lukisa-black">
                                <DropdownMenuLabel className="font-semibold text-lukisa-black">
                                    João Silva
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator className="bg-lukisa-gray/30" />
                                <DropdownMenuItem className="cursor-pointer hover:bg-lukisa-light/70 focus:bg-lukisa-light/70">
                                    <Link
                                        href="/settings"
                                        className="flex items-center w-full"
                                    >
                                        <Settings className="mr-2 h-4 w-4 text-lukisa-brown" />
                                        <span>Configurações da Conta</span>
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator className="bg-lukisa-gray/30" />
                                <DropdownMenuItem className="cursor-pointer text-lukisa-brown hover:bg-lukisa-light/70 focus:bg-lukisa-light/70">
                                    <LogOut className="mr-2 h-4 w-4" />
                                    <span>Sair</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </Header>

                <main className="px-6 py-12">{children}</main>
            </div>
        </>
    );
}
