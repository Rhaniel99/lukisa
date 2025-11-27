import type React from "react";
import NotificationHandler from "@/Components/Notifications/NotificationHandler";
import { AnimatePresence, motion } from "framer-motion";
import { usePage } from "@inertiajs/react";

interface LayoutProps {
    children: React.ReactNode;
}

export default function GuestLayout({ children }: LayoutProps) {
    const { component } = usePage();
    
    const pageVariants = {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -10 },
    };

    return (
        <>
            <NotificationHandler />
            
            <div className="min-h-screen bg-gradient-to-br from-lukisa-light via-lukisa-cream to-lukisa-sage">
                <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                        key={component}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        variants={pageVariants}
                        transition={{ duration: 0.3 }}
                        className="min-h-screen"
                    >
                        {children}
                    </motion.div>
                </AnimatePresence>
            </div>
        </>
    );
}