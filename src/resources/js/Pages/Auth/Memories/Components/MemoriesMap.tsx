import React from "react";
import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";
import { LatLng, LatLngExpression, Map } from "leaflet";
import { Place } from "@/Types/models";
import PlaceMarker from "./PlaceMarker";
import MapSearchField from "./MapSearchField";

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
    onPlaceClick: (place: Place) => void;
}

const MemoriesMap: React.FC<MemoriesMapProps> = ({
    places,
    onPlaceClick,
    initialPosition,
    onMapClick,
    setMapInstance,
    hereApiKey,
}) => {
    // ✅ 2. Montamos a URL do TileLayer do Mapbox
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
                <TileLayer url={hereTileUrl} attribution={hereAttribution} />

                <MapSearchField hereApiKey={hereApiKey} />

                {places.map((place) => (
                    <PlaceMarker
                        key={place.id}
                        place={place}
                        onPlaceClick={onPlaceClick} // ✅ Passe a função para o marcador
                    />
                ))}

                <MapClickHandler onMapClick={onMapClick} />
            </MapContainer>
        </div>
    );
};

export default MemoriesMap;
