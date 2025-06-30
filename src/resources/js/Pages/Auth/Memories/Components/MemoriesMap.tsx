import React from 'react';
import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet';
import { LatLng, LatLngExpression, Map } from 'leaflet';
import { Place } from '@/Types/models';
import PlaceMarker from './PlaceMarker';

// Helper para o clique no mapa
const MapClickHandler: React.FC<{ onMapClick: (latlng: LatLng) => void }> = ({ onMapClick }) => {
    useMapEvents({ click: (e) => onMapClick(e.latlng) });
    return null;
};

interface MemoriesMapProps {
    places: Place[];
    initialPosition: LatLngExpression;
    onMapClick: (latlng: LatLng) => void;
    setMapInstance: (map: Map) => void;
}

const MemoriesMap: React.FC<MemoriesMapProps> = ({ places, initialPosition, onMapClick, setMapInstance }) => {
    return (
        <div className="h-screen w-screen">
            <MapContainer
                center={initialPosition}
                zoom={13}
                style={{ height: '100%', width: '100%' }}
                ref={setMapInstance}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />

                {places.map((place) => (
                    <PlaceMarker key={place.id} place={place} />
                ))}

                <MapClickHandler onMapClick={onMapClick} />
            </MapContainer>
        </div>
    );
};

export default MemoriesMap;
