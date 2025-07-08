import { useEffect, useRef, useState, useCallback } from 'react';
import { router } from '@inertiajs/react';
import { Memory, PageProps } from '@/Types/models';

type LikeEvent = { id: number; likesCount: number };
type MemoriesIndexPageProps = PageProps & {
    selectedMemoryDetails?: Memory;
};

export function useMemory(initialMemories: Memory[]) {
    // --- useMemoryRealtime logic ---
    const [memories, setMemories] = useState<Memory[]>(initialMemories);
    const subscriptions = useRef<{ channel: any; handler: (e: LikeEvent) => void }[]>([]);

    // Sincroniza initialMemories com o estado interno apenas se os IDs mudarem
    useEffect(() => {
        const currentIds = memories.map(m => m.id).sort().join(',');
        const initialIds = initialMemories.map(m => m.id).sort().join(',');

        if (currentIds !== initialIds) {
            setMemories(initialMemories);
        }
    }, [initialMemories]);

    // (Re)inscreve-se só quando a lista de IDs muda
    useEffect(() => {
        const ids = memories.map(m => m.id);

        // evita repetir handlers: sai de todos os canais antigos
        subscriptions.current.forEach(({ channel, handler }) =>
            channel.stopListening('.memory.like.updated', handler)
        );
        subscriptions.current = [];

        ids.forEach(id => {
            const channel = window.Echo.channel(`memories.${id}`);
            const handler = (e: LikeEvent) => {
                setMemories(curr =>
                    curr.map(m => (m.id === e.id ? { ...m, likes: e.likesCount } : m))
                );
            };
            channel.listen('.memory.like.updated', handler);
            subscriptions.current.push({ channel, handler });
        });

        // cleanup ao desmontar
        return () => {
            subscriptions.current.forEach(({ channel, handler }) =>
                channel.stopListening('.memory.like.updated', handler)
            );
            subscriptions.current = [];
        };
    }, [memories.map(m => m.id).join(',')]);

    // --- useMemoryDetailModal logic ---
    const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null);

    const openMemoryDetailModal = useCallback((memoryToOpen: Memory) => {
        const params = new URLSearchParams(window.location.search);
        const placeId = params.get("place_id");

        const newParams: { [key: string]: any } = {
            memory_id: memoryToOpen.id,
            comments_page: 1,
        };
        if (placeId) {
            newParams.place_id = placeId;
        }

        router.get(route("memo.maps.index"), newParams, {
            only: ["selectedMemoryDetails"],
            preserveState: true,
            preserveScroll: true,
            replace: true,
            onSuccess: (page) => {
                const props = page.props as unknown as MemoriesIndexPageProps;
                if (props.selectedMemoryDetails) {
                    setSelectedMemory(props.selectedMemoryDetails);
                }
            },
        });
    }, []);

    const closeMemoryDetailModal = useCallback(() => {
        setSelectedMemory(null);
    }, []);

    return {
        memories,
        setMemories, // Export setMemories for optimistic updates
        selectedMemory,
        openMemoryDetailModal,
        closeMemoryDetailModal,
    };
}
