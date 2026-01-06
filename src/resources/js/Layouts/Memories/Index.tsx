import CozyNotification from "@/Components/Notifications/CozyNotification";
import { MemoriesUIProvider } from "@/Pages/Auth/Memories/contexts/MemoriesUIContext";
import { useSocialNotifications } from "@/Pages/Auth/Memories/hooks/useSocialNotifications";

export default function MemoriesLayout({ children }: { children: React.ReactNode }) {
    useSocialNotifications();

    return (
        <>
            <MemoriesUIProvider>
                <div className="w-full h-screen overflow-hidden">
                    <CozyNotification />
                    {children}
                </div>
            </MemoriesUIProvider>
        </>
    );
}
