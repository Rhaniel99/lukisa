import CozyNotification from "@/Components/Notifications/CozyNotification";

export default function PhamaniLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <div className="w-full h-screen overflow-hidden">
                <CozyNotification />
                {children}
            </div>
        </>
    );
}
