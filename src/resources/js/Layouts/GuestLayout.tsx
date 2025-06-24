import type React from "react";
import Notification from "@/Components/Notifications/Toast";

interface LayoutProps {
    children: React.ReactNode;
}

export default function GuestLayout({ children }: LayoutProps) {
    return (
        <>
            <Notification />
            <div className="min-h-screen bg-gradient-to-br from-lukisa-light via-lukisa-cream to-lukisa-sage">
                {children}
            </div>
        </>
    );
}
