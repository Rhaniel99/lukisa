
import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import { Place } from '@/Types/models'; // Importando do nosso arquivo central

interface MapPlaceMarkerProps {
    place: Place;
    onPlaceClick: (place: Place) => void;
}

const MapPlaceMarker: React.FC<MapPlaceMarkerProps> = ({ place, onPlaceClick }) => {
    return (
        <Marker
            key={place.id}
            position={[place.latitude, place.longitude]}
            // ✅ O evento de clique agora chama a função do componente pai
            eventHandlers={{ click: () => onPlaceClick(place) }}
        >
            {/* Um Popup simples para feedback visual imediato */}
            <Popup>Clique para ver as memórias deste local.</Popup>
        </Marker>
    );
};

export default MapPlaceMarker;
