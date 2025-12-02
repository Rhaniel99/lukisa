import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import { useSettings } from "@/Layouts/Auth/context/SettingsContext";
import { ProfileTab } from "./tabs/ProfileTab";
import { AccountTab } from "./tabs/AccountTab";
import { PrivacyTab } from "./tabs/PrivacyTab";
import type { SettingsTab } from "@/Types/Settings";
import { useKeyPress } from "@/Hooks/useKeyPress";

export function SettingsModal() {
  const { isOpen, close, activeTab, setTab, user } = useSettings();

  // ESC para fechar
  useKeyPress("Escape", close);

  if (!isOpen || !user) return null;

  const renderTab = () => {
    switch (activeTab) {
      case "profile":
        return <ProfileTab user={user} />;
      case "account":
        return <AccountTab user={user} />;
      case "privacy":
        return <PrivacyTab user={user} />;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative bg-[#E8DCC4] rounded-[2rem] shadow-2xl w-full max-w-6xl h-[700px] flex overflow-hidden"
          >
            {/* Close button */}
            <button
              onClick={close}
              className="absolute top-4 right-4 text-[#6B4E3D] hover:text-[#3D2817]"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Sidebar */}
            <SettingsSidebar activeTab={activeTab} setTab={setTab} />

            {/* Content */}
            <div className="flex-1 p-10 overflow-y-auto bg-[#F5EFE6]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -15 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                >
                  {renderTab()}
                </motion.div>
              </AnimatePresence>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

function SettingsSidebar({
  activeTab,
  setTab,
}: {
  activeTab: SettingsTab;
  setTab: (t: SettingsTab) => void;
}) {
  const options = [
    { key: "profile", label: "Perfil", icon: "User" },
    { key: "account", label: "Conta", icon: "Settings" },
    { key: "privacy", label: "Privacidade", icon: "Lock" },
  ];

  return (
    <div className="w-64 bg-[#D4C5A9]/50 border-r border-[#C9B59A] p-6 flex flex-col gap-3">
      <h2 className="text-xl font-bold mb-4 text-[#3D2817]">Configurações</h2>

      {options.map((item) => (
        <button
          key={item.key}
          onClick={() => setTab(item.key as SettingsTab)}
          className={`px-4 py-3 rounded-xl text-left ${activeTab === item.key
              ? "bg-[#3D2817] text-[#F5EFE6]"
              : "text-[#6B4E3D] hover:bg-[#C9B59A]/40"
            }`}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
