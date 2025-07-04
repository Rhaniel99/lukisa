import React, { useState, useCallback } from "react";
import { Head, router, usePage } from "@inertiajs/react";
import { LatLng, LatLngExpression, Map } from "leaflet";
import { Place, Memory, PageProps } from "@/Types/models";

import MemoriesMap from "./Components/MemoriesMap";
import FlyToLocationButton from "./Components/FlyToLocationButton";
import AddMemoryDialog from "./Components/AddMemoryDialog";
import { MemoryDetailModal } from "./Components/MemoryDetailModal";

import "leaflet/dist/leaflet.css";
import { PinSidebar } from "./Components/PinSidebar";

type MemoriesIndexPageProps = PageProps & {
    places: Place[];
    selectedPlaceMemories?: Memory[]; // Prop opcional do partial reload
};

const Index: React.FC<{ places: Place[] }> = ({ places }) => {
    // Pegamos as props da página, incluindo as que chegam via partial reload
    const { props } = usePage<MemoriesIndexPageProps>();
    const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
    const [isLoadingMemories, setIsLoadingMemories] = useState(false);

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

    //
    const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null);

    const handleSelectMemoryFromSidebar = (memory: Memory) => {
        router.reload({
            only: ['selectedMemoryDetails'],
            data: { memory_id: memory.id },
            onSuccess: (page) => {
            setSelectedMemory(page.props.selectedMemoryDetails as Memory);
            }
        });
    };

    const handleCloseDetailModal = () => {
        setSelectedMemory(null);
    };


        // A lógica de like agora precisa estar aqui para poder ser usada
    // tanto na lista da sidebar quanto no modal.
    const handleLikeToggle = (memoryToUpdate: Memory) => {
      // Como o estado agora vive no servidor (via props),
      // não precisamos mais da atualização otimista aqui.
      // O Inertia cuidará de atualizar as props.
      const routeName = memoryToUpdate.liked ? 'memories.unlike' : 'memories.like';
      const method = memoryToUpdate.liked ? 'delete' : 'post';
      router[method](route(routeName, memoryToUpdate.id), {
        preserveScroll: true,
        preserveState: true,
      });
    }

    //
    return (
        <>
            <Head title="Maps" />

            <div className="relative h-screen w-screen">
                <MemoriesMap
                    places={places}
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
                    onMemorySelect={handleSelectMemoryFromSidebar}
                />


                <MemoryDetailModal
                    memory={selectedMemory}
                    onClose={handleCloseDetailModal}
                    onLike={handleLikeToggle}
                />

                {newMemoryCoords && (
                    <AddMemoryDialog
                        isOpen={!!newMemoryCoords}
                        onClose={() => setNewMemoryCoords(null)}
                        coordinates={newMemoryCoords}
                    />
                )}
            </div>
        </>
    );
};

export default Index;
