import { useState, useEffect } from "react";
import { router } from "@inertiajs/react";
import { Bell, Check } from "lucide-react";
import { useNotifications } from "@/Hooks/useNotifications"; // Importe o Hook criado acima
import { cn } from "@/Lib/Utils";

// Componentes UI
import { Button } from "@/Components/ui/button";
import { Badge } from "@/Components/ui/badge";
import { ScrollArea } from "@/Components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
    DropdownMenuItem,
    DropdownMenuSeparator,
} from "@/Components/ui/dropdown-menu";

export function NotificationsSubmenu() {
    // Consumindo o Hook
    const { 
        count, 
        list, 
        isLoaded, 
        loading, 
        loadNotifications, 
        markAsRead, 
        markAllAsRead 
    } = useNotifications();

    const [isOpen, setIsOpen] = useState(false);

    // Efeito para carregar dados quando o menu abre
    useEffect(() => {
        if (isOpen) {
            loadNotifications();
        }
    }, [isOpen]);

    // Manipulador de clique na notificação
    const handleNotificationClick = (item: any) => {
        // Define a função de navegação
        const navigate = () => {
            if (item.data.link) {
                setIsOpen(false); // Fecha o menu
                router.get(item.data.link);
            }
        };

        // Se não estiver lida, marca como lida e NAVEGA NO SUCESSO.
        if (!item.read_at) {
            // A função de navegação é passada como callback
            markAsRead(item.id, navigate); 
        } else {
            // Se já estiver lida, apenas navega.
            navigate();
        }
    };

    return (
        <DropdownMenu onOpenChange={setIsOpen} open={isOpen}>
            <DropdownMenuTrigger asChild>
                <Button 
                    variant="ghost" 
                    size="icon" 
                    className="text-[#5C4A3A] hover:bg-[#E8E6D4]/70 relative"
                >
                    <Bell className="w-5 h-5" />
                    {count > 0 && (
                        <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-red-500 text-white text-xs border-2 border-white pointer-events-none">
                            {count > 99 ? "99+" : count}
                        </Badge>
                    )}
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-80 bg-white border-[#E8E6D4] shadow-lg p-0 overflow-hidden">
                {/* Cabeçalho */}
                <div className="p-3 border-b border-[#E8E6D4] flex justify-between items-center bg-[#F5F4ED]">
                    <h3 className="font-semibold text-sm text-[#3A3A3A]">Notificações</h3>
                    {count > 0 && (
                        <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={markAllAsRead}
                            className="text-xs text-[#5C4A3A] hover:text-[#403E34] hover:bg-[#E8E6D4] h-auto py-1 px-2"
                        >
                            Marcar todas como lidas
                            <Check className="w-3 h-3 ml-1" />
                        </Button>
                    )}
                </div>

                {/* Lista de Notificações */}
                <ScrollArea className="h-[350px]">
                    {!isLoaded && loading ? (
                        <div className="flex flex-col items-center justify-center py-10 space-y-2">
                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#5C4A3A]"></div>
                            <p className="text-xs text-[#5C4A3A]/50">Carregando...</p>
                        </div>
                    ) : list.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
                            <Bell className="h-8 w-8 text-[#5C4A3A]/20 mb-2" />
                            <p className="text-sm text-[#5C4A3A]/50">Nenhuma notificação recente</p>
                        </div>
                    ) : (
                        <div className="py-1">
                            {list.map((item) => (
                                <div key={item.id}>
                                    <DropdownMenuItem 
                                        className={cn(
                                            "cursor-pointer flex items-start gap-3 p-3 mx-1 rounded-md focus:bg-[#F5F4ED] transition-colors outline-none",
                                            !item.read_at ? "bg-[#F5F4ED]/40" : "hover:bg-gray-50"
                                        )}
                                        onSelect={() => handleNotificationClick(item)}
                                    >
                                        {/* Avatar do Autor */}
                                        <Avatar className="h-9 w-9 mt-0.5 border border-[#E8E6D4]">
                                            <AvatarImage src={item.data.actor_avatar} />
                                            <AvatarFallback className="bg-[#8B9A7E] text-white text-xs">
                                                {item.data.actor_name?.charAt(0).toUpperCase() || "?"}
                                            </AvatarFallback>
                                        </Avatar>

                                        {/* Conteúdo */}
                                        <div className="flex-1 space-y-1 min-w-0">
                                            <p className={cn(
                                                "text-sm leading-snug line-clamp-2",
                                                !item.read_at ? "font-semibold text-black" : "text-[#5C4A3A]"
                                            )}>
                                                {item.data.message}
                                            </p>
                                            <p className="text-[10px] text-[#5C4A3A]/60 font-medium uppercase tracking-wide">
                                                {item.created_at}
                                            </p>
                                        </div>

                                        {/* Bolinha de Não Lido */}
                                        {!item.read_at && (
                                            <span className="h-2 w-2 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                                        )}
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator className="my-0 opacity-50" />
                                </div>
                            ))}
                        </div>
                    )}
                </ScrollArea>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}