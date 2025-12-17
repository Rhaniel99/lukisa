import { useState, useEffect, useCallback, useRef } from "react";
import { router } from "@inertiajs/react";
import { Memory } from "@/Types/Memories";

export function useMemoryFeed(initialMemories: Memory[] = []) {
  const [memories, setMemories] = useState<Memory[]>(initialMemories);
  const prevIdsRef = useRef<string>(initialMemories.map(m => m.id).join(","));

  /**
   * Atualiza uma memória COMPLETA no feed
   * (vinda do servidor ou de qualquer ação)
   */
  const updateMemory = useCallback((updated: Memory) => {
    setMemories(current =>
      current.map(m => (m.id === updated.id ? updated : m))
    );
  }, []);

  /**
   * Atualização otimista (likes, etc)
   */
  const optimisticUpdate = useCallback(
    (id: string, patch: Partial<Memory>) => {
      setMemories(current =>
        current.map(m =>
          m.id === id ? { ...m, ...patch } : m
        )
      );
    },
    []
  );

  /**
   * Sync quando o backend trocar a lista inteira (troca de place)
   */
  useEffect(() => {
    const currentIds = initialMemories.map(m => m.id).join(",");
    if (prevIdsRef.current !== currentIds) {
      setMemories(initialMemories);
      prevIdsRef.current = currentIds;
    }
  }, [initialMemories]);

  /**
   * Like padronizado
   */
  const toggleLike = useCallback(
    (memory: Memory) => {
      const isLiked = memory.liked;

      optimisticUpdate(memory.id, {
        liked: !isLiked,
        likes: isLiked ? memory.likes - 1 : memory.likes + 1,
      });

      router[isLiked ? "delete" : "post"](
        route(isLiked ? "memories.unlike" : "memories.like", memory.id),
        {},
        {
          preserveState: true,
          preserveScroll: true,
          onError: () => updateMemory(memory),
        }
      );
    },
    [optimisticUpdate, updateMemory]
  );

  return {
    memories,
    updateMemory,
    toggleLike,
  };
}
