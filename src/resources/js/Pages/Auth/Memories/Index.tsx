import { Head, router } from "@inertiajs/react";
import { ArrowLeft, Locate, Minus, Plus } from "lucide-react";
import { MapContainer, TileLayer } from "react-leaflet";

import { MemoryModal } from "./components/modal/MemoryModal";
import { MemoryDrawer } from "./components/MemoryDrawer";
import { MemoryDetailsModal } from "./components/modal/MemoryDetailsModal";
import { ClickHandler } from "./components/map/ClickHandler";
import { SearchBar } from "./components/SearchBar";
import PinTemp from "./components/map/PinTemp";
import PinCozy from "./components/map/PinCozy";

import { useHereMapKey } from "./hooks/useHereMap";
import { useMemoryFeed } from "./hooks/useMemoryFeed";

import { useMemoryController } from "./hooks/controllers/useMemoryController";
import { useMapController } from "./hooks/controllers/useMapController";

import { Memory, Place } from "@/Types/Memories";
import { MapSetter } from "./components/map/Setter";
import { useMemoriesUI } from "./contexts/MemoriesUIContext";
import { usePlaceMemories } from "./hooks/usePlaceMemories";

interface IndexProps {
  places: Place[];
  selectedPlaceMemories?: Memory[];
  selectedMemoryDetails?: Memory;
}

export default function Index({
  places,
  selectedPlaceMemories = [],
  selectedMemoryDetails,
}: IndexProps) {
  const apiKey = useHereMapKey();

  // UI state
  const {
    isModalOpen,
    isDrawerOpen,
    selectedPlace,
    openModal,
    closeModal,
    openDrawer,
    closeDrawer,
    clearSelection,
  } = useMemoriesUI();

  const { loadPlaceMemories } = usePlaceMemories();

  // Controllers and feed
  const mapCtrl = useMapController(apiKey, places);
  const { memories, toggleLike, updateMemory } =
    useMemoryFeed(selectedPlaceMemories);

  const memCtrl = useMemoryController(
    memories,
    selectedMemoryDetails,
    selectedPlace?.id,
    updateMemory
  );

  // unified place selection
  const handleSelectPlace = (place: Place) => {
    mapCtrl.setTempPin(null);
    openDrawer(place);
    loadPlaceMemories(place.id);
  };

  return (
    <>
      <Head title="Memories Maps" />
      
      <div className="relative w-full h-screen bg-[#E8DCC4] overflow-hidden">

        {/* Top bar */}
        <div className="absolute top-0 left-0 right-0 z-30 p-6 flex gap-4">
          <div className="pointer-events-auto flex-1 max-w-xl mx-auto shadow-xl">
            <SearchBar
              apiKey={apiKey}
              map={mapCtrl.map}
              onSelect={({ lat, lng, label }) => {
                const result = mapCtrl.handleSearchSelect(lat, lng, label);
                if (result.type === "existing") {
                  handleSelectPlace(result.place);
                } else {
                  clearSelection();
                }
              }}
            />
          </div>

          <button onClick={() => router.get("/lukisa")}           
          className="pointer-events-auto ml-4 p-4 bg-[#F5EFE6]/95 backdrop-blur-md border-2 border-[#D4C5A9] rounded-2xl text-[#6B4E3D] hover:bg-[#3D2817] hover:text-[#F5EFE6] transition-colors shadow-lg">
            <ArrowLeft />
          </button>
        </div>

        {/* UI Overlay - Zoom Controls */}
        <div className="absolute bottom-8 left-8 z-30 flex flex-col gap-3 pointer-events-auto">

          {/* Caixa com botões de Zoom */}
          <div className="bg-[#F5EFE6]/95 backdrop-blur-md border-2 border-[#D4C5A9] rounded-2xl shadow-xl overflow-hidden">
            <button
              onClick={mapCtrl.zoomIn}
              className="p-4 hover:bg-[#E8DCC4] text-[#6B4E3D] transition-colors border-b border-[#D4C5A9] flex items-center justify-center w-full"
            >
              <Plus className="w-6 h-6" />
            </button>

            <button
              onClick={mapCtrl.zoomOut}

              className="p-4 hover:bg-[#E8DCC4] text-[#6B4E3D] transition-colors flex items-center justify-center w-full"
            >
              <Minus className="w-6 h-6" />
            </button>
          </div>

          {/* Botão para centralizar na localização do usuário */}
          <button
            onClick={mapCtrl.locateUser}

            className="p-4 bg-[#6B4E3D] text-[#F5EFE6] rounded-2xl shadow-xl hover:bg-[#3D2817] transition-colors"
          >
            <Locate className="w-6 h-6" />
          </button>

        </div>


        {/* Map */}
        <MapContainer center={[-3.12, -60.02]} zoom={13} className="w-full h-full" zoomControl={false}>
          <TileLayer url={`https://maps.hereapi.com/v3/base/mc/{z}/{x}/{y}/png8?apiKey=${apiKey}`} attribution='Map data ©2025 <a href="https://www.here.com">HERE</a>' />

          <MapSetter onMap={mapCtrl.setMap} />

          <ClickHandler onClick={(coords) => {
            mapCtrl.handleMapClick(coords);
            openModal();
          }} />

          {places.map((p) => (
            <PinCozy key={p.id} lat={p.latitude} lng={p.longitude} label={p.name} onClick={() => handleSelectPlace(p)} />
          ))}

          {mapCtrl.tempPin && (
            <PinTemp
              lat={mapCtrl.tempPin.lat}
              lng={mapCtrl.tempPin.lng}
              label={mapCtrl.tempPin.label}
              onClick={() => {
                mapCtrl.confirmTempPin();
                openModal();
              }}
            />
          )}

        </MapContainer>

        {/* Create Modal */}
        <MemoryModal
          isOpen={isModalOpen}
          coords={mapCtrl.createCoords}
          placeMeta={mapCtrl.createPlaceMeta}
          onClose={() => {
            closeModal();
            mapCtrl.clearCreation();
          }}
        />


        {/* Drawer */}
        <MemoryDrawer
          isOpen={isDrawerOpen}
          onClose={closeDrawer}
          locationName={selectedPlace?.name}
          memories={memories}
          onLike={toggleLike}
          onMemoryClick={memCtrl.openDetails}
          onAddMemory={() => {
            if (!selectedPlace) return;
            mapCtrl.prepareCreateFromPlace(selectedPlace);
            closeDrawer();
            openModal();
          }}
        />

        {/* Details Modal */}
        <MemoryDetailsModal
          isOpen={!!memCtrl.activeMemory}
          memory={memCtrl.activeMemory}
          onClose={memCtrl.closeDetails}
          onLike={toggleLike}
          onUpdateMemory={updateMemory}
        />

      </div>
    </>
  );
}
