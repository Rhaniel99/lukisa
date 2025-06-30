
import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import { Place } from '@/Types/models'; // Importando do nosso arquivo central

interface PlaceMarkerProps {
    place: Place;
}

const PlaceMarker: React.FC<PlaceMarkerProps> = ({ place }) => {
    return (
        <Marker position={[place.latitude, place.longitude]}>
            <Popup>
                <div>
                    <h3 className="font-bold text-lg">
                        Memórias neste local:
                    </h3>
                    <ul className="list-disc pl-5 mt-2">
                        {place.memories.map((memory) => (
                            <li key={memory.id}>
                                <span className="font-semibold">{memory.title}</span> por{' '}
                                {memory.user.name}
                            </li>
                        ))}
                    </ul>
                </div>
            </Popup>
        </Marker>
    );
};

export default PlaceMarker;
