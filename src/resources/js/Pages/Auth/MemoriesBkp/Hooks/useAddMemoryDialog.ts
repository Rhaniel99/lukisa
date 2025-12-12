import { useState } from 'react';
import { LatLng } from 'leaflet';

export const useAddMemoryDialog = () => {
    const [coordinates, setCoordinates] = useState<LatLng | null>(null);

    return {
        isOpen: !!coordinates,
        coordinates,
        open: setCoordinates,
        close: () => setCoordinates(null),
    };
};
