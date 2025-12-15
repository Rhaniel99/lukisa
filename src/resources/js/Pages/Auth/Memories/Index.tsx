import { useState, useEffect } from 'react';
import { Head, router } from '@inertiajs/react';
import { Plus, Minus, Locate, ArrowLeft } from 'lucide-react';
import { LatLng, Map as LeafletMap } from 'leaflet';

import {
  MapContainer,
  TileLayer,
  useMap
} from 'react-leaflet';

// * Components
import { MemoryModal } from './components/modal/MemoryModal';
import { MemoryDrawer } from './components/MemoryDrawer';
import { MemoryDetailsModal } from './components/modal/MemoryDetailsModal';
import { ClickHandler } from './components/map/ClickHandler';
import { SearchBar } from './components/SearchBar';
import PinTemp from './components/map/PinTemp';
import PinCozy from './components/map/PinCozy';
// * Hooks
import { useHereMapKey } from './hooks/useHereMap';
import { useMemoryFeed } from './hooks/useMemoryFeed';
// * Services
import { hereService } from "@/Pages/Auth/Memories/services/here.service";

// * Types
import { Memory, Place } from '@/Types/Memories';

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

interface IndexProps {
  places: Place[];
  selectedPlaceMemories?: Memory[]; // Lazy loaded via Lazy::when
  selectedMemoryDetails?: Memory; // <--- (Vem do ViewModel)
}

// ----------------------------------------
//  Página principal
// ----------------------------------------
export default function Index({ places, selectedPlaceMemories = [], selectedMemoryDetails }: IndexProps) {
  const apiKey = useHereMapKey();
  // Estados do Mapa e UI
  const [map, setMap] = useState<LeafletMap | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [loadingMemories, setLoadingMemories] = useState(false);

  // Estados de Seleção
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null);
  const [tempPin, setTempPin] = useState<{ lat: number; lng: number; label: string } | null>(null);

  // Estados para Modal de Criação (Coords e Meta)
  const [createCoords, setCreateCoords] = useState<LatLng | null>(null);
  const [createPlaceMeta, setCreatePlaceMeta] = useState<{ name: string | null; address: string | null } | null>(null);

  // const [selectedCoords, setSelectedCoords] = useState<LatLng | null>(null);
  // const [selectedPlaceMeta, setSelectedPlaceMeta] = useState<{ name: string | null; address: string | null } | null>(null);

  const { memories, toggleLike } = useMemoryFeed(selectedPlaceMemories);

  const handleMemoryClick = (memory: Memory) => {
    // Busca os detalhes completos (incluindo comentários) no servidor
    router.visit(route('memo.maps.index'), {
        // Mantém o place_id na URL e adiciona o memory_id
        data: { 
            place_id: selectedPlace?.id, // Garante que o drawer não feche/limpe
            memory_id: memory.id,
            comments_page: 1 
        },
        only: ['selectedMemoryDetails'], // Traz apenas o detalhe pesado
        preserveState: true,
        preserveScroll: true,
    });
  };

  const handleCloseMemoryModal = () => {
    // Para fechar, removemos o memory_id da URL e limpamos a prop
    router.visit(route('memo.maps.index'), {
        data: { place_id: selectedPlace?.id }, // Mantém só o lugar
        only: ['selectedMemoryDetails'], // Isso vai fazer o backend retornar null para details
        preserveState: true,
        preserveScroll: true,
    });
  };

  const handlePinClick = (place: Place) => {
    setTempPin(null); // Remove pin temporário se houver
    setSelectedPlace(place);
    setLoadingMemories(true); // UI feedback
    setIsDrawerOpen(true);

    // INERTIA PARTIAL RELOAD
    // Busca apenas as memórias deste lugar sem recarregar a página toda
    router.visit(route('memo.maps.index'), {
      data: { place_id: place.id }, // Envia o ID para o Lazy::when no backend
      only: ['selectedPlaceMemories'], // Só queremos atualizar essa prop
      preserveState: true, // Mantém o zoom do mapa e estados do React
      preserveScroll: true,
      onFinish: () => setLoadingMemories(false),
    });
  };

  const handleMapClick = async (coords: LatLng) => {
    setTempPin(null);
    const info = await hereService.getPlaceInfo(coords.lat, coords.lng, apiKey);

    // Prepara dados para o Modal de Criação
    setCreateCoords(coords);
    setCreatePlaceMeta(info);

    setIsModalOpen(true);
  };

  const handleSearchSelect = ({ lat, lng, label }: { lat: number; lng: number; label: string }) => {
    // Verifica se já existe um pin muito próximo (threshold de ~50m)
    const threshold = 0.0005;
    const existingPlace = places.find(p =>
      Math.abs(p.latitude - lat) < threshold &&
      Math.abs(p.longitude - lng) < threshold
    );

    if (existingPlace) {
      // Se existe, foca nele e abre o drawer
      handlePinClick(existingPlace);
    } else {
      // Se não existe, cria pin temporário azul
      setSelectedPlace(null);
      setIsDrawerOpen(false); // Fecha drawer se estiver aberto
      setTempPin({ lat, lng, label });
    }
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
                map={map}
                onSelect={handleSearchSelect}
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
          <ClickHandler onClick={handleMapClick} />

          {/* Pins */}
          {places.map(place => (
            <PinCozy
              key={place.id}
              lat={place.latitude}
              lng={place.longitude}
              label={place.name} // Usando 'name' do banco
              onClick={() => handlePinClick(place)}
            />
          ))}

          {tempPin && (
            <PinTemp
              lat={tempPin.lat}
              lng={tempPin.lng}
              label={tempPin.label}
              onClick={() => {
                // Ao clicar no temp, abre modal de criar
                setCreateCoords(new LatLng(tempPin.lat, tempPin.lng));
                setCreatePlaceMeta({ name: tempPin.label, address: "" });
                setIsModalOpen(true);
                setTempPin(null);
              }}
            />
          )}
        </MapContainer>

        {/* ---------------------------- */}
        {/*   Modal de Criar Memória     */}
        {/* ---------------------------- */}
        <MemoryModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setCreateCoords(null);
          }}
          coords={createCoords}
          placeMeta={createPlaceMeta}
        />


        {/* ---------------------------- */}
        {/*   Drawer de Memórias do Pin  */}
        {/* ---------------------------- */}
        <MemoryDrawer
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          locationName={selectedPlace?.name} // Usando 'name' do banco

          // Passamos as memórias que vieram do Inertia Props
          memories={memories}

          // Opcional: Se quiser mostrar um skeleton enquanto carrega
          // isLoading={loadingMemories}

          onAddMemory={() => {
            // Adicionar memória no lugar JÁ existente
            if (selectedPlace) {
              setCreateCoords(new LatLng(selectedPlace.latitude, selectedPlace.longitude));
              setCreatePlaceMeta({ name: selectedPlace.name, address: "" });
              setIsDrawerOpen(false);
              setIsModalOpen(true);
            }
          }}
          onMemoryClick={handleMemoryClick} 
          // onMemoryClick={(memory) => setSelectedMemoryId(memory.id)}
          // onMemoryClick={(memory) => setSelectedMemory(memory)}
          onLike={toggleLike} // <--- Passamos a função de like
        />

        {/* ---------------------------- */}
        {/*   Modal de detalhes memória  */}
        {/* ---------------------------- */}
        <MemoryDetailsModal
          isOpen={!!selectedMemoryDetails} // Se achou a memória, abre
          onClose={handleCloseMemoryModal}
          // onClose={() => setSelectedMemoryId(null)} // Limpa o ID ao fechar
          memory={selectedMemoryDetails || null}

          // memory={activeMemory} // Passamos a versão "viva" do hook useMemoryFeed

          onLike={toggleLike} // Passamos a mesma função de like
        />
      </div>
    </>
  );
}
