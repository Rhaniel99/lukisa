import { AnimatePresence, motion } from "motion/react";
import { Users, UserPlus } from "lucide-react";
import { useMenu } from "@/Layouts/Auth/context/MenuContext";

export default function FriendsMenu() {
    const { openMenu, toggleMenu, closeMenu } = useMenu();
    const open = openMenu === "friends";

    return (
        <div className="relative">
            {/* Button */}
            <button
                onClick={() => toggleMenu("friends")}
                className="w-10 h-10 bg-white border-2 border-[#E8DCC4] rounded-xl flex items-center justify-center hover:bg-[#F5EFE6] transition-colors"
            >
                <Users className="w-5 h-5 text-[#6B4E3D]" />
            </button>

            {/* Dropdown */}
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
                            <h3 className="text-[#3D2817]">Amigos</h3>

                            <button
                                onClick={closeMenu}
                                className="text-[#6B4E3D] hover:text-[#3D2817]"
                            >
                                <span className="text-sm">✕</span>
                            </button>
                        </div>

                        {/* Search + Add */}
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

                        {/* Tabs */}
                        <div className="flex gap-4 border-b-2 border-[#E8DCC4] mb-4">
                            <button className="pb-2 text-[#3D2817] border-b-2 border-[#6B4E3D]">
                                Todos
                            </button>
                            <button className="pb-2 text-[#8B7355]">
                                Pendentes
                            </button>
                        </div>

                        {/* Friends List */}
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
    );
}
