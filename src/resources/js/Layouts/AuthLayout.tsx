import { PropsWithChildren, useState } from "react";
import { Link, router, usePage } from "@inertiajs/react";
import NotificationHandler from "@/Components/Notifications/NotificationHandler";
import { Button } from "@/Components/ui/button";
// import { Bell, LogOut, Settings, Users } from "lucide-react";
import { Bell, Users, Settings, MapPin, Wallet, MessageCircle, ArrowRight, UserPlus } from 'lucide-react';

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
import { SettingsModal } from "@/Components/Modal/SettingsModal/Index";
import { FriendsSubmenu } from "@/Components/Shared/Menu/FriendsSubmenu";
import { NotificationsSubmenu } from "@/Components/Shared/Menu/NotificationsSubmenu";
import { motion, AnimatePresence } from 'motion/react';
import logo from "/public/img/cat-l.svg";
import CozyNotification from "@/Components/Notifications/CozyNotification";

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

    const [showNotifications, setShowNotifications] = useState(false);
    const [showFriends, setShowFriends] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const [showSettingsModal, setShowSettingsModal] = useState(false);
    const [showMarvinChat, setShowMarvinChat] = useState(false);

    const handleMemoriesClick = () => {
        // if (onNavigate) onNavigate('memories');
    };

    const handlePhamaniClick = () => {
        // if (onNavigate) onNavigate('phamani');
    };

    const handleMarvinClick = () => {
        setShowMarvinChat(true);
    };

    const handleLogout = () => {
        router.post(route("auth.logout"));
    };

    return (
        <>
            <CozyNotification />

            <div className="min-h-screen bg-gradient-to-br from-[#E8DCC4] via-[#D4C5A9] to-[#C9B59A]">
                {/* Header */}
                <header className="bg-[#F5EFE6]/80 backdrop-blur-sm border-b-2 border-[#E8DCC4]">
                    <div className="container mx-auto px-6 py-4 flex items-center justify-between">
                        {/* Logo */}
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-[#E8DCC4] rounded-2xl flex items-center justify-center shadow-md">
                                <img src={logo} alt="Lukisa Logo" />
                            </div>
                        </div>

                        {/* Navigation Icons */}
                        <div className="flex items-center gap-4">
                            {/* Notifications */}
                            <div className="relative">
                                <button
                                    onClick={() => {
                                        setShowNotifications(!showNotifications);
                                        setShowFriends(false);
                                        setShowProfile(false);
                                    }}
                                    className="w-10 h-10 bg-white border-2 border-[#E8DCC4] rounded-xl flex items-center justify-center hover:bg-[#F5EFE6] transition-colors relative"
                                >
                                    <Bell className="w-5 h-5 text-[#6B4E3D]" />
                                    <span className="absolute top-0 right-0 w-2 h-2 bg-[#D4183d] rounded-full"></span>
                                </button>

                                {/* Notifications Dropdown */}
                                <AnimatePresence>
                                    {showNotifications && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                            transition={{ duration: 0.2 }}
                                            className="absolute right-0 top-14 w-80 bg-white rounded-2xl shadow-2xl border-2 border-[#E8DCC4] p-4 z-50"
                                        >
                                            <h3 className="text-[#3D2817] mb-4">Notificações</h3>
                                            <div className="space-y-3">
                                                <div className="flex gap-3 p-3 hover:bg-[#F5EFE6] rounded-xl transition-colors">
                                                    <div className="w-10 h-10 bg-[#6B4E3D] rounded-full flex items-center justify-center flex-shrink-0">
                                                        <span className="text-[#F5EFE6]">U</span>
                                                    </div>
                                                    <div className="flex-1">
                                                        <p className="text-[#3D2817]">UserTest curtiu sua memória.</p>
                                                        <p className="text-[#8B7355]">há 2 horas</p>
                                                    </div>
                                                </div>
                                                <div className="flex gap-3 p-3 hover:bg-[#F5EFE6] rounded-xl transition-colors">
                                                    <div className="w-10 h-10 bg-[#6B4E3D] rounded-full flex items-center justify-center flex-shrink-0">
                                                        <span className="text-[#F5EFE6]">U</span>
                                                    </div>
                                                    <div className="flex-1">
                                                        <p className="text-[#3D2817]">UserTest curtiu sua memória.</p>
                                                        <p className="text-[#8B7355]">há 3 horas</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Friends */}
                            <div className="relative">
                                <button
                                    onClick={() => {
                                        setShowFriends(!showFriends);
                                        setShowNotifications(false);
                                        setShowProfile(false);
                                    }}
                                    className="w-10 h-10 bg-white border-2 border-[#E8DCC4] rounded-xl flex items-center justify-center hover:bg-[#F5EFE6] transition-colors"
                                >
                                    <Users className="w-5 h-5 text-[#6B4E3D]" />
                                </button>

                                {/* Friends Dropdown */}
                                <AnimatePresence>
                                    {showFriends && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                            transition={{ duration: 0.2 }}
                                            className="absolute right-0 top-14 w-80 bg-white rounded-2xl shadow-2xl border-2 border-[#E8DCC4] p-4 z-50"
                                        >
                                            <div className="flex items-center justify-between mb-4">
                                                <h3 className="text-[#3D2817]">Amigos</h3>
                                                <button
                                                    onClick={() => setShowFriends(false)}
                                                    className="text-[#6B4E3D] hover:text-[#3D2817]"
                                                >
                                                    <span className="text-sm">✕</span>
                                                </button>
                                            </div>

                                            <div className="mb-4 flex gap-2">
                                                <input
                                                    type="text"
                                                    placeholder="Buscar amigos..."
                                                    className="w-full px-4 py-2 bg-[#F5EFE6] border-2 border-[#E8DCC4] rounded-xl focus:outline-none focus:border-[#6B4E3D] transition-colors text-[#3D2817] placeholder:text-[#A69580]"
                                                />
                                                <button
                                                    className="bg-[#6B4E3D] text-[#F5EFE6] p-2 rounded-xl hover:bg-[#3D2817] transition-colors"
                                                    title="Adicionar Amigo"
                                                >
                                                    <UserPlus className="w-5 h-5" />
                                                </button>
                                            </div>

                                            <div className="flex gap-4 border-b-2 border-[#E8DCC4] mb-4">
                                                <button className="pb-2 text-[#3D2817] border-b-2 border-[#6B4E3D]">
                                                    Todos
                                                </button>
                                                <button className="pb-2 text-[#8B7355]">
                                                    Pendentes
                                                </button>
                                            </div>

                                            <div className="space-y-2">
                                                <div className="flex items-center justify-between p-3 hover:bg-[#F5EFE6] rounded-xl transition-colors">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 bg-[#6B4E3D] rounded-full flex items-center justify-center">
                                                            <span className="text-[#F5EFE6]">U</span>
                                                        </div>
                                                        <div>
                                                            <p className="text-[#3D2817]">UserTest</p>
                                                            <p className="text-[#8B7355]">Online</p>
                                                        </div>
                                                    </div>
                                                    <button className="text-[#8B7355] hover:text-[#3D2817]">⋮</button>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Profile */}
                            <div className="relative">
                                <button
                                    onClick={() => {
                                        setShowProfile(!showProfile);
                                        setShowNotifications(false);
                                        setShowFriends(false);
                                    }}
                                    className="focus:outline-none"
                                >
                                    <Avatar className="w-10 h-10 border-2 border-[#6B4E3D]">
                                        <AvatarImage
                                            src={user.avatar_url || ""}
                                            alt={user.username}
                                        />
                                        <AvatarFallback className="bg-[#6B4E3D] text-[#F5EFE6] font-semibold">
                                            {user.username.charAt(0).toUpperCase()}
                                        </AvatarFallback>
                                    </Avatar>
                                </button>

                                {/* Profile Dropdown */}
                                <AnimatePresence>
                                    {showProfile && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                            transition={{ duration: 0.2 }}
                                            className="absolute right-0 top-14 w-64 bg-white rounded-2xl shadow-2xl border-2 border-[#E8DCC4] p-4 z-50"
                                        >
                                            <div className="text-center mb-4 pb-4 border-b-2 border-[#E8DCC4]">
                                                <p className="text-[#3D2817]">Polar #7251</p>
                                            </div>
                                            <div className="space-y-2">
                                                <button
                                                    onClick={() => {
                                                        setShowSettingsModal(true);
                                                        setShowProfile(false);
                                                    }}
                                                    className="w-full text-left px-4 py-2 text-[#3D2817] hover:bg-[#F5EFE6] rounded-xl transition-colors"
                                                >
                                                    Configurações
                                                </button>
                                                <button
                                                    onClick={handleLogout}
                                                    className="w-full text-left px-4 py-2 text-[#D4183d] hover:bg-[#F5EFE6] rounded-xl transition-colors"
                                                >
                                                    Sair
                                                </button>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <main className="container mx-auto px-6 py-12">
                    {children}
                </main>
                {/* Settings Modal */}
                {/* <SettingsModal isOpen={showSettingsModal} onClose={() => setShowSettingsModal(false)} /> */}

                {/* Marvin Chat */}
                {/* <MarvinChat isOpen={showMarvinChat} onClose={() => setShowMarvinChat(false)} /> */}
            </div>
        </>
    );
}
