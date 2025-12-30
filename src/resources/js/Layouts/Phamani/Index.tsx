import CozyNotification from "@/Components/Notifications/CozyNotification";
import { TransactionModalProvider } from "@/Pages/Auth/Phamani/contexts/TransactionModalContext";

export default function PhamaniLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <TransactionModalProvider>
                <div className="w-full h-screen overflow-hidden">
                    <CozyNotification />
                    {children}
                </div>
            </TransactionModalProvider>
        </>
    );
}
