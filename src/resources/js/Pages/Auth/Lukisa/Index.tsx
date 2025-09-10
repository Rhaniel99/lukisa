import React, { useState, useEffect } from "react";
import { Link, Head, usePage, router } from "@inertiajs/react";
import { PageProps } from "@/Types/models";
import { Card, CardContent } from "@/Components/ui/card";
import { HardDrive, Map, Bot } from "lucide-react";
import Chatbot from "@/Pages/Auth/Marvin/Components/Chatbot";
import { ChatMessage } from "@/Pages/Auth/Marvin/Types/models";
import { motion, AnimatePresence } from "framer-motion";

const Index: React.FC = () => {
    const { auth } = usePage<PageProps>().props;
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
    const [ollamaStatus, setOllamaStatus] = useState('online'); // Default to online

    useEffect(() => {
        const channel = window.Echo.channel("marvin-status");

        channel.listen(".Modules\Marvin\Events\OllamaStatusUpdated", (data: { status: string }) => {
            console.log("Ollama status updated:", data.status);
            setOllamaStatus(data.status);
        });

        return () => {
            channel.stopListening(".Modules\Marvin\Events\OllamaStatusUpdated");
            window.Echo.leave("marvin-status");
        };
    }, []);

    const handleOpenChat = () => {
        router.get(route('marvin.messages'), {}, {
            preserveState: true,
            preserveScroll: true,
            onSuccess: (page) => {
                const props = page.props as any;
                setChatMessages(props.marvinMessages as ChatMessage[]);
                setOllamaStatus(props.ollamaStatus as string);
                setIsChatOpen(true);
            },
        });
    };

    return (
        <>
            <Head title="Bem-vindo" />

            <main className="px-6 py-12">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <h1
                            className="text-4xl font-bold mb-4"
                            style={{ color: "#0D0000" }}
                        >
                            Bem-vindo ao Lukisa, {auth.user.username}!
                        </h1>
                        <p className="text-lg" style={{ color: "#737065" }}>
                            Escolha um serviço para começar
                        </p>
                    </div>

                    {/* Services Grid */}
                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Memories Card */}
                        <Link href={route("memo.maps.index")}>
                            <Card
                                className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer group h-64"
                                style={{ backgroundColor: "#BFBAA8" }}
                            >
                                <CardContent className="p-0 h-full relative overflow-hidden">
                                    <div
                                        className="absolute inset-0 bg-gradient-to-br opacity-20"
                                        style={{
                                            backgroundImage:
                                                "linear-gradient(135deg, #403E34 0%, #737065 100%)",
                                        }}
                                    />
                                    <div className="relative z-10 p-8 h-full flex flex-col justify-between">
                                        <div>
                                            <Map
                                                className="w-12 h-12 mb-4 group-hover:scale-110 transition-transform"
                                                style={{ color: "#403E34" }}
                                            />
                                            <h3
                                                className="text-2xl font-bold mb-2"
                                                style={{ color: "#0D0000" }}
                                            >
                                                Memories
                                            </h3>
                                            <p style={{ color: "#737065" }}>
                                                Reviva e compartilhe suas
                                                memórias em um mapa interativo
                                            </p>
                                        </div>
                                        <div
                                            className="flex items-center text-sm font-medium"
                                            style={{ color: "#403E34" }}
                                        >
                                            Acessar Memories
                                            <span className="ml-2 group-hover:translate-x-1 transition-transform">
                                                →
                                            </span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>

                        {/* Homelab Card */}
                        <Card
                            className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer group h-64 relative"
                            style={{ backgroundColor: "#BFBAA8" }}
                        >
                            <CardContent className="p-0 h-full relative overflow-hidden">
                                <div
                                    className="absolute inset-0 bg-gradient-to-br opacity-20"
                                    style={{
                                        backgroundImage:
                                            "linear-gradient(135deg, #737065 0%, #403E34 100%)",
                                    }}
                                />
                                <div className="relative z-10 p-8 h-full flex flex-col justify-between">
                                    <div>
                                        <HardDrive
                                            className="w-12 h-12 mb-4 group-hover:scale-110 transition-transform"
                                            style={{ color: "#403E34" }}
                                        />
                                        <h3
                                            className="text-2xl font-bold mb-2"
                                            style={{ color: "#0D0000" }}
                                        >
                                            PolluxProject
                                        </h3>
                                        <p style={{ color: "#737065" }}>
                                            Seu espaço pessoal para organizar
                                            filmes, séries e arquivos
                                            importantes
                                        </p>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span
                                            className="text-xs px-3 py-1 rounded-full font-medium"
                                            style={{
                                                backgroundColor: "#403E34",
                                                color: "#D9D7C5",
                                            }}
                                        >
                                            Em Breve
                                        </span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Marvin Card */}
                        <div onClick={handleOpenChat}>
                            <Card
                                className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer group h-64 relative"
                                style={{ backgroundColor: "#BFBAA8" }}
                            >
                                <CardContent className="p-0 h-full relative overflow-hidden">
                                    <div
                                        className="absolute inset-0 bg-gradient-to-br opacity-20"
                                        style={{
                                            backgroundImage:
                                                "linear-gradient(135deg, #403E34 0%, #737065 100%)",
                                        }}
                                    />
                                    <div className="relative z-10 p-8 h-full flex flex-col justify-between">
                                        <div>
                                            <Bot
                                                className="w-12 h-12 mb-4 group-hover:scale-110 transition-transform"
                                                style={{ color: "#403E34" }}
                                            />
                                            <h3
                                                className="text-2xl font-bold mb-2"
                                                style={{ color: "#0D0000" }}
                                            >
                                                Marvin
                                            </h3>
                                            <p style={{ color: "#737065" }}>
                                                Seu assistente pessoal de
                                                Inteligência Artificial
                                            </p>
                                        </div>
                                        <div
                                            className="flex items-center text-sm font-medium"
                                            style={{ color: "#403E34" }}
                                        >
                                            Acessar Marvin
                                            <span className="ml-2 group-hover:translate-x-1 transition-transform">
                                                →
                                            </span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
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
                            onClose={() => setIsChatOpen(false)}
                            status={ollamaStatus}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Index;

