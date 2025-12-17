// hooks/useLeafletMap.ts
import { useEffect } from "react";
import { useMap } from "react-leaflet";
import { Map as LeafletMap } from "leaflet";

export function useLeafletMap(onMapReady: (map: LeafletMap) => void) {
  const map = useMap();
  useEffect(() => {
    if (map) onMapReady(map);
  }, [map, onMapReady]);
}
