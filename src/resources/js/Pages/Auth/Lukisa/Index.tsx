import { Head, router } from "@inertiajs/react";
import { useAuth } from "@/Hooks/useAuth";
import { MapPin, Wallet, MessageCircle } from "lucide-react";
import { Header } from "./components/Header";
import { ModulesGrid } from "./components/card/ModuleGrid";
import { ModuleCard } from "./components/card/ModuleCard";
import { useMarvinChat } from "./hooks/useMarvinChat";
import { MarvinModal } from "./components/modal/MarvinModal";

export default function Index() {
    const { username } = useAuth();

    const { isChatOpen, chatMessages, ollamaStatus, openChat, closeChat, sendMessage } = useMarvinChat();

    return (
        <>
            <Head title="Bem vindo" />

            <Header
                title="Escolha onde deseja continuar"
                subtitle={`Bem-vindo de volta, ${username}.`}
            />

            <ModulesGrid>
                <ModuleCard
                    icon={MapPin}
                    title="Memories"
                    description="Explore e compartilhe suas lembranças em um mapa interativo."
                    buttonText="Acessar"
                    delay={0.1}
                    onClick={() => router.get("/memories")}
                />

                <ModuleCard
                    icon={Wallet}
                    title="Phamani"
                    description="Gerencie suas finanças pessoais com clareza."
                    buttonText="Acessar"
                    delay={0.2}
                    onClick={() => router.get("/phamani")}
                />

                <ModuleCard
                    icon={MessageCircle}
                    title="Marvin"
                    description="Converse com seu assistente inteligente."
                    buttonText="Conversar"
                    delay={0.3}
                    onClick={openChat}
                />
            </ModulesGrid>

            <MarvinModal
                isOpen={isChatOpen}
                onClose={closeChat}
                messages={chatMessages}
                status={ollamaStatus}
                onSendMessage={sendMessage}
            />
        </>
    );
}
