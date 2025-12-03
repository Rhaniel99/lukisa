import type React from "react";
import { AnimatePresence, motion } from "motion/react";
import { usePage } from "@inertiajs/react";
import CozyNotification from "@/Components/Notifications/CozyNotification";

interface LayoutProps {
    children: React.ReactNode;
}

export default function GuestLayout({ children }: LayoutProps) {
    const { component } = usePage();

    return (
        <>
            <CozyNotification />

            <div className="min-h-screen bg-gradient-to-br from-lukisa-light via-lukisa-cream to-lukisa-sage">
                <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                        key={component}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{
                            opacity: 1,
                            y: 0,
                            transition: { duration: 0.3 }
                        }}
                        exit={{
                            opacity: 0,
                            y: -10,
                            transition: { duration: 0.3 } 
                        }}
                        className="min-h-screen"
                    >
                        {children}
                    </motion.div>
                </AnimatePresence>
            </div>
        </>
    );
}