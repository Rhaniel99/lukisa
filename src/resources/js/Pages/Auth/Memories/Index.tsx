import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import { LatLng, LatLngExpression, Map } from 'leaflet';
import { MemoriesIndexProps } from '@/Types/models';

import MemoriesMap from './Components/MemoriesMap';
import FlyToLocationButton from './Components/FlyToLocationButton';
import AddMemoryDialog from './Components/AddMemoryDialog';
import 'leaflet/dist/leaflet.css';

const Index: React.FC<MemoriesIndexProps> = ({ places }) => {
    const [newMemoryCoords, setNewMemoryCoords] = useState<LatLng | null>(null);
    const [map, setMap] = useState<Map | null>(null);

    // ✅ 1. Lê a chave de API do ambiente Vite
    const hereApiKey = import.meta.env.VITE_HERE_API_KEY;

 if (!hereApiKey) {
        // Renderiza uma mensagem de erro se a chave não estiver configurada
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-red-500 font-bold text-xl">
                    {/* ✅ MUDANÇA 2: Atualiza a mensagem de erro */}
                    Erro: A chave de API da HERE não está configurada no arquivo .env
                </p>
            </div>
        );
    }

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
                // ✅ 2. Passa o token para o componente do mapa
                hereApiKey={hereApiKey}
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
