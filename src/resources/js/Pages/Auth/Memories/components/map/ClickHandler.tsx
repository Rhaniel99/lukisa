import { useMapEvents } from "react-leaflet";
import { LatLng } from "leaflet";

interface MapClickHandlerProps {
  onClick: (coords: LatLng) => void;
}

export function ClickHandler({ onClick }: MapClickHandlerProps) {
  useMapEvents({
    click(e) {
      const target = e.originalEvent.target as HTMLElement;

      // Evita abrir o modal se clicou em botões/overlays
      if (target.closest("button") || target.closest(".no-map-click")) {
        return;
      }

      onClick(e.latlng);
    },
  });

  return null;
}
