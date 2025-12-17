import { Map as LeafletMap } from "leaflet";
import { useLeafletMap } from "@/Pages/Auth/Memories/hooks/useLeaflet";

export function MapSetter({ onMap }: { onMap: (m: LeafletMap) => void }) {
  useLeafletMap(onMap);
  return null;
}