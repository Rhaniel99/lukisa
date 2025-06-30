import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import { LatLng, LatLngExpression, Map } from 'leaflet';
import { MemoriesIndexProps } from '@/Types/models';

// Importando nossos novos componentes
import MemoriesMap from './Components/MemoriesMap';
import FlyToLocationButton from './Components/FlyToLocationButton';
import AddMemoryDialog from './Components/AddMemoryDialog';

const Index: React.FC<MemoriesIndexProps> = ({ places }) => {
    const [newMemoryCoords, setNewMemoryCoords] = useState<LatLng | null>(null);
    const [map, setMap] = useState<Map | null>(null);

    const initialPosition: LatLngExpression = [-3.1190, -60.0217]; // Manaus

    const handleMapClick = (latlng: LatLng) => {
        setNewMemoryCoords(latlng);
    };

    const handleDialogClose = () => {
        setNewMemoryCoords(null);
    };

    return (
        <>
            <Head title="Maps" />

            <MemoriesMap
                places={places}
                initialPosition={initialPosition}
                onMapClick={handleMapClick}
                setMapInstance={setMap}
            />

            <FlyToLocationButton map={map} />

            {newMemoryCoords && (
                <AddMemoryDialog
                    isOpen={!!newMemoryCoords}
                    onClose={handleDialogClose}
                    coordinates={newMemoryCoords}
                />
            )}
        </>
    );
};

export default Index;
