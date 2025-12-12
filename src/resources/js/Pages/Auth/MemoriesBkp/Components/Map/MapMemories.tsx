// Em: resources/js/Pages/Auth/Memories/Components/Map/MapMemories.tsx

import React from "react";
import { LatLng, LatLngExpression } from "leaflet";
import { Place } from "@/Types/models";
import { HereMap } from "./HereMap";
import MapSearchField from "./MapSearchField";
import MapPlaceMarker from "./MapPlaceMarker";
import { MapClick } from "./MapClick";

interface MapMemoriesProps {
    places: Place[];
    initialPosition: LatLngExpression;
    onMapClick: (latlng: LatLng) => void;
    onPlaceClick: (place: Place) => void;
    children?: React.ReactNode;
}

const MapMemories: React.FC<MapMemoriesProps> = ({
    places,
    onPlaceClick,
    initialPosition,
    onMapClick,
    children,
}) => (
    <div className="relative z-0 h-full w-full">
        <HereMap center={initialPosition}>
            {/* Layers do mapa */}
            <MapSearchField />
            {places.map((place) => (
                <MapPlaceMarker
                    key={place.id}
                    place={place}
                    onPlaceClick={onPlaceClick}
                />
            ))}
            <MapClick onMapClick={onMapClick} />

            {children}
        </HereMap>
    </div>
);

export default MapMemories;
