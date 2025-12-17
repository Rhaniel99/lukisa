// hooks/useMemoryComments.ts
import { useEffect, useState, useRef, useCallback } from "react";
import { router } from "@inertiajs/react";
import { Memory, MemoryComment } from "@/Types/Memories";
import { useMemoriesUI } from "../contexts/MemoriesUIContext";

export function useMemoryComments(memory: Memory | null) {
  const { selectedPlace } = useMemoriesUI();
  const placeId = selectedPlace?.id;

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
        // Converte IDs para String para garantir comparação segura (evita bug de number vs string)
        const serverIds = new Set(serverComments.map(c => String(c.id)));

        // Page 1 SEMPRE no topo (contém os comentários mais recentes retornados pelo server)
        const merged = [...serverComments];

        // Preserva comentários de páginas antigas (2, 3...) que já estavam carregados
        for (const c of prev) {
          // Se o ID do comentário antigo NÃO está na nova leva do servidor, mantemos ele
          if (!serverIds.has(String(c.id))) {
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
        place_id: placeId, // <--- Mantém o ID do lugar na URL (vindo do Contexto)
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
            const existingIds = new Set(prev.map(c => String(c.id)));
            const newOnes = updated.comments.filter(c => !existingIds.has(String(c.id)));
            return [...prev, ...newOnes];
          });
        }
      },
      onFinish: () => setLoading(false),
    });
  }, [memory, hasMore, loading, placeId]);

  return {
    comments,
    hasMore,
    loading,
    loadMore,
  };
}