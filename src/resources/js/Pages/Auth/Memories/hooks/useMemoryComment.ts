// hooks/useMemoryComments.ts
import { useEffect, useState, useRef, useCallback } from "react";
import { router } from "@inertiajs/react";
import { Memory, MemoryComment } from "@/Types/Memories";

export function useMemoryComments(memory: Memory | null) {
  const [comments, setComments] = useState<MemoryComment[]>([]);
  const [loading, setLoading] = useState(false);

  const currentMemoryIdRef = useRef<string | null>(null);

  const hasMore =
    !!memory &&
    (memory.comments_current_page ?? 1) < (memory.comments_last_page ?? 1);

  /**
   * 🔁 Sincronização entre props (Inertia) e estado local
   */
  useEffect(() => {
    if (!memory) {
      setComments([]);
      currentMemoryIdRef.current = null;
      return;
    }

    const isNewMemory = currentMemoryIdRef.current !== memory.id;
    const isPageOne = (memory.comments_current_page ?? 1) === 1;
    const serverComments = memory.comments ?? [];

    // 🆕 Abriu outra memória
    if (isNewMemory) {
      setComments(serverComments);
      currentMemoryIdRef.current = memory.id;
      return;
    }

    // 🧠 MESMA memória + retorno da página 1 (ex: novo comentário)
    if (isPageOne) {
      setComments(prev => {
        const serverIds = new Set(serverComments.map(c => c.id));

        // Page 1 SEMPRE no topo
        const merged = [...serverComments];

        // Preserva páginas antigas já carregadas
        for (const c of prev) {
          if (!serverIds.has(c.id)) {
            merged.push(c);
          }
        }

        return merged;
      });
    }
  }, [
    memory?.id,
    memory?.comments,
    memory?.comments_current_page,
  ]);

  /**
   * ➕ Load more
   */
  const loadMore = useCallback(() => {
    if (!memory || !hasMore || loading) return;

    setLoading(true);

    router.visit(route("memo.maps.index"), {
      data: {
        memory_id: memory.id,
        comments_page: (memory.comments_current_page ?? 1) + 1,
      },
      only: ["selectedMemoryDetails"],
      preserveState: true,
      preserveScroll: true,
      onSuccess: (page) => {
        const updated = page.props.selectedMemoryDetails as Memory | undefined;

        if (updated && updated.id === currentMemoryIdRef.current) {
          setComments(prev => {
            const existingIds = new Set(prev.map(c => c.id));
            const newOnes = updated.comments.filter(c => !existingIds.has(c.id));
            return [...prev, ...newOnes];
          });
        }
      },
      onFinish: () => setLoading(false),
    });
  }, [memory, hasMore, loading]);

  return {
    comments,
    hasMore,
    loading,
    loadMore,
  };
}
