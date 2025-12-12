import { useState, useEffect } from 'react';
import { Plus, Minus, Locate, ArrowLeft } from 'lucide-react';
import { MemoryModal } from './components/modal/MemoryModal';
import { MemoryDrawer } from './components/MemoryDrawer';
import { MemoryDetailsModal } from './components/modal/MemoryDetailsModal';
import { Head, router } from '@inertiajs/react';

import {
  MapContainer,
  TileLayer,
  useMap
} from 'react-leaflet';

import { LatLng, Map as LeafletMap } from 'leaflet';

import { useHereMapKey } from './hooks/useHereMap';
import PinCozy from './components/map/PinCozy';
import { ClickHandler } from './components/map/ClickHandler';
import { getPlaceInfo } from './utils/infoPlace';
import { Memory } from '@/Types/Memories';
import { SearchBar } from './components/SearchBar';


// ----------------------------------------
//  MapSetter — melhor forma de pegar a instância do Leaflet
// ----------------------------------------
function MapSetter({ onMap }: { onMap: (m: LeafletMap) => void }) {
  const map = useMap();

  useEffect(() => {
    onMap(map);
  }, [map, onMap]);

  return null;
}

// ----------------------------------------
//  Página principal
// ----------------------------------------
export default function Index() {
  const [scale, setScale] = useState(1);
  const [map, setMap] = useState<LeafletMap | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<string>();
  const [selectedMemory, setSelectedMemory] = useState<any>(null);

  // NOVOS
  const [selectedCoords, setSelectedCoords] = useState<LatLng | null>(null);
  const [selectedPlaceMeta, setSelectedPlaceMeta] =
    useState<{ name: string | null; address: string | null } | null>(null);

  const [selectedPlace, setSelectedPlace] = useState<{
    id: number;
    lat: number;
    lng: number;
    label: string;
  } | null>(null);

  const apiKey = useHereMapKey();

  // Mock pins
  const pins = [
    { id: 1, lat: -3.119, lng: -60.0217, label: "Centro Histórico" },
    { id: 2, lat: -3.12, lng: -60.02, label: "Café da Praça" }
  ];

  // Mock memories
  const mockMemories: Record<number, Memory[]> = {
    1: [
      {
        id: 1,
        title: "Memória do lugar 1",
        description: "...",
        created: "2025-11-24",
        likes: 2,
        liked: false,
        is_owner: true,
        image: null,
        author: {
          id: 1,
          username: "Polar"
        },
        comments: [],
        comments_count: 0
      }
    ],
    2: [
      {
        id: 9,
        title: "Café da praça",
        description: "Dia incrível.",
        created: "2025-11-20",
        likes: 8,
        liked: true,
        is_owner: false,
        image: null,
        author: {
          id: 2,
          username: "UserTest"
        },
        comments: [],
        comments_count: 0
      }
    ]
  };


  return (
    <>
      <Head title="Memories Maps" />

      <div className="relative w-full h-screen bg-[#E8DCC4] overflow-hidden font-sans">

        {/* ---------------------------- */}
        {/*   Barra superior com busca   */}
        {/* ---------------------------- */}
        <div className="absolute top-0 left-0 right-0 z-30 p-6 pointer-events-none flex justify-between items-start">

          <div className="pointer-events-auto flex-1 max-w-xl mx-auto shadow-xl">
            <div className="relative group">
              {/* 🔎 Search component */}
              <SearchBar
                apiKey={apiKey}
                map={map}        // ← passa o mapa aqui
                onSelect={({ lat, lng, label }) => {
                  setSelectedPlace({ id: 0, lat, lng, label });
                }}
              />
            </div>
          </div>

          {/* Back Button */}
          <button
            onClick={() => router.get("/lukisa")}
            className="pointer-events-auto ml-4 p-4 bg-[#F5EFE6]/95
              backdrop-blur-md border-2 border-[#D4C5A9] rounded-2xl
              text-[#6B4E3D] hover:bg-[#3D2817] hover:text-[#F5EFE6]
              transition-colors shadow-lg"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
        </div>

        {/* UI Overlay - Zoom Controls */}
        <div className="absolute bottom-8 left-8 z-30 flex flex-col gap-3 pointer-events-auto">

          {/* Caixa com botões de Zoom */}
          <div className="bg-[#F5EFE6]/95 backdrop-blur-md border-2 border-[#D4C5A9] rounded-2xl shadow-xl overflow-hidden">

            <button
              onClick={() => map && map.zoomIn()}
              className="p-4 hover:bg-[#E8DCC4] text-[#6B4E3D] transition-colors border-b border-[#D4C5A9] flex items-center justify-center w-full"
            >
              <Plus className="w-6 h-6" />
            </button>

            <button
              onClick={() => map && map.zoomOut()}
              className="p-4 hover:bg-[#E8DCC4] text-[#6B4E3D] transition-colors flex items-center justify-center w-full"
            >
              <Minus className="w-6 h-6" />
            </button>
          </div>

          {/* Botão para centralizar na localização do usuário */}
          <button
            onClick={() => {
              if (!map) return;

              navigator.geolocation.getCurrentPosition(
                (pos) => {
                  const { latitude, longitude } = pos.coords;
                  map.flyTo([latitude, longitude], 16, { animate: true });
                },
                () => alert("Não foi possível obter a localização.")
              );
            }}
            className="p-4 bg-[#6B4E3D] text-[#F5EFE6] rounded-2xl shadow-xl hover:bg-[#3D2817] transition-colors"
          >
            <Locate className="w-6 h-6" />
          </button>

        </div>

        {/* ---------------------------- */}
        {/*   Mapa (Leaflet + HERE)      */}
        {/* ---------------------------- */}
        <MapContainer
          center={[-3.12, -60.02]}
          zoom={13}
          className="w-full h-full"
          zoomControl={false}
        >
          <TileLayer
            url={`https://maps.hereapi.com/v3/base/mc/{z}/{x}/{y}/png8?apiKey=${apiKey}`}
            attribution='Map data ©2025 <a href="https://www.here.com">HERE</a>'
          />

          {/* Captura a instância do mapa */}
          <MapSetter onMap={setMap} />

          {/* Click Handler */}
          <ClickHandler
            onClick={async (coords) => {
              const info = await getPlaceInfo(coords.lat, coords.lng, apiKey);

              setSelectedCoords(coords);
              setSelectedPlaceMeta(info);
              setIsModalOpen(true);
            }}
          />

          {/* Pins */}
          {pins.map(pin => (
            <PinCozy
              key={pin.id}
              lat={pin.lat}
              lng={pin.lng}
              label={pin.label}
              onClick={() => {
                setSelectedPlace(pin);
                setSelectedLocation(pin.label);
                setIsDrawerOpen(true);
              }}
            />
          ))}

        </MapContainer>

        {/* ---------------------------- */}
        {/*   Modal de Criar Memória     */}
        {/* ---------------------------- */}
        <MemoryModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedCoords(null);
          }}
          coords={selectedCoords}
          placeMeta={selectedPlaceMeta}
          onSave={(memoryData) => {
            console.log("Memória criada:", {
              ...memoryData,
              latitude: selectedCoords?.lat,
              longitude: selectedCoords?.lng,
            });

            setIsModalOpen(false);
            setSelectedCoords(null);
          }}
        />

        {/* ---------------------------- */}
        {/*   Drawer de Memórias do Pin  */}
        {/* ---------------------------- */}
        <MemoryDrawer
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          locationName={selectedPlace?.label}
          memories={selectedPlace ? mockMemories[selectedPlace.id] || [] : []}
          onAddMemory={() => {
            setIsDrawerOpen(false);
            setIsModalOpen(true);
          }}
          onMemoryClick={memory => setSelectedMemory(memory)}
        />

        {/* ---------------------------- */}
        {/*   Modal de detalhes memória  */}
        {/* ---------------------------- */}
        <MemoryDetailsModal
          isOpen={!!selectedMemory}
          onClose={() => setSelectedMemory(null)}
          memory={selectedMemory}
        />
      </div>
    </>
  );
}
