import CozyNotification from "@/Components/Notifications/CozyNotification";
import { MemoriesUIProvider } from "@/Pages/Auth/Memories/contexts/MemoriesUIContext";

export default function MemoriesLayout({ children }: { children: React.ReactNode }) {
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
