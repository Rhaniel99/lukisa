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

    // Listener para todos os eventos do Marvin no canal privado do usuário
    useEffect(() => {
        if (!auth.user) return;

        console.log(`Subscribing to private channel: marvin.user.${auth.user.id}`)
        const privateChannel = window.Echo.private(`marvin.user.${auth.user.id}`);

        privateChannel
            .on('subscription_succeeded', () => {
                console.log('Successfully subscribed to private channel!');
            })
            .on('subscription_error', (error: any) => {
                console.error('Private channel subscription failed:', error);
            })
            .listen('.marvin.new-message', (data: { message: ChatMessage }) => {
                console.log('%c[REVERB] Received marvin.new-message:', 'color: #007ACC; font-weight: bold;', data);
                setChatMessages(currentMessages => {
                    const filteredMessages = currentMessages.filter(m => m.role !== 'assistant-thinking');
                    return [...filteredMessages, data.message];
                });
            })
            .listen('.marvin.status-updated', (data: { status: string }) => {
                console.log('%c[REVERB] Received marvin.status-updated:', 'color: #881391; font-weight: bold;', data);
                setOllamaStatus(data.status);
            });

        return () => {
            console.log('Leaving private channel');
            privateChannel.stopListening('.marvin.new-message');
            privateChannel.stopListening('.marvin.status-updated');
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
