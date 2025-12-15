import { useState, useEffect, useCallback, useRef } from "react";
import { router } from "@inertiajs/react";
import { Memory } from "@/Types/Memories";

export function useMemoryFeed(initialMemories: Memory[] = []) {
  const [memories, setMemories] = useState<Memory[]>(initialMemories);
  
  // Ref para guardar os IDs da última atualização e evitar loop
  const prevIdsRef = useRef<string>("");

  useEffect(() => {
    // Cria uma "impressão digital" dos dados atuais (ex: "1,2,5")
    const currentIds = initialMemories.map((m) => m.id).join(",");

    // Só atualiza o estado se a lista de IDs mudou
    if (prevIdsRef.current !== currentIds) {
      setMemories(initialMemories);
      prevIdsRef.current = currentIds;
    }
  }, [initialMemories]);

  const toggleLike = useCallback((memory: Memory) => {
    const previousMemories = [...memories];

    setMemories((currentMemories) =>
      currentMemories.map((m) => {
        if (m.id === memory.id) {
          const isLiked = m.liked;
          return {
            ...m,
            liked: !isLiked,
            likes: isLiked ? m.likes - 1 : m.likes + 1,
          };
        }
        return m;
      })
    );

    const routeName = memory.liked ? "memories.unlike" : "memories.like"; 
    const method = memory.liked ? "delete" : "post";

    router[method](
      route(routeName, memory.id),
      {},
      {
        preserveScroll: true,
        preserveState: true,
        onError: () => {
          setMemories(previousMemories);
          console.error("Erro ao processar like");
        },
      }
    );
  }, [memories]);

  return {
    memories,
    setMemories,
    toggleLike,
  };
}