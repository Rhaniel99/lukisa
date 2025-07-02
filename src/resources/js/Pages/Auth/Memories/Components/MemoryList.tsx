import React from "react";
import { router } from "@inertiajs/react";
import { Memory } from "@/Types/models";
import { useMemoryRealtime } from "@/Hooks/useMemoryRealtime";
import { MemoryCard } from "@/Components/Dump/MemoryCard";

interface MemoryListProps {
    isLoading: boolean;
    initialMemories: Memory[];
    onMemorySelect: (memory: Memory) => void;
}

const handleDelete = (e: React.MouseEvent, memoryId: number) => {
    e.stopPropagation();
    if (window.confirm("Tem certeza de que deseja remover esta memória?")) {
        router.delete(route("memo.maps.destroy", memoryId), {
            preserveScroll: true,
        });
    }
};

const handleLikeRequest = (memory: Memory) => {
    const routeName = memory.liked ? "memories.unlike" : "memories.like";
    const method = memory.liked ? "delete" : "post";
    router[method](route(routeName, memory.id), { preserveScroll: true });
};

export const MemoryList: React.FC<MemoryListProps> = ({
    isLoading,
    initialMemories,
    onMemorySelect,
}) => {
    const { memories, setMemories } = useMemoryRealtime(initialMemories);

    const handleOptimisticLike = (memoryToUpdate: Memory) => {
        setMemories((currentMemories) =>
            currentMemories.map((mem) =>
                mem.id === memoryToUpdate.id
                    ? {
                          ...mem,
                          liked: !mem.liked,
                          likes: mem.liked ? mem.likes - 1 : mem.likes + 1,
                      }
                    : mem
            )
        );
        handleLikeRequest(memoryToUpdate);
    };

    if (isLoading) {
        return (
            <div className="p-8 text-center text-slate-500">
                <p>Carregando memórias...</p>
            </div>
        );
    }

    if (memories.length === 0) {
        return (
            <div className="p-8 text-center text-slate-500">
                <p>Nenhuma memória encontrada neste local.</p>
                <p className="text-sm">Seja o primeiro a criar uma!</p>
            </div>
        );
    }

    return (
        <div className="space-y-4 p-4">
            {memories.map((memory) => (
                <MemoryCard
                    key={memory.id}
                    memory={memory}
                    onSelect={onMemorySelect}
                    onLike={handleOptimisticLike}
                    onDelete={handleDelete}
                />
            ))}
        </div>
    );
};
