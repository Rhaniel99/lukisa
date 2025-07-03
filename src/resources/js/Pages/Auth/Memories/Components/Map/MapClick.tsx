import { useMapEvents } from "react-leaflet";
import { LatLng } from "leaflet";
import React from "react";

export const MapClick: React.FC<{
    onMapClick: (latlng: LatLng) => void;
}> = ({ onMapClick }) => {
    // Registra o listener de clique no mapa
    useMapEvents({ click: (e) => onMapClick(e.latlng) });
    return null;
};
