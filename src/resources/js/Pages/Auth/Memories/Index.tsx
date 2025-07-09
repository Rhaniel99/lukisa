import React, { useState } from "react";
import { Head, router } from "@inertiajs/react";
import { LatLng, Map as LeafletMap } from "leaflet";
import { Place, Memory } from "@/Types/models";

// * Import os componentes de UI
import MemoriesMap from "./Components/Map/MapMemories";
import FlyToLocationButton from "./Components/FlyToLocationButton";
import { PinSidebar } from "./Components/PinSideBar/PinSidebar";
import { MemoryDetailModal } from "./Components/MemoryDetailModal";
import AddMemoryDialog from "./Components/AddMemoryDialog";

// * Import hooks
import { usePinSidebar } from "./Hooks/usePinSidebar";
import { useMemory } from "./Hooks/useMemory";
import { useAddMemoryDialog } from "./Hooks/useAddMemoryDialog";

// * Import CSS
import "leaflet/dist/leaflet.css";

const Index: React.FC<{ places: Place[] }> = ({ places }) => {
    const [map] = useState<LeafletMap | null>(null);

    // ? Consumindo os hooks para gerenciar o estado e a lógica
    const sidebar = usePinSidebar();
    const {
        memories,
        selectedMemory,
        openMemoryDetailModal,
        closeMemoryDetailModal,
        toggleLike, // Pega a função do hook
    } = useMemory(sidebar.memories);
    const addDialog = useAddMemoryDialog();

    // Handler para abrir o dialog de adição a partir da sidebar
    const handleAddMemoryFromPlace = (place: Place) => {
        addDialog.open(new LatLng(place.latitude, place.longitude));
    };

    return (
        <>
            <Head title="Maps" />

            <div className="relative h-screen w-screen">
                <MemoriesMap
                    places={places}
                    onPlaceClick={sidebar.open}
                    initialPosition={[-3.119, -60.0217]}
                    onMapClick={addDialog.open}
                />

                <FlyToLocationButton map={map} />

                <PinSidebar
                    isOpen={sidebar.isOpen}
                    isLoading={sidebar.isLoading}
                    memories={memories} // Passa as memórias do hook principal
                    place={sidebar.place}
                    onClose={sidebar.close}
                    onAddMemoryClick={handleAddMemoryFromPlace}
                    onMemorySelect={openMemoryDetailModal}
                    onLike={toggleLike} // Passa a função de like
                />

                {selectedMemory && (
                    <MemoryDetailModal
                        key={selectedMemory.id} // <-- Força a recriação do componente
                        memory={selectedMemory}
                        onClose={closeMemoryDetailModal}
                        onLike={toggleLike} // Reutiliza a mesma função de like
                    />
                )}

                {addDialog.isOpen && addDialog.coordinates && (
                    <AddMemoryDialog
                        isOpen={addDialog.isOpen}
                        onClose={addDialog.close}
                        coordinates={addDialog.coordinates}
                    />
                )}
            </div>
        </>
    );
};

export default Index;
