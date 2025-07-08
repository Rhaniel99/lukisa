import type React from "react";
import NotificationHandler from "@/Components/Notifications/NotificationHandler";

interface LayoutProps {
    children: React.ReactNode;
}

export default function GuestLayout({ children }: LayoutProps) {
    return (
        <>
            <NotificationHandler />
            <div className="min-h-screen bg-gradient-to-br from-lukisa-light via-lukisa-cream to-lukisa-sage">
                {children}
            </div>
        </>
    );
}
