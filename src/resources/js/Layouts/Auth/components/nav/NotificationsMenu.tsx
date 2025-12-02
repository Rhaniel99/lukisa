import { Bell } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useMenu } from "@/Layouts/Auth/context/MenuContext";

export default function NotificationsMenu() {
    const { openMenu, toggleMenu, closeMenu } = useMenu();
    const open = openMenu === "notifications";

    return (
        <div className="relative">
            <button
                onClick={() => toggleMenu("notifications")}
                className="w-10 h-10 bg-white border-2 border-[#E8DCC4] rounded-xl flex items-center justify-center hover:bg-[#F5EFE6] transition-colors relative"
            >
                <Bell className="w-5 h-5 text-[#6B4E3D]" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-[#D4183D] rounded-full"></span>
            </button>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 top-14 w-80 bg-white rounded-2xl shadow-2xl border-2 border-[#E8DCC4] p-4 z-50"
                    >

                        {/* Header */}
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-[#3D2817]">Notificações</h3>

                            <button
                                onClick={closeMenu}
                                className="text-[#6B4E3D] hover:text-[#3D2817]"
                            >
                                <span className="text-sm">✕</span>
                            </button>
                        </div>
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
    );
}
