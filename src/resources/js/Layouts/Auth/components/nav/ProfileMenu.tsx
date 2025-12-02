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

  const isOpen = openMenu === "profile";

  const handleOpenSettings = () => {
    closeMenu();
    openSettings("profile");
  };

  return (
    <div className="relative">
      {/* Avatar button */}
      <button onClick={() => toggleMenu("profile")} className="focus:outline-none">
        <Avatar className="w-10 h-10 border-2 border-[#6B4E3D]">
          <AvatarImage src={user?.avatar_url || ""} />

          <AvatarFallback className="bg-[#6B4E3D] text-[#F5EFE6] font-semibold">
            {user?.username?.charAt(0)?.toUpperCase() ?? "U"}
          </AvatarFallback>
        </Avatar>
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.96 }}
            transition={{ duration: 0.18 }}
            className="
              absolute right-0 top-14 w-64 z-50
              bg-white rounded-2xl shadow-2xl border-2 border-[#E8DCC4] 
              p-4
            "
          >
            {/* Username */}
            <div className="text-center mb-4 pb-4 border-b-2 border-[#E8DCC4]">
              <p className="text-[#3D2817] font-medium">{user?.username}</p>

              {user?.discriminator && (
                <p className="text-[#8B7355] text-sm">#{user.discriminator}</p>
              )}
            </div>

            {/* Menu items */}
            <div className="space-y-2">
              {/* Configurações */}
              <button
                onClick={handleOpenSettings}
                className="
                  w-full flex items-center gap-3 px-4 py-2 
                  text-[#3D2817] hover:bg-[#F5EFE6] 
                  rounded-xl transition-colors
                "
              >
                <Settings className="w-4 h-4" />
                Configurações
              </button>

              {/* Logout */}
              <button
                onClick={logout}
                className="
                  w-full flex items-center gap-3 px-4 py-2 
                  text-[#D4183D] hover:bg-[#F5EFE6] 
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
