import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, LocateFixed } from 'lucide-react';
import { Map } from 'leaflet';

interface FlyToLocationButtonProps {
    map: Map | null;
}

const FlyToLocationButton: React.FC<FlyToLocationButtonProps> = ({ map }) => {
    const [isLocating, setIsLocating] = useState(false);

    const handleFlyTo = () => {
        if (!map || isLocating) return;

        setIsLocating(true);
        const startTime = Date.now();

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                map.flyTo([latitude, longitude], 15);
                finishLocating();
            },
            (error) => {
                console.error('Erro ao obter localização:', error);
                alert(`Erro: ${error.message}`);
                finishLocating();
            },
            { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
        );

        const finishLocating = () => {
            const elapsedTime = Date.now() - startTime;
            const minTime = 500; // ms
            if (elapsedTime < minTime) {
                setTimeout(() => setIsLocating(false), minTime - elapsedTime);
            } else {
                setIsLocating(false);
            }
        };
    };

    return (
        <div className="absolute top-2 right-14 z-[1000]">
            <Button onClick={handleFlyTo} size="icon" disabled={isLocating || !map}>
                {isLocating ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                    <LocateFixed className="h-4 w-4" />
                )}
            </Button>
        </div>
    );
};

export default FlyToLocationButton;
