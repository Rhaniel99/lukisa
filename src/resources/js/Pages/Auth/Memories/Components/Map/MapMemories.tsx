import React from "react";
import { LatLng, LatLngExpression } from "leaflet"; // Importe LatLng
import { Place } from "@/Types/models";
import { HereMap } from "./HereMap";
import { MapLayers } from "./MapLayers";

interface MapMemoriesProps {
    places: Place[];
    initialPosition: LatLngExpression;
    onMapClick: (latlng: LatLng) => void;
    onPlaceClick: (place: Place) => void;
}

const MapMemories: React.FC<MapMemoriesProps> = ({
    places,
    onPlaceClick,
    initialPosition,
    onMapClick,
}) => (
    <div className="h-screen w-screen">
        <HereMap center={initialPosition}>
            <MapLayers
                places={places}
                onPlaceClick={onPlaceClick}
                onMapClick={onMapClick}
            />
        </HereMap>
    </div>
);

export default MapMemories;
