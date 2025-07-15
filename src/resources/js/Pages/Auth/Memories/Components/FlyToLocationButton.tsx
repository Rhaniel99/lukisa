import React, { useState } from "react";
import { Button } from "@/Components/ui/button";
import { Loader2, LocateFixed } from "lucide-react";
import { useMap } from "react-leaflet";

const FlyToLocationButton: React.FC = () => {
    const map = useMap();
    const [isLocating, setIsLocating] = useState(false);

    const handleFlyTo = () => {
        if (isLocating) return;

        setIsLocating(true);
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                map.flyTo([latitude, longitude], 15);
                setIsLocating(false);
            },
            (error) => {
                console.error("Erro ao obter localização:", error);
                alert(`Erro: ${error.message}`);
                setIsLocating(false);
            },
            { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 },
        );
    };

    return (
        <div className="absolute top-4 right-4 z-[1000]">
            <Button
                onClick={handleFlyTo}
                size="icon"
                disabled={isLocating}
                title="Ir para sua localização"
            >
                {isLocating ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                    <LocateFixed className="h-5 w-5" />
                )}
            </Button>
        </div>
    );
};

export default FlyToLocationButton;
