import { useState, useEffect } from 'react';
import { router, usePage } from '@inertiajs/react';
import { PageProps } from '@/Types/models';
import { ChatMessage } from '@/Pages/Auth/Marvin/Types/models';

export function useMarvinChat() {
    const { auth, ollamaStatus: initialOllamaStatus } = usePage<PageProps>().props;
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
    const [ollamaStatus, setOllamaStatus] = useState(
        typeof initialOllamaStatus === 'string' ? initialOllamaStatus : 'online'
    );

    // Listener para o status global do Ollama
    useEffect(() => {
        const channel = window.Echo.channel("marvin-status");
        channel.listen(".Modules\Marvin\Events\OllamaStatusUpdated", (data: { status: string }) => {
            setOllamaStatus(data.status);
        });

        return () => {
            channel.stopListening(".Modules\Marvin\Events\OllamaStatusUpdated");
            window.Echo.leave("marvin-status");
        };
    }, []);

    // Listener para novas mensagens do Marvin para o usuário atual
    useEffect(() => {
        if (!auth.user) return;

        const privateChannel = window.Echo.private(`marvin.user.${auth.user.id}`);
        privateChannel.listen('.marvin.new-message', (data: { message: ChatMessage }) => {
            setChatMessages(currentMessages => {
                // Remove o placeholder "thinking"
                const filteredMessages = currentMessages.filter(m => m.role !== 'assistant-thinking');
                // Adiciona a nova mensagem real
                return [...filteredMessages, data.message];
            });
        });

        return () => {
            privateChannel.stopListening('.Modules\Marvin\Events\NewMarvinMessageReceived');
            window.Echo.leave(`marvin.user.${auth.user.id}`);
        };
    }, [auth.user]);


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

    const sendMessage = (prompt: string) => {
        if (!prompt.trim()) return;

        // Otimização: Adiciona a mensagem do usuário e o placeholder de "pensando" imediatamente
        const optimisticUserMessage: ChatMessage = {
            id: `temp-${Date.now()}`,
            role: 'user',
            content: prompt,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            user_id: auth.user.id.toString(),
        };
        const optimisticThinkingMessage: ChatMessage = {
            id: `temp-thinking-${Date.now()}`,
            role: 'assistant-thinking',
            content: '...',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            user_id: auth.user.id.toString(),
        };

        setChatMessages(current => [...current, optimisticUserMessage, optimisticThinkingMessage]);

        // Envia a pergunta para o backend em segundo plano
        router.post(route('marvin.ask'), { prompt }, {
            preserveState: true,
            preserveScroll: true,
            // Não precisamos fazer nada no onSuccess, pois a resposta virá pelo Reverb
        });
    };

    return {
        isChatOpen,
        chatMessages,
        ollamaStatus,
        openChat,
        closeChat,
        sendMessage,
    };
}
