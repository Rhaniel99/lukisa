import { usePage } from "@inertiajs/react";
import { useEffect, useRef, useState, useCallback } from "react";
import { router } from "@inertiajs/react";
import { Memory, PageProps } from "@/Types/models";

type LikeEvent = { id: number; likesCount: number; likers: number[] };
type MemoriesIndexPageProps = PageProps & {
    selectedMemoryDetails?: Memory;
};

export function useMemory(initialMemories: Memory[]) {
    const { props } = usePage<PageProps>();
    const authUserId = props.auth.user.id;

    // --- useMemoryRealtime logic ---
    const [memories, setMemories] = useState<Memory[]>(initialMemories);
    const subscriptions = useRef<
        { channel: any; handler: (e: LikeEvent) => void }[]
    >([]);

    // Sincroniza initialMemories com o estado interno apenas se os IDs mudarem
    useEffect(() => {
        const currentIds = memories
            .map((m) => m.id)
            .sort()
            .join(",");
        const initialIds = initialMemories
            .map((m) => m.id)
            .sort()
            .join(",");

        if (currentIds !== initialIds) {
            setMemories(initialMemories);
        }
    }, [initialMemories]);

    // (Re)inscreve-se só quando a lista de IDs muda
    useEffect(() => {
        const ids = memories.map((m) => m.id);

        subscriptions.current.forEach(({ channel, handler }) =>
            channel.stopListening(".memory.like.updated", handler)
        );
        subscriptions.current = [];

        ids.forEach((id) => {
            const channel = window.Echo.channel(`memories.${id}`);
            const handler = (e: LikeEvent) => {
                setMemories((curr) =>
                    curr.map((m) =>
                        m.id === e.id
                            ? {
                                  ...m,
                                  likes: e.likesCount,
                                  liked: e.likers
                                      .map(String)
                                      .includes(authUserId),
                              }
                            : m
                    )
                );
            };
            channel.listen(".memory.like.updated", handler);
            subscriptions.current.push({ channel, handler });
        });

        return () => {
            subscriptions.current.forEach(({ channel, handler }) =>
                channel.stopListening(".memory.like.updated", handler)
            );
            subscriptions.current = [];
        };
    }, [memories.map((m) => m.id).join(","), authUserId]);

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

    const toggleLike = useCallback(
        (memoryToUpdate: Memory) => {
            const originalMemories = [...memories];
            const originalSelectedMemory = selectedMemory
                ? { ...selectedMemory }
                : null;

            // Atualiza a lista principal de memórias
            const updatedMemories = memories.map((m) =>
                m.id === memoryToUpdate.id
                    ? {
                          ...m,
                          liked: !m.liked,
                          likes: m.liked ? m.likes - 1 : m.likes + 1,
                      }
                    : m
            );
            setMemories(updatedMemories);

            // Se a memória no modal for a mesma, atualiza o estado dela também
            if (selectedMemory && selectedMemory.id === memoryToUpdate.id) {
                setSelectedMemory((prev) =>
                    prev
                        ? {
                              ...prev,
                              liked: !prev.liked,
                              likes: prev.liked
                                  ? prev.likes - 1
                                  : prev.likes + 1,
                          }
                        : null
                );
            }

            const routeName = memoryToUpdate.liked
                ? "memories.unlike"
                : "memories.like";
            const method = memoryToUpdate.liked ? "delete" : "post";

            router[method](
                route(routeName, memoryToUpdate.id),
                {},
                {
                    preserveScroll: true,
                    preserveState: true,
                    onError: () => {
                        // Reverte ambos os estados em caso de erro
                        setMemories(originalMemories);
                        if (originalSelectedMemory) {
                            setSelectedMemory(originalSelectedMemory);
                        }
                    },
                }
            );
        },
        [memories, selectedMemory]
    );

    return {
        memories,
        selectedMemory,
        openMemoryDetailModal,
        closeMemoryDetailModal,
        toggleLike, // Exporta a nova função
    };
}
