import { Bell, Check } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useMenu } from "@/Layouts/Auth/context/MenuContext";
import { useNotifications } from "@/Layouts/Auth/hooks/useNotifications";
import { router } from "@inertiajs/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import { ScrollArea } from "@/Components/ui/scroll-area";
import { dropdownMotion, menuButtonMotion } from "@/Components/Shared/Ui/motionPresets";

export default function NotificationsMenu() {
    const { openMenu, toggleMenu, closeMenu } = useMenu();
    const open = openMenu === "notifications";

    // notificações reais
    const {
        count,
        list,
        isLoaded,
        loading,
        loadNotifications,
        markAsRead,
        markAllAsRead,
    } = useNotifications();

    // carregar ao abrir
    if (open && !isLoaded && !loading) {
        loadNotifications();
    }

    // clicar em uma notificação
    const handleNotificationClick = (item: any) => {
        const go = () => {
            if (item.data.link) {
                closeMenu();
                router.get(item.data.link);
            }
        };

        if (!item.read_at) {
            markAsRead(item.id, go);
        } else {
            go();
        }
    };

    return (
        <div className="relative">
            {/* botão */}
            <motion.button
                onClick={() => toggleMenu("notifications")}
                className="
                    w-10 h-10 rounded-xl 
                    bg-[#FDFBF7] 
                    border border-[#E8DCC4]/60
                    shadow-sm
                    flex items-center justify-center
                    transition-all
                    hover:bg-[#F5EFE6]
                    relative
                "

                {...menuButtonMotion}
            >
                <Bell className="w-5 h-5 text-[#3D2817]" />

                {/* dot pulsante */}
                {count > 0 && (
                    <motion.span
                        initial={{ scale: 1 }}
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ repeat: Infinity, duration: 1.8 }}
                        className="
                            absolute -top-0.5 -right-0.5
                            w-2.5 h-2.5 bg-[#D4183D]
                            border border-[#FDFBF7]
                            rounded-full
                        "
                    />
                )}
            </motion.button>

            {/* DROPDOWN */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        className="
                            absolute right-0 top-14 w-80 z-50
                            bg-white
                            rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.08)]
                            border border-[#E8DCC4]
                            overflow-hidden
                        "

                        {...dropdownMotion}
                    >
                        {/* HEADER */}
                        <div className="flex items-center justify-between mb-3 pb-3 border-b border-[#E8DCC4] px-4 pt-4 bg-white/40">
                            <h3 className="text-[#3D2817] font-semibold">Notificações</h3>

                            {count > 0 && (
                                <button
                                    onClick={markAllAsRead}
                                    className="text-xs text-[#6B4E3D] hover:text-[#3D2817] flex items-center gap-1"
                                >
                                    Marcar todas
                                    <Check className="w-3 h-3" />
                                </button>
                            )}
                        </div>

                        {/* LISTA */}
                        <ScrollArea className="h-[350px] px-2">
                            {/* loading */}
                            {loading && !isLoaded && (
                                <div className="flex flex-col items-center justify-center py-10 space-y-2 text-[#6B4E3D]/60">
                                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#6B4E3D]" />
                                    <p className="text-xs">Carregando...</p>
                                </div>
                            )}

                            {/* vazio */}
                            {!loading && list.length === 0 && (
                                <div className="flex flex-col items-center justify-center py-12 text-[#6B4E3D]/40">
                                    <Bell className="h-8 w-8 mb-2" />
                                    <p>Nenhuma notificação</p>
                                </div>
                            )}

                            {/* lista real */}
                            <div className="space-y-2 pb-2">
                                {list.map((item) => (
                                    <div
                                        key={item.id}
                                        onClick={() => handleNotificationClick(item)}
                                        className={`
                                            flex gap-3 p-3 mx-1 rounded-xl cursor-pointer
                                            transition-colors
                                            ${!item.read_at
                                                ? "bg-[#F5EFE6]/80 hover:bg-[#E8DCC4]/60"
                                                : "hover:bg-[#F5EFE6]"
                                            }
                                        `}
                                    >
                                        {/* Avatar */}
                                        <Avatar className="h-10 w-10 border border-[#E8DCC4]">
                                            <AvatarImage src={item.data.actor_avatar} />
                                            <AvatarFallback className="bg-[#6B4E3D] text-[#FDFBF7] text-xs">
                                                {item.data.actor_name?.charAt(0)?.toUpperCase()}
                                            </AvatarFallback>
                                        </Avatar>

                                        {/* texto */}
                                        <div className="flex-1 min-w-0">
                                            <p
                                                className={`
                                                    text-sm leading-snug line-clamp-2
                                                    ${!item.read_at
                                                        ? "font-semibold text-[#3D2817]"
                                                        : "text-[#6B4E3D]"
                                                    }
                                                `}
                                            >
                                                {item.data.message}
                                            </p>
                                            <p className="text-[10px] text-[#8B7355] mt-1">
                                                {item.created_at}
                                            </p>
                                        </div>

                                        {/* bolinha unread */}
                                        {!item.read_at && (
                                            <span className="h-2.5 w-2.5 rounded-full bg-[#D4183D] mt-2 flex-shrink-0" />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </ScrollArea>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
