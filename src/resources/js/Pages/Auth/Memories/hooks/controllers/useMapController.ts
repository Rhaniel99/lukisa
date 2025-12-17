// hooks/controllers/useMapController.ts
import { useState } from "react";
import { LatLng, Map as LeafletMap } from "leaflet";
import { Place } from "@/Types/Memories";
import { hereService } from "@/Pages/Auth/Memories/services/here.service";

export type SearchResult =
    | { type: "existing"; place: Place }
    | { type: "temp"; label?: string };

export function useMapController(apiKey: string, places: Place[]) {
    const [map, setMap] = useState<LeafletMap | null>(null);
    const zoomIn = () => map?.zoomIn();
    const zoomOut = () => map?.zoomOut();

    const locateUser = () => {
        if (!map) return;

        navigator.geolocation.getCurrentPosition(
            (pos) => {
                const { latitude, longitude } = pos.coords;
                map.flyTo([latitude, longitude], 16, { animate: true });
            },
            () => alert("Não foi possível obter a localização.")
        );
    };

    // Pin temporário / criação
    const [tempPin, setTempPin] = useState<{ lat: number; lng: number; label: string } | null>(null);
    const [createCoords, setCreateCoords] = useState<LatLng | null>(null);
    const [createPlaceMeta, setCreatePlaceMeta] = useState<{ name: string | null; address: string | null } | null>(null);

    const handleMapClick = async (coords: LatLng) => {
        setTempPin(null);
        const info = await hereService.getPlaceInfo(coords.lat, coords.lng, apiKey);
        setCreateCoords(coords);
        setCreatePlaceMeta(info);
        // Note: UI (modal open) is controlled by the parent component
    };

    const handleSearchSelect = (lat: number, lng: number, label: string): SearchResult => {
        const threshold = 0.0005;
        const existing = places.find(
            (p) =>
                Math.abs(p.latitude - lat) < threshold &&
                Math.abs(p.longitude - lng) < threshold
        );

        if (existing) {
            return { type: "existing", place: existing };
        }

        setTempPin({ lat, lng, label });
        return { type: "temp" };
    };

    const prepareCreateFromPlace = (place: Place) => {
        setCreateCoords(new LatLng(place.latitude, place.longitude));
        setCreatePlaceMeta({ name: place.name, address: "" });
    };

    const clearCreation = () => {
        setCreateCoords(null);
        setCreatePlaceMeta(null);
        setTempPin(null);
    };

    const confirmTempPin = () => {
        if (!tempPin) return;

        setCreateCoords(new LatLng(tempPin.lat, tempPin.lng));
        setCreatePlaceMeta({ name: tempPin.label, address: "" });
        setTempPin(null);
    };

    return {
        // map
        map,
        setMap,
        zoomIn,
        zoomOut,
        locateUser,

        // temp & create
        tempPin,
        confirmTempPin,
        setTempPin,

        createCoords,
        setCreateCoords,
        createPlaceMeta,
        setCreatePlaceMeta,

        // actions
        handleMapClick,
        handleSearchSelect,
        prepareCreateFromPlace,
        clearCreation,
    } as const;
}
