import { useState } from 'react';
import { router } from '@inertiajs/react';
import { Memory, PageProps } from '@/Types/models';

type MemoriesIndexPageProps = PageProps & {
    selectedMemoryDetails?: Memory;
};

export const useMemoryDetailModal = () => {
    const [memory, setMemory] = useState<Memory | null>(null);

    const open = (memoryToOpen: Memory) => {
        // Obtém os parâmetros atuais da URL para preservar o `place_id`.
        const params = new URLSearchParams(window.location.search);
        const placeId = params.get("place_id");

        // Monta os novos parâmetros de forma explícita, garantindo que a página de comentários seja 1.
        const newParams: { [key: string]: any } = {
            memory_id: memoryToOpen.id,
            comments_page: 1, // <-- Reseta a paginação
        };
        if (placeId) {
            newParams.place_id = placeId;
        }

        // Usa `router.get` para ter controle total sobre os parâmetros enviados.
        router.get(route("memo.maps.index"), newParams, {
            only: ["selectedMemoryDetails"],
            preserveState: true,
            preserveScroll: true,
            replace: true, // Evita adicionar entradas desnecessárias ao histórico do navegador.
            onSuccess: (page) => {
                const props = page.props as unknown as MemoriesIndexPageProps;
                if (props.selectedMemoryDetails) {
                    setMemory(props.selectedMemoryDetails);
                }
            },
        });
    };

    const close = () => {
        // A limpeza da URL não é mais necessária aqui, simplificando a função.
        setMemory(null);
    };

    return {
        memory,
        open,
        close,
    };
};