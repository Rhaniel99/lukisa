import { PropsWithChildren } from "react";
import CozyNotification from "@/Components/Notifications/CozyNotification";
import Header from "./components/Header";
import { MenuProvider } from "./context/MenuContext";
import { SettingsProvider } from "./context/SettingsContext";
import { SettingsModal } from "./components/modal/SettingsModal";

export default function AuthLayout({ children }: PropsWithChildren) {
    return (
        <>
            <CozyNotification />

            <MenuProvider>
                <SettingsProvider>
                    <div className="min-h-screen bg-gradient-to-br from-[#E8DCC4] via-[#D4C5A9] to-[#C9B59A]">
                        
                        <Header />

                        <SettingsModal />

                        <main className="container mx-auto px-6 py-12">
                            {children}
                        </main>
                    </div>
                </SettingsProvider>
            </MenuProvider>
        </>
    );
}
