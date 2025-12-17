import { router } from "@inertiajs/react";

export function usePlaceMemories() {
  const loadPlaceMemories = (placeId: string, onFinish?: () => void) => {
    router.visit(route("memo.maps.index"), {
      data: { place_id: placeId },
      only: ["selectedPlaceMemories"],
      preserveState: true,
      preserveScroll: true,
      onFinish,
    });
  };

  return { loadPlaceMemories };
}
