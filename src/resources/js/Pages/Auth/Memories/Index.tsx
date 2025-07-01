import React, { useState, useCallback } from "react";
import { Head, router, usePage } from "@inertiajs/react";
import { LatLng, LatLngExpression, Map } from "leaflet";
import { Place, Memory, PageProps } from "@/Types/models";

import MemoriesMap from "./Components/MemoriesMap";
import FlyToLocationButton from "./Components/FlyToLocationButton";
import AddMemoryDialog from "./Components/AddMemoryDialog";

import "leaflet/dist/leaflet.css";
import { PinSidebar } from "./Components/PinSidebar";

type MemoriesIndexPageProps = PageProps & {
    places: Place[];
    selectedPlaceMemories?: Memory[]; 
};

const Index: React.FC<{ places: Place[] }> = ({ places }) => {
    // Pegamos as props da página, incluindo as que chegam via partial reload
    const { props } = usePage<MemoriesIndexPageProps>();
    const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
    const [isLoadingMemories, setIsLoadingMemories] = useState(false);
    const [newMemoryCoords, setNewMemoryCoords] = useState<LatLng | null>(null);
    const [map, setMap] = useState<Map | null>(null);

    const handlePlaceClick = useCallback(
        (place: Place) => {
            if (selectedPlace?.id === place.id) {
                setSelectedPlace(null);
                return;
            }

            setSelectedPlace(place);
            setIsLoadingMemories(true);

            router.reload({
                only: ["selectedPlaceMemories"],
                data: { place_id: place.id },
                onFinish: () => {
                    setIsLoadingMemories(false);
                },
            });
        },
        [selectedPlace]
    );

    const handleSaveSuccess = () => {
        // 1. Fecha o dialog de criação de memória.
        setNewMemoryCoords(null);

        // 2. Verifica se uma sidebar está aberta.
        if (selectedPlace) {
            // 3. Se estiver, dispara o partial reload para atualizar seu conteúdo.
            setIsLoadingMemories(true);
            router.reload({
                only: ["selectedPlaceMemories"],
                data: { place_id: selectedPlace.id },
                onFinish: () => {
                    setIsLoadingMemories(false);
                },
            });
        } else {
            // Opcional: Se nenhuma sidebar estiver aberta (criando um novo pin),
            // você pode querer recarregar a lista de 'places' para mostrar o novo pin.
            router.reload({ only: ["places"] });
        }
    };



    // ✅ 1. Lê a chave de API do ambiente Vite
    const hereApiKey = import.meta.env.VITE_HERE_API_KEY;

    if (!hereApiKey) {
        // Renderiza uma mensagem de erro se a chave não estiver configurada
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-red-500 font-bold text-xl">
                    {/* ✅ MUDANÇA 2: Atualiza a mensagem de erro */}
                    Erro: A chave de API da HERE não está configurada no arquivo
                    .env
                </p>
            </div>
        );
    }

    const initialPosition: LatLngExpression = [-3.119, -60.0217]; // Manaus

    const handleMapClick = (latlng: LatLng) => {
        setNewMemoryCoords(latlng);
    };

    const handleCloseSidebar = () => {
        setSelectedPlace(null);
    };

    const handleAddMemoryToPlace = (place: Place) => {
        // Converte as coordenadas do place para um objeto LatLng que o Dialog espera
        const coordinates = new LatLng(place.latitude, place.longitude);
        setNewMemoryCoords(coordinates);
    };

    return (
        <>
            <Head title="Maps" />

            <div className="relative h-screen w-screen">
                <MemoriesMap
                    places={props.places}
                    onPlaceClick={handlePlaceClick} // ✅ Passe a função para o mapa
                    initialPosition={initialPosition}
                    onMapClick={handleMapClick}
                    setMapInstance={setMap}
                    hereApiKey={hereApiKey}
                />

                <FlyToLocationButton map={map} />

                {/* ✅ Renderize a nova sidebar aqui */}
                <PinSidebar
                    isOpen={!!selectedPlace}
                    isLoading={isLoadingMemories}
                    memories={props.selectedPlaceMemories || []}
                    place={selectedPlace}
                    onClose={handleCloseSidebar}
                    onAddMemoryClick={handleAddMemoryToPlace}
                    onMemorySelect={(memory) => {
                        // Lógica para abrir o modal de detalhes virá aqui
                        console.log("Memória selecionada:", memory);
                    }}
                />

                {newMemoryCoords && (
                    <AddMemoryDialog
                        isOpen={!!newMemoryCoords}
                        onClose={handleSaveSuccess}
                        coordinates={newMemoryCoords}
                    />
                )}
            </div>
        </>
    );
};

export default Index;
