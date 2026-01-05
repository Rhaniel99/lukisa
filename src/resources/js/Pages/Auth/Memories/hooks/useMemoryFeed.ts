import { useState, useEffect, useCallback, useRef } from "react";
import { router } from "@inertiajs/react";
import { Memory } from "@/Types/Memories";
import { useMemoryRealtime } from "./useMemoryRealtime";

export function useMemoryFeed(initialMemories: Memory[] = []) {
  const [memories, setMemories] = useState<Memory[]>(initialMemories);
  const prevIdsRef = useRef<string>("");

  const memoryIds = memories.map(m => m.id);

  /**
   * ✅ Atualiza memória COMPLETA
   * (HTTP, Inertia, comentários, detalhes)
   */
  const updateMemory = useCallback((updated: Memory) => {
    setMemories(current =>
      current.map(m => (m.id === updated.id ? updated : m))
    );
  }, []);

  /**
   * ✅ Patch parcial vindo do Realtime
   */
  const applyLikeUpdate = useCallback(
    (id: string, likes: number, liked: boolean) => {
      setMemories(current =>
        current.map(m =>
          m.id === id ? { ...m, likes, liked } : m
        )
      );
    },
    []
  );

  const applyCommentCountUpdate = useCallback(
    (id: string, commentsCount: number) => {
      setMemories(prev =>
        prev.map(m =>
          m.id === id
            ? { ...m, comments_count: commentsCount }
            : m
        )
      );
    },
    []
  );


  /**
   * 🔌 Realtime (likes)
   */
  useMemoryRealtime(
    memories.map(m => m.id),
    applyLikeUpdate,
    applyCommentCountUpdate
  );

  /**
   * Sync ao trocar de place
   */
  useEffect(() => {
    const ids = initialMemories.map(m => m.id).join(",");
    if (prevIdsRef.current !== ids) {
      setMemories(initialMemories);
      prevIdsRef.current = ids;
    }
  }, [initialMemories]);

  /**
   * ❤️ Like otimista
   */
  const toggleLike = useCallback(
    (memory: Memory) => {
      const isLiked = memory.liked;

      // otimista
      setMemories(current =>
        current.map(m =>
          m.id === memory.id
            ? {
              ...m,
              liked: !isLiked,
              likes: isLiked ? m.likes - 1 : m.likes + 1,
            }
            : m
        )
      );

      router[isLiked ? "delete" : "post"](
        route(isLiked ? "memories.unlike" : "memories.like", memory.id),
        {},
        {
          preserveState: true,
          preserveScroll: true,
          onError: () => {
            // rollback seguro
            updateMemory(memory);
          },
        }
      );
    },
    [updateMemory]
  );

  return {
    memories,
    toggleLike,
    updateMemory, // 👈 continua existindo
  };
}
