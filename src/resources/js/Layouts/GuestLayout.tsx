import React, { PropsWithChildren } from 'react';
import Notification from '@/Components/Notifications/Toast';

export default function GuestLayout({ children }: PropsWithChildren) {
    return (
        <>
            <Notification />

            <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
                <nav className="border-b border-gray-200 bg-white p-4">
                    <p>Navegação Publica</p>
                </nav>

                <main>{children}</main>
            </div>
        </>
    );
}
