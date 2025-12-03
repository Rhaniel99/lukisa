import { PropsWithChildren } from "react";
import CozyNotification from "@/Components/Notifications/CozyNotification";
import Header from "./components/Header";
import { MenuProvider } from "./context/MenuContext";
import { SettingsProvider } from "./context/SettingsContext";
import { SettingsModal } from "./components/modal/SettingsModal";
import { FriendsProvider } from "./context/FriendsContext";

export default function AuthLayout({ children }: PropsWithChildren) {
    return (
        <>
            <CozyNotification />

            <MenuProvider>
                <SettingsProvider>
                    <FriendsProvider>
                        <div className="min-h-screen bg-gradient-to-b from-[#F9F6F0] via-[#F5EFE6] to-[#E8DCC4] relative overflow-hidden font-sans">
                            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>

                            <Header />

                            <SettingsModal />

                            <main className="container mx-auto px-6 py-12">
                                {children}
                            </main>
                        </div>
                    </FriendsProvider>
                </SettingsProvider>
            </MenuProvider>
        </>
    );
}
