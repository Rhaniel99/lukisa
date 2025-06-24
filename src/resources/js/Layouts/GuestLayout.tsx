import React, { PropsWithChildren } from 'react';
import Notification from '@/Components/Notifications/Toast';

export default function GuestLayout({ children }: PropsWithChildren) {
    return (
        <>
            <Notification />

            {/* <div className="bg-lukisa-cream min-h-screen"> */}
                {/* <nav className="border-b border-gray-200 bg-white p-4">
                    <p>Navegação Publica</p>
                </nav> */}

                <main className='bg-lukisa-cream min-h-screen'>{children}</main>
            {/* </div> */}
        </>
    );
}
