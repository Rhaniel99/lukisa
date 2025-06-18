import React, { PropsWithChildren } from "react";
import Notification from "@/Components/Notifications/Toast";
import { Link } from "@inertiajs/react";

export default function AuthLayout({ children }: PropsWithChildren) {
    return (
        <>
            <Notification />

            <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
                <nav className="flex items-center justify-between border-b border-gray-200 bg-white p-4">
                    <p className="font-semibold text-gray-700 dark:text-gray-200">
                        Navegação Autenticada
                    </p>

                    <Link
                        href={route("auth.logout")}
                        method="post"
                        as="button"
                        className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                    >
                        Sair
                    </Link>
                </nav>

                <main>{children}</main>
            </div>
        </>
    );
}
