import React from "react";
import { LatLng } from "leaflet";
import { Place } from "@/Types/models";
import MapSearchField from "./MapSearchField";
import MapPlaceMarker from "./MapPlaceMarker";
import { MapClick } from "./MapClick";

interface MapLayersProps {
    places: Place[];
    onPlaceClick: (place: Place) => void;
    onMapClick: (latlng: LatLng) => void;
}

export const MapLayers: React.FC<MapLayersProps> = ({
    places,
    onPlaceClick,
    onMapClick,
}) => (
    <>
        {/* Campo de busca geocoding */}
        <MapSearchField />

        {/* Todos os pins/lugares */}
        {places.map((place) => (
            <MapPlaceMarker
                key={place.id}
                place={place}
                onPlaceClick={onPlaceClick}
            />
        ))}

        {/* Handler de clique no mapa */}
        <MapClick onMapClick={onMapClick} />
    </>
);
