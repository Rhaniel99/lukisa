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
import { useMemoryDetailModal } from "./Hooks/useMemoryDetailModal";
import { useAddMemoryDialog } from "./Hooks/useAddMemoryDialog";

// * Import CSS
import "leaflet/dist/leaflet.css";

const Index: React.FC<{ places: Place[] }> = ({ places }) => {
    const [map] = useState<LeafletMap | null>(null);

    // ? Consumindo os hooks para gerenciar o estado e a lógica
    const sidebar = usePinSidebar();
    const detailModal = useMemoryDetailModal();
    const addDialog = useAddMemoryDialog();

    const handleLikeToggle = (memoryToUpdate: Memory) => {
        const routeName = memoryToUpdate.liked
            ? "memories.unlike"
            : "memories.like";
        const method = memoryToUpdate.liked ? "delete" : "post";
        router[method](route(routeName, memoryToUpdate.id), {
            preserveScroll: true,
            preserveState: true,
        });
    };

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
                    memories={sidebar.memories}
                    place={sidebar.place}
                    onClose={sidebar.close}
                    onAddMemoryClick={handleAddMemoryFromPlace}
                    onMemorySelect={detailModal.open}
                />

                {detailModal.memory && (
                    <MemoryDetailModal
                        key={detailModal.memory.id} // <-- Força a recriação do componente
                        memory={detailModal.memory}
                        onClose={detailModal.close}
                        onLike={handleLikeToggle}
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
