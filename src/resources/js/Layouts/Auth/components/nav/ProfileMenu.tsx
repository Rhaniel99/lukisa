import { useMenu } from "@/Layouts/Auth/context/MenuContext";
import { useAuth } from "@/Hooks/useAuth";
import { useSettings } from "@/Layouts/Auth/context/SettingsContext";
import { Avatar, AvatarImage, AvatarFallback } from "@/Components/ui/avatar";
import { Settings, LogOut } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

export default function ProfileMenu() {
  const { user, logout } = useAuth();
  const { openMenu, toggleMenu, closeMenu } = useMenu();
  const { open: openSettings } = useSettings();
  const open = openMenu === "profile";

  return (
    <div className="relative">

      {/* Trigger */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => toggleMenu("profile")}
        className="
          w-10 h-10 rounded-xl
          bg-[#FDFBF7]
          shadow-md
          border border-[#E8DCC4]/60
          flex items-center justify-center
          overflow-hidden
          transition-all hover:bg-[#F5EFE6]
        "
      >
        <Avatar className="w-10 h-10 rounded-xl border border-[#E8DCC4]/60">
          <AvatarImage src={user?.avatar_url || ""} />
          <AvatarFallback className="bg-[#6B4E3D] text-[#F5EFE6] font-semibold">
            {user?.username?.charAt(0)?.toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </motion.button>

      {/* Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.96 }}
            transition={{ duration: 0.18 }}
            className="
              absolute right-0 top-14 w-64
              bg-white/90 backdrop-blur-md
              rounded-2xl border border-[#E8DCC4]
              shadow-[0_8px_30px_rgba(0,0,0,0.08)]
              p-2 z-50
            "
          >
            {/* User Info */}
            <div className="
                text-center py-4 mb-2
                bg-[#F5EFE6]/50 rounded-xl
                border border-[#E8DCC4]
            ">
              <p className="text-[#3D2817] font-bold">{user?.username}</p>
              {user?.discriminator && (
                <p className="text-[#8B7355] text-xs">#{user.discriminator}</p>
              )}
            </div>

            {/* Actions */}
            <div className="space-y-1 px-1">

              <button
                onClick={() => {
                  closeMenu();
                  openSettings("profile");
                }}
                className="
                  w-full px-4 py-3 flex items-center gap-3
                  text-[#3D2817] text-sm font-medium
                  hover:bg-[#F5EFE6]
                  rounded-xl transition-colors
                "
              >
                <Settings className="w-4 h-4" />
                Configurações
              </button>

              <button
                onClick={logout}
                className="
                  w-full px-4 py-3 flex items-center gap-3
                  text-[#D4183D] text-sm font-medium
                  hover:bg-[#FEF2F2]
                  rounded-xl transition-colors
                "
              >
                <LogOut className="w-4 h-4" />
                Sair
              </button>

            </div>

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
