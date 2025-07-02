import { useState, useEffect } from "react";
import { Memory } from "@/Types/models";

type LikeEvent = {
    id: number;
    likesCount: number;
};

export function useMemoryRealtime(initialMemories: Memory[]) {
    const [memories, setMemories] = useState<Memory[]>(initialMemories);

    // Efeito para sincronizar o estado com as props que vêm do Inertia
    useEffect(() => {
        setMemories(initialMemories);
    }, [initialMemories]);

    // Efeito para escutar eventos de broadcast do Echo
    useEffect(() => {
        // Não faz nada se não houver memórias para escutar
        if (memories.length === 0) {
            return;
        }

        memories.forEach((memory) => {
            const channelName = `memories.${memory.id}`;
            window.Echo.channel(channelName).listen(
                ".memory.like.updated",
                (event: LikeEvent) => {
                    setMemories((currentMemories) =>
                        currentMemories.map((m) =>
                            m.id === event.id
                                ? { ...m, likes: event.likesCount }
                                : m
                        )
                    );
                }
            );
        });

        // Função de limpeza para sair dos canais
        return () => {
            memories.forEach((memory) => {
                window.Echo.leave(`memories.${memory.id}`);
            });
        };
    }, [memories.map((m) => m.id).join(",")]); // Dependência otimizada

    return { memories, setMemories };
}
