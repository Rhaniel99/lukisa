import React from "react";
import { Head, usePage } from "@inertiajs/react";
import { PageProps } from "@/Types/models";
import Chatbot from "@/Pages/Auth/Marvin/Components/Chatbot";
import { motion, AnimatePresence } from "framer-motion";
import WelcomeHeader from "@/Pages/Auth/Lukisa/Components/WelcomeHeader";
import MemoriesCard from "@/Pages/Auth/Lukisa/Components/MemoriesCard";
import PolluxProjectCard from "@/Pages/Auth/Lukisa/Components/PolluxProjectCard";
import MarvinCard from "@/Pages/Auth/Lukisa/Components/MarvinCard";
import { useMarvinChat } from "@/Pages/Auth/Lukisa/Hooks/useMarvinChat";

const Index: React.FC = () => {
    const { auth } = usePage<PageProps>().props;
    const { isChatOpen, chatMessages, ollamaStatus, openChat, closeChat } = useMarvinChat();

    return (
        <>
            <Head title="Bem-vindo" />

            <main className="px-6 py-12">
                <div className="max-w-4xl mx-auto">
                    <WelcomeHeader username={auth.user.username} />

                    <div className="grid md:grid-cols-3 gap-8">
                        <MemoriesCard />
                        <PolluxProjectCard />
                        <MarvinCard onClick={openChat} />
                    </div>
                </div>
            </main>

            <AnimatePresence>
                {isChatOpen && (
                    <motion.div
                        className="fixed bottom-4 right-4 z-50"
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 100 }}
                        transition={{ ease: "easeInOut", duration: 0.3 }}
                    >
                        <Chatbot
                            messages={chatMessages}
                            onClose={closeChat}
                            status={ollamaStatus}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Index;

