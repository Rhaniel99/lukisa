import { createContext, useContext, useState, useCallback } from "react";
import { router, usePage } from "@inertiajs/react";
import type { PropsWithChildren } from "react";
import type { SettingsUser, SettingsTab } from "@/Types/Settings";
import type { PageProps } from "@/Types/models";

interface SettingsContextValue {
  isOpen: boolean;
  activeTab: SettingsTab;
  user: SettingsUser | null;
  open: (tab?: SettingsTab) => void;
  close: () => void;
  setTab: (tab: SettingsTab) => void;
}

const SettingsContext = createContext<SettingsContextValue | null>(null);

export function SettingsProvider({ children }: PropsWithChildren) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<SettingsTab>("profile");
  const [user, setUser] = useState<SettingsUser | null>(null);

  const page = usePage<PageProps>();
  const serverUser = page.props.settings_user;

  /**
   * Abrir modal
   * - opcionalmente com outra tab ativa
   * - recarrega somente settings_user
   */
  const open = useCallback((tab: SettingsTab = "profile") => {
    setActiveTab(tab);

    // Se já tem no front, não faz reload
    if (serverUser) {
      setUser(serverUser);
      setIsOpen(true);
      return;
    }

    // Reload apenas do settings_user (super rápido)
    router.reload({
      only: ["settings_user"],
      onSuccess: () => {
        const updatedUser = (page.props as PageProps).settings_user ?? null;
        setUser(updatedUser);
        setIsOpen(true);
      },
    });
  }, [serverUser]);

  /** Fechar modal */
  const close = useCallback(() => setIsOpen(false), []);

  /** Trocar tab dentro do modal */
  const setTab = useCallback((tab: SettingsTab) => setActiveTab(tab), []);

  return (
    <SettingsContext.Provider
      value={{
        isOpen,
        activeTab,
        user,
        open,
        close,
        setTab,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error("useSettings must be used inside <SettingsProvider>");
  return ctx;
}
