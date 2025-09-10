import { useState, useEffect } from 'react';
import { router, usePage } from '@inertiajs/react';
import { PageProps } from '@/Types/models';
import { ChatMessage } from '@/Pages/Auth/Marvin/Types/models';

export function useMarvinChat() {
    const { ollamaStatus: initialOllamaStatus } = usePage<PageProps>().props;
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
    const [ollamaStatus, setOllamaStatus] = useState(
        typeof initialOllamaStatus === 'string' ? initialOllamaStatus : 'online'
    );

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

    const openChat = () => {
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

    const closeChat = () => setIsChatOpen(false);

    return {
        isChatOpen,
        chatMessages,
        ollamaStatus,
        openChat,
        closeChat,
    };
}
