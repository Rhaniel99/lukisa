import { createContext, useContext, useState, PropsWithChildren } from "react";

type MenuType = "notifications" | "friends" | "profile" | null;

interface MenuContextType {
    openMenu: MenuType;
    toggleMenu: (menu: MenuType) => void;
    closeMenu: () => void;
}

const MenuContext = createContext<MenuContextType | null>(null);

export function MenuProvider({ children }: PropsWithChildren) {
    const [openMenu, setOpenMenu] = useState<MenuType>(null);

    const toggleMenu = (menu: MenuType) => {
        setOpenMenu((prev) => (prev === menu ? null : menu));
    };

    const closeMenu = () => setOpenMenu(null);

    return (
        <MenuContext.Provider value={{ openMenu, toggleMenu, closeMenu }}>
            {children}
        </MenuContext.Provider>
    );
}

export function useMenu() {
    const ctx = useContext(MenuContext);
    if (!ctx) throw new Error("useMenu must be used inside <MenuProvider>");
    return ctx;
}
