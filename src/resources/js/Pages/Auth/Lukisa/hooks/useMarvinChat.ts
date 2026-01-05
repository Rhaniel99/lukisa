import { useEffect, useState } from 'react'
import { router, usePage } from '@inertiajs/react'
import { PageProps } from '@/Types/models'
import { ChatMessage } from '@/Types/Marvin'
import { marvinUserChannel } from '@/Pages/Auth/Lukisa/services/marvinChannel'

export function useMarvinChat() {
    const { auth, ollamaStatus: initialOllamaStatus } =
        usePage<PageProps>().props

    const [isChatOpen, setIsChatOpen] = useState(false)
    const [chatMessages, setChatMessages] = useState<ChatMessage[]>([])
    const [ollamaStatus, setOllamaStatus] = useState(
        typeof initialOllamaStatus === 'string'
            ? initialOllamaStatus
            : 'online'
    )

    useEffect(() => {
        if (!auth.user) return

        const channel = marvinUserChannel(auth.user.id)

        channel
            .listen('.marvin.new-message', ({ message }: { message: ChatMessage }) => {
                setChatMessages(current => {
                    // remove "assistant-thinking" antes de adicionar resposta real
                    const cleaned = current.filter(
                        m => m.role !== 'assistant-thinking'
                    )
                    return [...cleaned, message]
                })
            })
            .listen('.marvin.status-updated', ({ status }: { status: string }) => {
                setOllamaStatus(status)
            })

        return () => {
            channel.unsubscribe()
        }
    }, [auth.user?.id])

    const openChat = () => {
        router.get(
            route('marvin.messages'),
            {},
            {
                preserveState: true,
                preserveScroll: true,
                only: ['marvinMessages', 'ollamaStatus'],
                onSuccess: page => {
                    const props = page.props as any
                    setChatMessages(props.marvinMessages ?? [])
                    setOllamaStatus(props.ollamaStatus ?? 'online')
                    setIsChatOpen(true)
                },
            }
        )
    }

    const closeChat = () => setIsChatOpen(false)

    const sendMessage = (prompt: string) => {
        if (!prompt.trim() || !auth.user) return

        const now = new Date().toISOString()

        const optimisticUserMessage: ChatMessage = {
            id: `temp-${Date.now()}`,
            role: 'user',
            content: prompt,
            created_at: now,
            updated_at: now,
            user_id: auth.user.id.toString(),
        }

        const optimisticThinkingMessage: ChatMessage = {
            id: `temp-thinking-${Date.now()}`,
            role: 'assistant-thinking',
            content: '...',
            created_at: now,
            updated_at: now,
            user_id: auth.user.id.toString(),
        }

        setChatMessages(current => [
            ...current,
            optimisticUserMessage,
            optimisticThinkingMessage,
        ])

        router.post(
            route('marvin.ask'),
            { prompt },
            {
                preserveState: true,
                preserveScroll: true,
                async: true, // evita progress bar
            }
        )
    }

    return {
        isChatOpen,
        chatMessages,
        ollamaStatus,
        openChat,
        closeChat,
        sendMessage,
    }
}
