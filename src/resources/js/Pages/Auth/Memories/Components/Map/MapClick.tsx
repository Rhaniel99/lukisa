import { useMapEvents } from "react-leaflet";
import { LatLng, LeafletMouseEvent } from "leaflet";
import React from "react";

export const MapClick: React.FC<{
    onMapClick: (latlng: LatLng) => void;
}> = ({ onMapClick }) => {
    useMapEvents({
        click: (e: LeafletMouseEvent) => {
            // Verifica se o clique foi originado de um elemento de botão.
            // Se for, ignora o evento para não abrir o modal.
            const target = e.originalEvent.target as HTMLElement;
            if (target.closest("button")) {
                return;
            }

            onMapClick(e.latlng);
        },
    });

    return null;
};
