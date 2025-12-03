import { motion } from "motion/react";
import { Users } from "lucide-react";
import { FriendsDropdown } from "@/Layouts/Auth/components/dropdown/FriendsDropdown";
import { useMenu } from "@/Layouts/Auth/context/MenuContext";
import { useFriends } from "@/Layouts/Auth/hooks/useFriends";

export default function FriendsMenu() {
    const { openMenu, toggleMenu, closeMenu } = useMenu();
    const open = openMenu === "friends";
    const { counts } = useFriends();

    return (
        <div className="relative">
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => toggleMenu("friends")}
                className="
                        relative w-10 h-10 bg-[#FDFBF7]
                        rounded-xl border border-[#E8DCC4]/60
                        flex items-center justify-center
                        hover:bg-[#F5EFE6] transition-all shadow-sm
                        ">
                <Users className="w-5 h-5 text-[#3D2817]" />

                {counts > 0 && (
                    <>
                        {/* Número */}
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="
                                absolute -top-1.5 -right-1.5
                                min-w-[18px] h-[18px] 
                                bg-[#D4183D] text-white
                                border-2 border-[#FDFBF7]
                                rounded-full
                                flex items-center justify-center
                                z-20
                                shadow-sm
                            "
                        >
                            <span className="text-[10px] font-bold px-0.5">
                                {counts > 99 ? '99+' : counts}
                            </span>
                        </motion.div>

                        {/* Efeito de pulso ao redor */}
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0.7 }}
                            animate={{
                                scale: [1, 1.3, 1],
                                opacity: [0.7, 0, 0.7]
                            }}
                            transition={{
                                repeat: Infinity,
                                duration: 2,
                                ease: "easeInOut",
                            }}
                            className="
                                absolute -top-2 -right-2
                                w-5 h-5 
                                bg-[#D4183D]/40
                                rounded-full
                                z-10
                            "
                        />
                    </>
                )}
            </motion.button>

            <FriendsDropdown isOpen={open} onClose={() => closeMenu()} />
        </div>
    );
}