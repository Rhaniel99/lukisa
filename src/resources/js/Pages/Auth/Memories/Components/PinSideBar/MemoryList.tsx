import React from "react";
import { router } from "@inertiajs/react";
import { Memory } from "@/Types/models";
import { MemoryCard } from "@/Pages/Auth/Memories/Components/MemoryCard";

interface MemoryListProps {
    isLoading: boolean;
    memories: Memory[]; // Recebe as memórias diretamente
    onMemorySelect: (memory: Memory) => void;
    onLike: (memory: Memory) => void; // Recebe a função de like
}

const handleDelete = (e: React.MouseEvent, memoryId: number) => {
    e.stopPropagation();
    if (window.confirm("Tem certeza de que deseja remover esta memória?")) {
        router.delete(route("memo.maps.destroy", memoryId), {
            preserveScroll: true,
        });
    }
};

const handleEditMemory = (e: React.MouseEvent, memoryId: number) => {
    e.stopPropagation();
    console.log('clicou em editar');
    // if (window.confirm("Tem certeza de que deseja remover esta memória?")) {
    //     router.delete(route("memo.maps.destroy", memoryId), {
    //         preserveScroll: true,
    //     });
    // }
};

export const MemoryList: React.FC<MemoryListProps> = ({
    isLoading,
    memories, // Usa as memórias recebidas
    onMemorySelect,
    onLike, // Usa a função de like recebida
}) => {
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
                    onLike={onLike} // Passa a função de like para o card
                    onDelete={handleDelete}
                    onEdit={handleEditMemory}   // <-- sua nova função de edit
                />
            ))}
        </div>
    );
};
