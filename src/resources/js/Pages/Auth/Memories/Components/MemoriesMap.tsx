import React from "react";
import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";
import { LatLng, LatLngExpression, Map } from "leaflet";
import { Place } from "@/Types/models";
import PlaceMarker from "./PlaceMarker";
import MapSearchField from "./MapSearchField";
// Helper para o clique no mapa
const MapClickHandler: React.FC<{ onMapClick: (latlng: LatLng) => void }> = ({
    onMapClick,
}) => {
    useMapEvents({ click: (e) => onMapClick(e.latlng) });
    return null;
};

interface MemoriesMapProps {
    places: Place[];
    initialPosition: LatLngExpression;
    onMapClick: (latlng: LatLng) => void;
    setMapInstance: (map: Map) => void;
    hereApiKey: string;
}

const MemoriesMap: React.FC<MemoriesMapProps> = ({
    places,
    initialPosition,
    onMapClick,
    setMapInstance,
    hereApiKey,
}) => {
    // ✅ 2. Montamos a URL do TileLayer do Mapbox
    // Usamos o estilo 'streets-v12' que é um ótimo padrão.
    const hereTileUrl = `https://maps.hereapi.com/v3/base/mc/{z}/{x}/{y}/png8?apiKey=${hereApiKey}`;
    const hereAttribution =
        'Map data ©2025 <a href="https://www.here.com">HERE</a>';

    return (
        <div className="h-screen w-screen">
            <MapContainer
                center={initialPosition}
                zoom={13}
                style={{ height: "100%", width: "100%" }}
                ref={setMapInstance}
            >
                <TileLayer
                    url={hereTileUrl}
                    attribution={hereAttribution}
                    // tileSize={512}
                    // zoomOffset={-1}
                />

                <MapSearchField hereApiKey={hereApiKey} />

                {places.map((place) => (
                    <PlaceMarker key={place.id} place={place} />
                ))}

                <MapClickHandler onMapClick={onMapClick} />
            </MapContainer>
        </div>
    );
};

export default MemoriesMap;
