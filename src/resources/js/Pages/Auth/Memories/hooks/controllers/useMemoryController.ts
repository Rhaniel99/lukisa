// hooks/controllers/useMemoryController.ts
import { useEffect, useState } from "react";
import { router } from "@inertiajs/react";
import { Memory } from "@/Types/Memories";

export function useMemoryController(
  memoriesList: Memory[],
  serverDetails?: Memory,
  selectedPlaceId?: string,
  updateMemory?: (m: Memory) => void
) {
  const [activeId, setActiveId] = useState<string | null>(null);

  const activeMemory =
    memoriesList.find(m => m.id === activeId)
    ?? serverDetails
    ?? null;

  /**
   * Sempre que o servidor devolver uma versão mais rica,
   * sincronizamos no feed
   */
  useEffect(() => {
    if (serverDetails && updateMemory) {
      updateMemory(serverDetails);
    }
  }, [serverDetails, updateMemory]);

  const openDetails = (memory: Memory) => {
    setActiveId(memory.id);

    router.visit(route("memo.maps.index"), {
      data: {
        place_id: selectedPlaceId,
        memory_id: memory.id,
        comments_page: 1,
      },
      only: ["selectedMemoryDetails"],
      preserveState: true,
      preserveScroll: true,
    });
  };

  const closeDetails = () => {
    setActiveId(null);

    router.visit(route("memo.maps.index"), {
      data: { place_id: selectedPlaceId },
      only: ["selectedMemoryDetails"],
      preserveState: true,
      preserveScroll: true,
    });
  };

  return {
    activeMemory,
    openDetails,
    closeDetails,
  };
}
