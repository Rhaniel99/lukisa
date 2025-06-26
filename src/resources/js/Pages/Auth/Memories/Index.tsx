import React, { useEffect, useState } from "react";
import { Head } from "@inertiajs/react";
import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    useMapEvents,
} from "react-leaflet";
// Importe o tipo Map para termos referência da instância do mapa

import { LatLng, LatLngExpression, Map } from "leaflet";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogOverlay,
    DialogPortal,
    DialogTitle,
} from "@/components/ui/dialog";
import CreateMemoryForm from "./Components/CreateMemoryForm";
import { Button } from "@/components/ui/button";
import { LocateFixed } from "lucide-react";

// ? Defina os tipos para as props que virão do ViewModel
interface User {
    id: number;
    name: string;
    avatar: string | null;
}

interface Memory {
    id: number;
    title: string;
    user: User;
}

interface Place {
    id: number;
    latitude: number;
    longitude: number;
    memories: Memory[];
}

interface MemoriesIndexProps {
    places: Place[];
}

// ✅ PASSO 1: Criar uma interface para as props do MapClickHandler
interface MapClickHandlerProps {
    onMapClick: (latlng: LatLng) => void;
}

// ✅ PASSO 2: Mover o componente para fora e aplicar a tipagem
const MapClickHandler: React.FC<MapClickHandlerProps> = ({ onMapClick }) => {
    useMapEvents({
        click(e) {
            onMapClick(e.latlng);
        },
    });
    return null;
};

const Index: React.FC<MemoriesIndexProps> = ({ places }) => {
 const [newMemoryCoords, setNewMemoryCoords] = useState<LatLng | null>(null);
    // ✅ Passo 2: Criar um estado para guardar a referência do mapa
    const [map, setMap] = useState<Map | null>(null);

    const handleMapClick = (latlng: LatLng) => {
        setNewMemoryCoords(latlng);
    };

    const initialPosition: LatLngExpression = [-15.7942, -47.8825];

    // ✅ Passo 3: Criar a função para ir até a localização atual
const flyToCurrentLocation = () => {
    console.log("1. Botão 'Localizar' clicado.");
    console.log("2. A instância do mapa está:", map ? "Definida" : "Nula");

    if (!map) {
        alert("A referência do mapa ainda não está pronta. Tente novamente em um segundo.");
        return;
    }

    console.log("3. Solicitando localização ao navegador...");

    navigator.geolocation.getCurrentPosition(
        (position) => {
            console.log("4. SUCESSO! Localização recebida:", position);
            const { latitude, longitude } = position.coords;
            map.flyTo([latitude, longitude], 15);
        },
        (error) => {
            console.error("5. ERRO! Não foi possível obter a localização.", error);
            alert(`Erro ao obter localização: ${error.message}. Verifique as permissões do site no seu navegador.`);
        }
    );
};


    return (
        <>
            <Head title="Maps" />

            {/* Container principal para centralizar o conteúdo na tela */}
            <div className="h-screen w-screen">
                <MapContainer
                    center={initialPosition}
                    zoom={13}
                    style={{ height: "100%", width: "100%" }}
                    ref={setMap}
                >
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />

                    {/* Mapeia os lugares para criar os marcadores */}
                    {places.map((place) => (
                        <Marker
                            key={place.id}
                            position={[place.latitude, place.longitude]}
                        >
                            <Popup>
                                <div>
                                    <h3 className="font-bold text-lg">
                                        Memórias neste local:
                                    </h3>
                                    <ul className="list-disc pl-5 mt-2">
                                        {place.memories.map((memory) => (
                                            <li key={memory.id}>
                                                <span className="font-semibold">
                                                    {memory.title}
                                                </span>{" "}
                                                por {memory.user.name}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </Popup>
                        </Marker>
                    ))}

                    <MapClickHandler onMapClick={handleMapClick} />
                </MapContainer>


                <div className="absolute top-2 right-14 z-[1000]">
                    <Button onClick={flyToCurrentLocation} size="icon">
                        <LocateFixed className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            <Dialog
                open={!!newMemoryCoords}
                onOpenChange={(open) => {
                    if (!open) setNewMemoryCoords(null);
                }}
            >
                {/* Portal faz o conteúdo saltar para o fim do <body>, acima de todos os z-indexes */}
                <DialogPortal>
                    <DialogOverlay className="fixed inset-0 bg-black/50 z-[9999]" />
                    <DialogContent
                        className="fixed z-[9999] bg-white rounded-lg p-6 shadow-lg
                             top-1/2 left-1/2
                             transform -translate-x-1/2 -translate-y-1/2
                             max-w-lg w-full"
                    >
                        <DialogHeader>
                            <DialogTitle>
                                Adicionar uma nova memória
                            </DialogTitle>
                        </DialogHeader>
                        {newMemoryCoords && (
                            <CreateMemoryForm
                                coordinates={newMemoryCoords}
                                onSuccess={() => setNewMemoryCoords(null)}
                            />
                        )}
                    </DialogContent>
                </DialogPortal>
            </Dialog>
        </>
    );
};

export default Index;
