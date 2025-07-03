import { useState } from 'react';
import { router } from '@inertiajs/react';
import { Memory, PageProps } from '@/Types/models';

type MemoriesIndexPageProps = PageProps & {
    selectedMemoryDetails?: Memory;
};

export const useMemoryDetailModal = () => {
    const [memory, setMemory] = useState<Memory | null>(null);

    const open = (memoryToOpen: Memory) => {
        // Usamos um partial reload para buscar os detalhes completos da memória
        router.reload({
            only: ['selectedMemoryDetails'],
            data: { memory_id: memoryToOpen.id },
            onSuccess: (page) => {
                // CORREÇÃO: Usamos a dupla asserção para resolver o erro de tipo.
                const props = page.props as unknown as MemoriesIndexPageProps;

                // Verificamos se a prop realmente veio antes de usá-la.
                if (props.selectedMemoryDetails) {
                    setMemory(props.selectedMemoryDetails);
                }
            },
        });
    };

    const close = () => {
        setMemory(null);
    };

    return {
        memory,
        open,
        close,
    };
};
